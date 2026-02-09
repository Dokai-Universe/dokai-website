import * as Styles from "./style.css";

const AboutPageIntro = ({ text }: { text: string }) => {
  return (
    <div className={Styles.IntroContainer}>
      <p>{text}</p>
    </div>
  );
};

export default AboutPageIntro;
