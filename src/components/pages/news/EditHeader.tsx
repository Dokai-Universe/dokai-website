import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import { useFormContext } from "react-hook-form";
import { NewsInput } from "./news";
import * as Styles from "./style.css";
import EditCalendar from "@components/ui/Edit/EditCalendar/EditCalendar";

const NewsEditHeader = () => {
  const form = useFormContext<NewsInput>();

  return (
    <div className={Styles.EditHeaderContainer}>
      <TitleInput
        title="Title"
        placeholder="Title"
        form={form}
        name="title"
        className={Styles.EditHeaderInput}
      />
      <EditCalendar
        title="Published Date"
        placeholder="Published Date"
        form={form}
        name="publishedAt"
        className={Styles.EditHeaderInput}
      />
    </div>
  );
};

export default NewsEditHeader;
