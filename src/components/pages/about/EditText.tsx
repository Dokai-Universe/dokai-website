import { useFormContext } from "react-hook-form";
import { AboutInput } from "./about";
import * as Styles from "./style.css";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";

const AboutPageEditText = ({ index }: { index: number }) => {
  const form = useFormContext<AboutInput>();

  return (
    <div className={Styles.ContentContainer}>
      <TitleInput
        title="Name"
        form={form}
        name={`contents.${index}.name`}
        className={Styles.ContentName()}
      />
      <TitleRichText
        title="Text"
        form={form}
        name={`contents.${index}.text`}
        className={Styles.ContentText}
        placeholder="Write text here..."
      />
    </div>
  );
};

export default AboutPageEditText;
