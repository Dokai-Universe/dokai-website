import { useSearchParams } from "next/navigation";
import * as Styles from "./style.css";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useMemo, useState } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import CrossSVG from "@assets/icons/cross.svg";
import { Project, ProjectContent } from "@domain/careers";
import z from "zod";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaSource } from "@domain/media";
import { useModalStackStore } from "@stores/modalStackStore";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import EditMediaList from "@components/ui/Edit/EditMediaList/EditMediaList";
import EditMediaSingle from "@components/ui/Edit/EditMediaSingle/EditMediaSingle";
import EditPublished from "@components/ui/Edit/EditPublished/EditPublished";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import EditModeToggle from "@components/ui/Edit/EditModeToggle/EditModeToggle";
import ProjectModalView from "./View";
import ErrorComponent from "@components/ui/Status/Error";
import LoadingComponent from "@components/ui/Status/Loading";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import { useAppMutation, useAppQuery } from "@controllers/common";
import { careersQueriesClient } from "@controllers/careers/query.client";
import { careersMutations } from "@controllers/careers/mutation";
import { encodeEmailParam } from "@utils/Email";
import { authQueriesClient } from "@controllers/auth/query.client";

const TRANSITION_DURATION = 200;

const schema = z
  .object({
    isPublished: z.boolean(),
    title: z.string().min(1, "Title is required"),
    thumbnail: z.unknown().nullable(),
    contents: z.array(z.unknown().nullable()),
    medias: z.array(z.unknown().nullable()),
  })
  .superRefine((v, ctx) => {
    if (v.thumbnail == null) {
      ctx.addIssue({
        code: "custom",
        path: ["thumbnail"],
        message: "Thumbnail is required",
      });
    }

    const contentsCount = v.contents.filter(
      (x) => x != null && x !== "",
    ).length;
    if (contentsCount < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["contents"],
        message: "Add at least 1 content section",
      });
    }

    const mediasCount = v.medias.filter((x) => x != null && x !== "").length;
    if (mediasCount < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["medias"],
        message: "Add at least 1 media",
      });
    }
  });

export type ProjectFormInput = z.input<typeof schema>;

type Props = {
  ownerEmail: string;

  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
};

const initialProject: Project & { isPublished: boolean } = {
  title: "",
  thumbnail: null,
  contents: [],
  medias: [],
  isPublished: false,
};

