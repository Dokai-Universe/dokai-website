"use client";

import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import * as Styles from "./style.css";
import EditModeToggle from "@components/ui/Edit/EditModeToggle/EditModeToggle";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import { ApiError, useAppMutation, useAppQuery } from "@controllers/common";
import { worksQueriesClient } from "@controllers/works/query.client";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initalWork, WorkInput, workSchema } from "@components/pages/work/work";
import { Work } from "@domain/work";
import WorkHeader from "@components/pages/work/Header";
import WorkKeyVisuals from "@components/pages/work/KeyVisuals";
import WorkCredits from "@components/pages/work/Credits";
import WorkEditInfo from "@components/pages/work/EditInfo";
import WorkEditHeader from "@components/pages/work/EditHeader";
import WorkEditKeyVisuals from "@components/pages/work/EditKeyVisuals";
import WorkEditCredits from "@components/pages/work/EditCredits";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useModalStackStore } from "@stores/modalStackStore";
import { fetchWorkCheckSlug } from "@controllers/works/fetch";
import { worksMutations } from "@controllers/works/mutation";
import { newsQueriesClient } from "@controllers/news/query.client";
import {
  initialNews,
  NewsInput,
  newsSchema,
} from "@components/pages/news/news";
import NewsListButton from "@components/pages/news/ListButton";
import NewsPageSearchBar from "@components/pages/news/SearchBar";
import NewsHeader from "@components/pages/news/Header";
import NewsBody from "@components/pages/news/Body";
import NewsFooter from "@components/pages/news/Footer";
import { News } from "@domain/news";
import NewsEditInfo from "@components/pages/news/EditInfo";
import NewsEditHeader from "@components/pages/news/EditHeader";
import NewsEditChapter from "@components/pages/news/EditChapter";

const AdminNewsPageClient = ({ slug }: { slug?: string }) => {
  const router = useRouter();
  const [mode, setMode] = useState<"VIEW" | "EDIT">("EDIT");
  const [workId, setWorkId] = useState<string | null>(null);

  const { data } = useAppQuery(newsQueriesClient.newsDetail(slug!), {
    enabled: !!slug,
  });

  const { mutateAsync: mutateCreateWork } = useAppMutation(
    worksMutations.createWork(),
    {
      onSuccess: (data) => {
        setWorkId(data.workId);
      },
    },
  );

  const { mutateAsync: mutateUpdateWork } = useAppMutation(
    worksMutations.updateWork(workId!),
  );

  const { mutateAsync: mutateDeleteWork } = useAppMutation(
    worksMutations.deleteWork(workId!),
  );

  const form = useForm<NewsInput>({
    mode: "onBlur",
    resolver: zodResolver(newsSchema),
    defaultValues: initialNews,
  });
  const { reset, control, trigger, getValues, setError, watch } = form;
  const { isPublished, slug: nextSlug, ...rest } = useWatch({ control });
  const news = rest as News;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!data) return;
    setWorkId(data.id);
    reset({
      ...initialNews,
      ...data.data,
      slug: data.slug,
      isPublished: data.isPublished,
    } as NewsInput);
  }, [data, reset]);

  const { push } = useModalStackStore();

  // const validateAndPush = async (mode: "create" | "update") => {
  //   const valid = await trigger();
  //   if (!valid) return;

  //   const formValues = getValues();
  //   const {
  //     isPublished: nextIsPublished,
  //     slug: nextSlug,
  //     ...rest
  //   } = formValues;
  //   const nextWork = rest as Work;

  //   if (slug && nextSlug !== slug) {
  //     try {
  //       const result = await fetchWorkCheckSlug(nextSlug);

  //       const isTaken = result.exists;
  //       if (isTaken) {
  //         setError("slug", {
  //           type: "manual",
  //           message: "This slug is already in use",
  //         });
  //         return;
  //       }
  //     } catch (error) {
  //       if (error instanceof ApiError) {
  //         setError("slug", {
  //           type: "manual",
  //           message: error.userMessage || "Request failed",
  //         });
  //       }
  //       setError("slug", {
  //         type: "manual",
  //         message: "Unknown error",
  //       });
  //       return;
  //     }
  //   }

  //   if (mode === "create") {
  //     push("API", {
  //       title: "Create New Work",
  //       onFetch: async () =>
  //         mutateCreateWork({
  //           slug: nextSlug,
  //           isPublished: nextIsPublished,
  //           data: nextWork,
  //         }),
  //       onConfirm: () => {
  //         router.replace(`/work/${nextSlug}`);
  //       },
  //       isRouteAfterConfirm: true,
  //     });
  //   } else {
  //     if (!workId) return;

  //     push("API", {
  //       title: "Update Work",
  //       onFetch: async () =>
  //         mutateUpdateWork({
  //           slug: nextSlug,
  //           isPublished: nextIsPublished,
  //           data: nextWork,
  //         }),
  //       onConfirm: () => {
  //         router.replace(`/work/${nextSlug}`);
  //       },
  //       isRouteAfterConfirm: true,
  //     });
  //   }
  // };

  // const handleCreateWork = async () => {
  //   await validateAndPush("create");
  // };

  // const handleUpdateWork = async () => {
  //   await validateAndPush("update");
  // };

  // const handleDeleteWork = async () => {
  //   if (!workId) return;
  //   push("CONFIRM", {
  //     title: "Delete Work",
  //     content: "Are you sure to delete this work?",
  //     onConfirm: () => {
  //       push("API", {
  //         title: "Delete Work",
  //         onFetch: async () => mutateDeleteWork(),
  //         onConfirm: () => {
  //           router.replace(`/work`);
  //         },
  //         isRouteAfterConfirm: true,
  //       });
  //     },
  //   });
  // };

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <div className={Styles.HeaderContainer}>
        <EditModeToggle mode={mode} setMode={setMode} />
        <PrivateMark
          isPrivate={!isPublished}
          className={Styles.HeaderPrivateMark}
        />
      </div>
      {mode === "VIEW" ? (
        <>
          <NewsPageSearchBar inDetail />
          <div className={Styles.Content}>
            <NewsHeader news={news} viewCount={data?.viewCount || 0} />
            <NewsBody news={news} />
            <NewsFooter news={news} />
          </div>
          <NewsListButton />
        </>
      ) : (
        <>
          <FormProvider {...form}>
            <NewsEditInfo />
            <NewsEditHeader />
            <div className={Styles.Body}>
              <NewsEditChapter />
            </div>
          </FormProvider>
        </>
      )}
      {/* <FloatingButtonContainer>
        {workId ? (
          <>
            <FloatingButton
              type="SAVE"
              text="Update Work"
              onClick={handleUpdateWork}
            />
            <FloatingButton
              type="REMOVE"
              text="Delete Work"
              onClick={handleDeleteWork}
            />
          </>
        ) : (
          <FloatingButton
            type="SAVE"
            text="Create Work"
            onClick={handleCreateWork}
          />
        )}
      </FloatingButtonContainer> */}
    </div>
  );
};

export default AdminNewsPageClient;
