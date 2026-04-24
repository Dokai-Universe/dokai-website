import * as Styles from "./style.css";
import { useFormContext } from "react-hook-form";
import { CareersPageFormInput } from "./career";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";

const CareersPageEditContent = ({ index }: { index: number }) => {
  const form = useFormContext<CareersPageFormInput>();

  const handleRemoveContent = () => {
    const contents = form.getValues("contents") ?? [];
    form.setValue(
      "contents",
      contents.filter((_, idx) => idx !== index),
    );
  };

  return (
    <div className={Styles.Content}>
      <TitleInput
        title="Name"
        form={form}
        name={`contents.${index}.name`}
        className={Styles.ContentTitle}
      />
      <TitleRichText
        title="Text"
        form={form}
        name={`contents.${index}.text`}
        className={Styles.ContentText}
        placeholder="Write text here..."
      />
      <RemoveButton
        onClick={handleRemoveContent}
        className={Styles.EditContentRemoveButton}
      />
    </div>
  );
};

export default CareersPageEditContent;