const ProjectModalEdit = () => {
  const form = useFormContext<ProjectFormInput>();
  const {
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = form;

  const thumbnail = watch("thumbnail") as MediaSource;
  const contents = watch("contents") as ProjectContent[];
  const medias = watch("medias") as MediaSource[];

  const { push } = useModalStackStore();

  const handleEditContent = (idx: number) => {
    push("EDIT_PROJECT_CONTENT", {
      initial: contents[idx],
      applyContent: (content) => {
        setValue(
          "contents",
          contents.map((c, i) => (i === idx ? content : c)),
        );
      },
    });
  };

  const handleCreateContent = () => {
    clearErrors("contents");
    push("EDIT_PROJECT_CONTENT", {
      initial: {
        name: "",
        type: "TEXT",
        value: "",
      },
      applyContent: (content) => {
        setValue("contents", [...contents, content]);
      },
    });
  };

  return (
    <div className={Styles.Container}>
      <div className={Styles.ThumbnailEditContainer}>
        <ErrorText message={errors.thumbnail?.message} />
        <EditMediaSingle
          media={thumbnail}
          onClick={() => clearErrors("thumbnail")}
          className={Styles.Media}
          applyMedia={(media) => {
            setValue("thumbnail", media);
          }}
          blockedTypes={["VIDEO"]}
        />
      </div>
      <div className={Styles.InfoEditContainer}>
        <TitleInput
          title="Title"
          placeholder="Enter title"
          form={form}
          name="title"
          className={Styles.TitleEditContainer}
        />
        <EditPublished
          form={form}
          name="isPublished"
          className={Styles.PublishedEditContainer}
        />
      </div>
      <div className={Styles.Content}>
        {contents.map((item, idx) => (
          <div key={item.name} className={Styles.ContentItem}>
            <p className={Styles.ContentItemName}>{item.name}</p>
            {item.type === "TEXT" ? (
              <div
                className={`${Styles.ContentItemText} rich-text`}
                dangerouslySetInnerHTML={{ __html: item.value }}
              />
            ) : (
              <ul className={Styles.ContentItemList}>
                {item.value.map((value, index) => (
                  <li key={index} className={Styles.ContentItemListItem}>
                    {value}
                  </li>
                ))}
              </ul>
            )}
            <EditButton
              onClick={() => handleEditContent(idx)}
              className={Styles.ContentEditButton}
            />
          </div>
        ))}
        <AddButton onClick={handleCreateContent} />

        <ErrorText message={errors.contents?.message} />
      </div>
      <div className={Styles.EditMediaContainer}>
        <ErrorText message={errors.medias?.message} />
        <EditMediaList
          medias={medias}
          onClick={() => clearErrors("medias")}
          className={Styles.MediaContainer}
          applyMedias={(medias) => {
            setValue("medias", medias);
          }}
        />
      </div>
    </div>
  );
};

const ProjectModal = ({ ownerEmail, isOpen, closeModal }: Props) => {
  const { data: session } = useAppQuery(authQueriesClient.sessionStatus());
  const isOwner = session?.role === "admin" || session?.email === ownerEmail;
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawId = searchParams.get("project");
  const [mode, setMode] = useState<"EDIT" | "VIEW">(
    rawId === "new" ? "EDIT" : "VIEW",
  );

  const [isVisible, setIsVisible] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(
    rawId === "new" ? null : rawId!,
  );
  const { mutateAsync: mutateCreateProject } = useAppMutation(
    careersMutations.createProject(ownerEmail),
    {
      onSuccess: (data) => {
        setProjectId(data.projectId);
      },
    },
  );
  const { mutateAsync: mutateUpdateProject } = useAppMutation(
    careersMutations.updateProject(ownerEmail, projectId!),
  );
  const { mutateAsync: mutateDeleteProject } = useAppMutation(
    careersMutations.deleteProject(ownerEmail, projectId!),
  );

  const { push } = useModalStackStore();
  // useLockBodyScroll(true);

  const {
    data: fetchedProject,
    isLoading,
    isError,
  } = useAppQuery(careersQueriesClient.projectDetail(projectId!), {
    enabled: projectId != null,
  });

  const form = useForm<ProjectFormInput>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: initialProject,
  });
  const { getValues, trigger, watch, reset } = form;

  const isPublished = watch("isPublished");
  const formValues = useWatch({ control: form.control });

  const projectForView = useMemo(() => formValues as Project, [formValues]);

  const isEditableProject = !isLoading && !isError && isOwner;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsVisible(true));
        });
      }, 0);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        closeModal();
      }, TRANSITION_DURATION);
    }
  }, [isOpen]);

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    if (fetchedProject) {
      reset({
        isPublished: !!fetchedProject?.isPublished,
        ...fetchedProject?.data,
      });
    }
  }, [fetchedProject]);

  const validateAndPush = async (mode: "create" | "update") => {
    const valid = await trigger();
    if (!valid) return;

    const formValues = getValues();
    const { isPublished: nextIsPublished, ...rest } = formValues;
    const nextProject = rest as Project;

    if (mode === "create") {
      push("API", {
        title: "Create New Work",
        onFetch: async () =>
          mutateCreateProject({
            ownerEmail,
            isPublished: nextIsPublished,
            data: nextProject,
          }),
        onConfirm: () => {
          router.replace(
            `/careers/${encodeEmailParam(ownerEmail)}?project=${projectId}`,
          );
        },
      });
    } else {
      if (!projectId) return;

      push("API", {
        title: "Update Work",
        onFetch: async () =>
          mutateUpdateProject({
            ownerEmail,
            isPublished: nextIsPublished,
            data: nextProject,
          }),
        onConfirm: () => {
          router.replace(
            `/careers/${encodeEmailParam(ownerEmail)}?project=${projectId}`,
          );
        },
      });
    }
  };

  const handleCreateProject = async () => {
    await validateAndPush("create");
  };

  const handleUpdateProject = async () => {
    await validateAndPush("update");
  };

  const handleDeleteProject = async () => {
    if (!projectId) return;
    push("CONFIRM", {
      title: "Delete Project",
      content: "Are you sure to delete this project?",
      onConfirm: () => {
        push("API", {
          title: "Delete Project",
          onFetch: async () => mutateDeleteProject(),
          onConfirm: () => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.delete("project");
            router.replace(`?${searchParams.toString()}`);
          },
        });
      },
    });
  };

  return (
    <div
      className={Styles.Overlay({ isVisible: isVisible })}
      style={assignInlineVars({
        [Styles.TransitionDurationVar]: `${TRANSITION_DURATION}ms`,
      })}
      onMouseDown={handleClose}
    >
      <div
        className={Styles.Layout({ isVisible: isVisible })}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={Styles.Header}>
          {isEditableProject && (
            <EditModeToggle mode={mode} setMode={setMode} />
          )}

          {isEditableProject && (
            <PrivateMark
              isPrivate={!isPublished}
              className={Styles.PrivateMark}
            />
          )}
          <button onClick={handleClose} className={Styles.CloseButton}>
            <CrossSVG className={Styles.CloseButtonIcon} />
          </button>
        </div>
        {isLoading ? (
          <LoadingComponent useText="Loading..." />
        ) : isError ? (
          <ErrorComponent errorText="Unknown Project" />
        ) : mode === "VIEW" ? (
          <ProjectModalView project={projectForView} />
        ) : (
          <FormProvider {...form}>
            <ProjectModalEdit />
          </FormProvider>
        )}
        {isEditableProject && (
          <FloatingButtonContainer>
            {projectId ? (
              <>
                <FloatingButton
                  type="SAVE"
                  text="Save Project"
                  onClick={handleUpdateProject}
                />
                <FloatingButton
                  type="REMOVE"
                  text="Delete Project"
                  onClick={handleDeleteProject}
                />
              </>
            ) : (
              <FloatingButton
                type="SAVE"
                text="Create Project"
                onClick={handleCreateProject}
              />
            )}
          </FloatingButtonContainer>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
