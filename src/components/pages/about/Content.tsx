import { AboutContent } from "@domain/about";
import * as Styles from "./style.css";
import AboutPageMedias from "./Medias";
import AboutPageText from "./Text";
import AboutPageGroup from "./Group";
import AboutPageCard from "./Card";
import AboutPageTeam from "./Team";

type AboutPageContentProps = {
  content: AboutContent;
};

const AboutPageContent = ({ content }: AboutPageContentProps) => {
  return (
    <div
      className={Styles.Content({
        align:
          content.type === "MEDIAS" && content.align === "LEFT"
            ? "LEFT"
            : "RIGHT",
        size: content.type === "MEDIAS" ? content.size : "NORMAL",
      })}
    >
      {content.type === "MEDIAS" ? (
        <AboutPageMedias content={content} />
      ) : content.type === "TEXT" ? (
        <AboutPageText content={content} />
      ) : content.type === "GROUP" ? (
        <AboutPageGroup content={content} />
      ) : content.type === "CARD" ? (
        <AboutPageCard content={content} />
      ) : content.type === "TEAM" ? (
        <AboutPageTeam content={content} />
      ) : null}
    </div>
  );
};

export default AboutPageContent;
