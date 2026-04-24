import * as Styles from "./style.css";

type AboutPageIntroProps = {
  text: string;
};

const AboutPageIntro = ({ text }: AboutPageIntroProps) => {
  return (
    <div
      className={`${Styles.IntroContainer} rich-text`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default AboutPageIntro;
