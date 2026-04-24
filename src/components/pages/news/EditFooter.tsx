import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import { useFormContext } from "react-hook-form";
import { NewsInput } from "./news";
import * as Styles from "./style.css";

const NewsEditFooter = () => {
  const form = useFormContext<NewsInput>();

  return (
    <div className={Styles.EditFooterContainer}>
      <TitleInput
        title="Project Manager"
        placeholder="Project Manager"
        form={form}
        name="projectManager"
        className={Styles.EditFooterInput}
      />
      <TitleInput
        title="Contents No."
        placeholder="Contents No."
        form={form}
        name="contentsNumero"
        className={Styles.EditFooterInput}
      />
    </div>
  );
};

export default NewsEditFooter;
