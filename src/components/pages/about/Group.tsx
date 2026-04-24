import { AboutContentGroup } from "@domain/about";
import * as Styles from "./style.css";

type AboutPageGroupProps = {
  content: AboutContentGroup;
};

const AboutPageGroup = ({ content }: AboutPageGroupProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentName()}>{content.name}</p>
      <div
        className={`${Styles.ContentText} rich-text`}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
      <div className={Styles.GroupContainer}>
        {content.content.map((item, i) => (
          <div key={`ABOUT_GROUP_${i}`} className={Styles.GroupContent}>
            <p className={Styles.GroupTitle}>{item.name}</p>
            <div className={Styles.GroupValues}>
              {item.values.map((value, j) => (
                <p key={`ABOUT_GROUP_${i}_${j}`}>{value}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPageGroup;
