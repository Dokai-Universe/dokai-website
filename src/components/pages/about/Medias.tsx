import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";
import { AboutContentMedias } from "@domain/about";
import * as Styles from "./style.css";

type AboutPageMediasProps = {
  content: AboutContentMedias;
};

const AboutPageMedias = ({ content }: AboutPageMediasProps) => {
  return (
    <div className={Styles.ContentContainer}>
      {!!content.name && (
        <p className={Styles.ContentName({ align: content.align })}>
          {content.name}
        </p>
      )}
      <div
        className={Styles.MediasMediaContainer({
          align: content.align,
          size: content.size,
        })}
      >
        <MediaSlider
          mediaList={content.medias}
          className={Styles.MediasMedia({
            size: content.size,
          })}
        />
      </div>
    </div>
  );
};

export default AboutPageMedias;
