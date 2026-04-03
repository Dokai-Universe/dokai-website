"use client";

import NewsPageSearchBar from "@components/pages/news/SearchBar";
import * as Styles from "./style.css";
import ViewSVG from "@assets/icons/view.svg";
import React from "react";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { useQuery } from "@tanstack/react-query";
import { fetchOgData } from "@controllers/og/fetch";
import { useRouter } from "nextjs-toploader/app";

const mock = {
  id: 1,
  slug: "news-1",
  category: "NEWS",
  title: "A Closer Look at DOKAI Studio",
  date: new Date("2026-04-03"),
  view: 100,
  chapters: [
    {
      title: "Chapter 01. NH Life 2025 Brand Campaign? ",
      contents: [
        {
          type: "TEXT",
          content:
            "From planning and AI-driven creation to production and post-production mastering, experts from diverse disciplines came together with a single shared purpose.",
        },
        {
          type: "MEDIA",
          media: {
            type: "IMAGE",
            src: "https://pub-c960c01dadf742b6ada2772f5bbebd63.r2.dev/images/asd/asd/2a0ecfe1f610b0d6af91d146a7b0efccaabe75be0d7f68b181d243b3b6fcbb39.png",
            alt: "Chapter 01. NH Life 2025 Brand Campaign(1111)",
          } as const,
        },
        {
          type: "TEXT",
          content:
            "From planning and AI-driven creation to production and post-production mastering, experts from diverse disciplines came together with a single shared purpose.<br/><br/>This marks the beginning of something singular. As AI video technology continues to evolve, DOKAI moves beyond current boundaries— not by tools alone, but through a team defined by capability, excellence, and intelligence.<br/><br/>By integrating creative vision with advanced technical execution, DOKAI delivers a new dimension of high-quality AI content— where experimentation meets precision, and innovation is carried through to completion.<br/><br/>Together, all of this becomes possible.",
        },
      ],
    },
    {
      title: "Chapter 02. NH Life 2025 Brand Campaign? ",
      contents: [
        {
          type: "TEXT",
          content:
            "From planning and AI-driven creation to production and post-production mastering, experts from diverse disciplines came together with a single shared purpose.",
        },
        {
          type: "MEDIA",
          media: {
            type: "IMAGE",
            src: "https://pub-c960c01dadf742b6ada2772f5bbebd63.r2.dev/images/asd/asd/2a0ecfe1f610b0d6af91d146a7b0efccaabe75be0d7f68b181d243b3b6fcbb39.png",
            alt: "Chapter 01. NH Life 2025 Brand Campaign(1111)",
          } as const,
        },
        {
          type: "TEXT",
          content:
            "From planning and AI-driven creation to production and post-production mastering, experts from diverse disciplines came together with a single shared purpose.<br/><br/>This marks the beginning of something singular. As AI video technology continues to evolve, DOKAI moves beyond current boundaries— not by tools alone, but through a team defined by capability, excellence, and intelligence.<br/><br/>By integrating creative vision with advanced technical execution, DOKAI delivers a new dimension of high-quality AI content— where experimentation meets precision, and innovation is carried through to completion.<br/><br/>Together, all of this becomes possible.",
        },
      ],
    },
  ],
  url: "https://music.youtube.com/watch?v=2vM5_UAGFRo&list=RDAMVMGC1w_3KRm14",
};

const NewsCategories = ["NEWS", "BRANDING"];

const NewsDetailLingOgData = ({ url }: { url: string }) => {
  const { data } = useQuery({
    queryKey: ["news-detail-og", url],
    queryFn: () => fetchOgData(url),
  });

  const hostname = new URL(url).hostname;
  const iconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className={Styles.LinkOgData} onClick={handleClick}>
      <div className={Styles.LinkOgDataContent}>
        <p className={Styles.LinkOgDataContentTitle}>{data?.title}</p>
        <p className={Styles.LinkOgDataContentDescription}>
          {data?.description}
        </p>
        <div className={Styles.LinkOgDataContentFooter}>
          <img
            src={iconUrl}
            alt={data?.title}
            className={Styles.LinkOgDataContentFooterIcon}
          />
          <p className={Styles.LinkOgDataContentFooterUrl}>{url}</p>
        </div>
      </div>

      <img
        src={data?.image}
        alt={data?.title}
        className={Styles.LinkOgDataImage}
      />
    </div>
  );
};

const NewsDetailPageClient = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleListClick = () => {
    router.push("/news");
  };

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <NewsPageSearchBar inDetail />
        <div className={Styles.Content}>
          <div className={Styles.Header}>
            <div className={Styles.HeaderCategory}>
              {NewsCategories.map((category) => (
                <p
                  key={category}
                  data-active={category === mock.category}
                  className={Styles.HeaderCategoryItem}
                >
                  {category}
                </p>
              ))}
            </div>
            <div className={Styles.HeaderInfo}>
              <p className={Styles.HeaderInfoDate}>
                {mock.date.toLocaleDateString()}
              </p>
              <div className={Styles.HeaderInfoView}>
                <ViewSVG className={Styles.HeaderInfoViewIcon} />
                <p>{mock.view}</p>
              </div>
            </div>
          </div>

          <div className={Styles.Body}>
            <p className={Styles.BodyTitle}>{mock.title}</p>
            <div className={Styles.BodyContent}>
              {mock.chapters.map((chapter) => (
                <div key={chapter.title} className={Styles.BodyChapter}>
                  <p className={Styles.BodyChapterTitle}>{chapter.title}</p>
                  <div className={Styles.BodyChapterContent}>
                    {chapter.contents.map((content, i) =>
                      content.type === "TEXT" ? (
                        <div
                          key={i}
                          className={Styles.BodyChapterContentText}
                          dangerouslySetInnerHTML={{
                            __html: content.content ?? "",
                          }}
                        />
                      ) : (
                        <div
                          key={i}
                          className={Styles.BodyChapterContentMediaContainer}
                        >
                          <MediaCard
                            media={content.media}
                            className={Styles.BodyChapterContentMedia}
                          />
                          <p className={Styles.BodyChapterContentMediaCaption}>
                            {content.media?.alt}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
            <NewsDetailLingOgData url={mock.url} />
          </div>
        </div>

        <div className={Styles.Footer}>
          <div className={Styles.FooterItem}>
            <p className={Styles.FooterItemTitle}>Project Manager</p>
            <p>Lee Sol</p>
          </div>
          <div className={Styles.FooterItem}>
            <p className={Styles.FooterItemTitle}>Contents No.</p>
            <p>2026-03</p>
          </div>
        </div>
        <div className={Styles.ListButtonContainer}>
          <button className={Styles.ListButton} onClick={handleListClick}>
            LIST
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsDetailPageClient;
