"use client";

import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import * as Styles from "./style.css";
import EditModeToggle from "@components/ui/Edit/EditModeToggle/EditModeToggle";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import { ApiError, useAppMutation, useAppQuery } from "@controllers/common";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useModalStackStore } from "@stores/modalStackStore";
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
import NewsEditExternalLink from "@components/pages/news/EditExternalLink";
import NewsEditFooter from "@components/pages/news/EditFooter";
import { fetchNewsCheckSlug } from "@controllers/news/fetch";
import { newsMutations } from "@controllers/news/mutation";

const AdminNewsPageClient = ({ slug }: { slug?: string }) => {
  const router = useRouter();
  const [mode, setMode] = useState<"VIEW" | "EDIT">("EDIT");
  const [newsId, setNewsId] = useState<string | null>(null);

  const { data } = useAppQuery(newsQueriesClient.newsDetail(slug!), {
    enabled: !!slug,
  });

  const { mutateAsync: mutateCreateNews } = useAppMutation(
    newsMutations.createNews(),
    {
      onSuccess: (data) => {
        setNewsId(data.newsId);
      },
    },
  );

  const { mutateAsync: mutateUpdateNews } = useAppMutation(
    newsMutations.updateNews(newsId!),
  );

  const { mutateAsync: mutateDeleteNews } = useAppMutation(
    newsMutations.deleteNews(newsId!),
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
    setNewsId(data.id);
    reset({
      ...initialNews,
      ...data.data,
      slug: data.slug,
      isPublished: data.isPublished,
      publishedAt: data.data.publishedAt
        ? new Date(data.data.publishedAt)
        : new Date(),
    } as NewsInput);
  }, [data, reset]);

  const { push } = useModalStackStore();

  const validateAndPush = async (mode: "create" | "update") => {
    const valid = await trigger();
    if (!valid) return;

    const formValues = getValues();
    const {
      isPublished: nextIsPublished,
      slug: nextSlug,
      ...rest
    } = formValues;
    const nextNews = rest as News;

    if (slug && nextSlug !== slug) {
      try {
        const result = await fetchNewsCheckSlug(nextSlug);

        const isTaken = result.exists;
        if (isTaken) {
          setError("slug", {
            type: "manual",
            message: "This slug is already in use",
          });
          return;
        }
      } catch (error) {
        if (error instanceof ApiError) {
          setError("slug", {
            type: "manual",
            message: error.userMessage || "Request failed",
          });
        }
        setError("slug", {
          type: "manual",
          message: "Unknown error",
        });
        return;
      }
    }

    if (mode === "create") {
      push("API", {
        title: "Create New News",
        onFetch: async () =>
          mutateCreateNews({
            slug: nextSlug,
            isPublished: nextIsPublished,
            data: nextNews,
          }),
        onConfirm: () => {
          router.replace(`/news/${encodeURIComponent(nextSlug)}`);
        },
        isRouteAfterConfirm: true,
      });
    } else {
      if (!newsId) return;

      push("API", {
        title: "Update News",
        onFetch: async () =>
          mutateUpdateNews({
            slug: nextSlug,
            isPublished: nextIsPublished,
            data: nextNews,
          }),
        onConfirm: () => {
          router.replace(`/news/${encodeURIComponent(nextSlug)}`);
        },
        isRouteAfterConfirm: true,
      });
    }
  };

  const handleCreateNews = async () => {
    await validateAndPush("create");
  };

  const handleUpdateNews = async () => {
    await validateAndPush("update");
  };

  const handleDeleteNews = async () => {
    if (!newsId) return;
    push("CONFIRM", {
      title: "Delete News",
      content: "Are you sure to delete this news?",
      onConfirm: () => {
        push("API", {
          title: "Delete News",
          onFetch: async () => mutateDeleteNews(),
          onConfirm: () => {
            router.replace(`/news`);
          },
          isRouteAfterConfirm: true,
        });
      },
    });
  };

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
              <NewsEditExternalLink />
            </div>
            <NewsEditFooter />
          </FormProvider>
        </>
      )}
      <FloatingButtonContainer>
        {newsId ? (
          <>
            <FloatingButton
              type="SAVE"
              text="Update News"
              onClick={handleUpdateNews}
            />
            <FloatingButton
              type="REMOVE"
              text="Delete News"
              onClick={handleDeleteNews}
            />
          </>
        ) : (
          <FloatingButton
            type="SAVE"
            text="Create News"
            onClick={handleCreateNews}
          />
        )}
      </FloatingButtonContainer>
    </div>
  );
};

export default AdminNewsPageClient;
