import { CareerPageContent } from "@domain/careers";
import * as Styles from "./style.css";

const CareersPageContent = ({ content }: { content: CareerPageContent }) => {
  return (
    <div className={Styles.Content}>
      <p className={Styles.ContentTitle}>{content.name}</p>
      <div
        className={`${Styles.ContentText} rich-text`}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    </div>
  );
};

export default CareersPageContent;
