import { useFormContext } from "react-hook-form";
import * as Styles from "./style.css";
import { AboutInput } from "./about";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";

const AboutPageEditIntro = () => {
  const form = useFormContext<AboutInput>();

  return (
    <TitleRichText
      placeholder="Write About page intro here..."
      form={form}
      name="intro"
      className={Styles.IntroContainer}
    />
  );
};

export default AboutPageEditIntro;
