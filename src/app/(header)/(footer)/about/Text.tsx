import * as Styles from "./style.css";

type AboutPageTextSectionProps = {
  name: string;
  text: string;
};

const AboutPageTextSection = ({ name, text }: AboutPageTextSectionProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentTitle}>{name}</p>
      <p className={Styles.ContentText}>{text}</p>
    </div>
  );
};

export default AboutPageTextSection;
