"use client";

import * as Styles from "./style.css";
import EditModeToggle from "@components/ui/Edit/EditModeToggle/EditModeToggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  FormProvider,
  useForm,
  useWatch,
  useFieldArray,
} from "react-hook-form";
import {
  AboutInput,
  aboutSchema,
  initialAbout,
} from "@components/pages/about/about";
import AboutPageIntro from "@components/pages/about/Intro";
import AboutPageContent from "@components/pages/about/Content";
import { About, AboutContent } from "@domain/about";
import { useAppMutation, useAppQuery } from "@controllers/common";
import { aboutQueriesClient } from "@controllers/about/query.client";
import AboutPageEditContent from "@components/pages/about/EditContent";
import AboutPageEditIntro from "@components/pages/about/EditIntro";
import { aboutMutations } from "@controllers/about/mutation";
import { useModalStackStore } from "@stores/modalStackStore";
import { useRouter } from "nextjs-toploader/app";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const AdminAboutPageClient = () => {
  const router = useRouter();
  const { push } = useModalStackStore();
  const [mode, setMode] = useState<"VIEW" | "EDIT">("EDIT");

  const { data } = useAppQuery(aboutQueriesClient.aboutDetail());
  const { mutateAsync: mutateUpdateAbout } = useAppMutation(
    aboutMutations.updateAbout(),
  );

  const form = useForm<AboutInput>({
    mode: "onBlur",
    resolver: zodResolver(aboutSchema),
    defaultValues: initialAbout,
  });

  const { control, reset, trigger, getValues } = form;
  const watched = useWatch({ control });
  const about = watched as About;

  const { fields, move } = useFieldArray({
    control,
    name: "contents",
  });

  useEffect(() => {
    if (!data) return;

    reset({
      ...initialAbout,
      ...data.data,
    });
  }, [data, reset]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);

    if (oldIndex < 0 || newIndex < 0) return;
    move(oldIndex, newIndex);
  };

  const handleUpdateAbout = async () => {
    const valid = await trigger();
    if (!valid) return;

    const formValues = getValues();
    const nextAbout = formValues as About;

    push("API", {
      title: "Update About",
      onFetch: async () => mutateUpdateAbout({ data: nextAbout }),
      onConfirm: () => {
        router.replace(`/about`);
      },
    });
  };

  const handleAddContent = () => {
    push("ADD_ABOUT_SECTION", {
      addAboutContent: (content: AboutContent) => {
        const { contents } = getValues();
        reset({
          ...getValues(),
          contents: [...contents, content],
        });
      },
    });
  };

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <div className={Styles.HeaderContainer}>
          <EditModeToggle mode={mode} setMode={setMode} />
        </div>

        {mode === "VIEW" ? (
          <>
            <AboutPageIntro text={about.intro} />
            {about.contents.map((content, index) => (
              <AboutPageContent
                key={`ABOUT_CONTENT_${index}`}
                content={content}
              />
            ))}
          </>
        ) : (
          <FormProvider {...form}>
            <AboutPageEditIntro />

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((field) => field.id)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <AboutPageEditContent
                    key={field.id}
                    id={field.id}
                    index={index}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <AddButton
              onClick={handleAddContent}
              className={Styles.AboutSectionAddButton}
            />
          </FormProvider>
        )}
      </div>

      <FloatingButtonContainer>
        <FloatingButton
          type="SAVE"
          onClick={handleUpdateAbout}
          text="Update About Page"
        />
      </FloatingButtonContainer>
    </>
  );
};

export default AdminAboutPageClient;
