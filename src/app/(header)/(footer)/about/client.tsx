"use client";

import AboutPageIntro from "./Intro";
import * as Styles from "./style.css";
import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";
import { About } from "@domain/about";
import AboutPageTextSection from "./Text";
import AboutPageGroupSection from "./Group";
import AboutPageCardSection from "./Card";
import AboutPageTeamSection from "./Team";
import { useAboutQuery } from "./query";

type AboutPageClientProps = {
  aboutInfo?: About;
};

const AboutPageClient = ({}: AboutPageClientProps) => {
  const { data, isLoading, isError } = useAboutQuery();

  const aboutInfo = data?.data;

  if (isLoading) return <div>Loading...</div>;

  if (isError || !aboutInfo) return <div>Error</div>;

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <AboutPageIntro text={aboutInfo.intro} />
      {aboutInfo.contents.map((content, index) =>
        content.type === "MEDIAS" ? (
          <MediaSlider
            key={`ABOUT_CONTENT_${index}`}
            mediaList={content.value.medias}
            className={
              content.value.align === "LEFT"
                ? Styles.ImageLeft
                : Styles.ImageRight
            }
          />
        ) : content.value.contentType === "TEXT" ? (
          <AboutPageTextSection
            key={`ABOUT_CONTENT_${index}`}
            name={content.name}
            text={content.value.text}
          />
        ) : content.value.contentType === "GROUP" ? (
          <AboutPageGroupSection
            key={`ABOUT_CONTENT_${index}`}
            name={content.name}
            text={content.value.text}
            content={content.value.content}
          />
        ) : content.value.contentType === "CARD" ? (
          <AboutPageCardSection
            key={`ABOUT_CONTENT_${index}`}
            name={content.name}
            text={content.value.text}
            content={content.value.content}
          />
        ) : content.value.contentType === "TEAM" ? (
          <AboutPageTeamSection
            key={`ABOUT_CONTENT_${index}`}
            name={content.name}
            text={content.value.text}
            content={content.value.content}
          />
        ) : (
          ""
        ),
      )}
    </div>
  );
};

export default AboutPageClient;
