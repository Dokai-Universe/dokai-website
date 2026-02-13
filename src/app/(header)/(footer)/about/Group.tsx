import { AboutGroup } from "@domain/about";
import * as Styles from "./style.css";

type AboutPageServicesProps = {
  name: string;
  text: string;
  content: AboutGroup[];
};

const AboutPageGroupSection = ({
  name,
  text,
  content,
}: AboutPageServicesProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentTitle}>{name}</p>
      <p className={Styles.ContentText}>{text}</p>
      <div className={Styles.ServicesQuadrant}>
        {content.map((group) => (
          <div
            key={`ABOUT_GROUP_${group.name}`}
            className={Styles.ServicesQuadrantItem}
          >
            <p className={Styles.ServicesQuadrantTitle}>{group.name}</p>
            <ul className={Styles.ServicesQuadrantList}>
              {group.values.map((value, idx) => (
                <li key={`ABOUT_GROUP_${group.name}_${idx}`}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPageGroupSection;
