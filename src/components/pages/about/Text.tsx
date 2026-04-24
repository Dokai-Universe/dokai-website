import { AboutContentText } from "@domain/about";
import * as Styles from "./style.css";

type AboutPageTextProps = {
  content: AboutContentText;
};

const AboutPageText = ({ content }: AboutPageTextProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentName()}>{content.name}</p>
      <div
        className={`${Styles.ContentText} rich-text`}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    </div>
  );
};

export default AboutPageText;
