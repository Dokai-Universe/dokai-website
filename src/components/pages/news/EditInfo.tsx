import TitleInputValidate from "@components/ui/Edit/TitleInputValidate/TitleInputValidate";
import { useFormContext } from "react-hook-form";
import TitleSelect from "@components/ui/Edit/TitleSelect/TitleSelect";
import TitleTextArea from "@components/ui/Edit/TitleTextArea/TitleTextArea";
import EditPublished from "@components/ui/Edit/EditPublished/EditPublished";
import * as Styles from "./style.css";
import EditMediaSingle from "@components/ui/Edit/EditMediaSingle/EditMediaSingle";
import { MediaSource } from "@domain/media";
import { ApiError } from "@controllers/common";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import { NewsCategoryList, NewsInput } from "./news";
import { fetchNewsCheckSlug } from "@controllers/news/fetch";

const NewsEditInfo = () => {
  const form = useFormContext<NewsInput>();

  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const thumbnail = watch("thumbnail") as MediaSource;

  const handleApplyMedia = (media: MediaSource) => {
    setValue("thumbnail", media);
  };

  const handleCheckSlug = async (value: string) => {
    try {
      const result = await fetchNewsCheckSlug(value);

      const isTaken = result.exists;
      return {
        isOk: !isTaken,
        message: isTaken ? "This slug is already in use" : "",
      };
    } catch (error) {
      if (error instanceof ApiError) {
        return {
          isOk: false,
          message: error.userMessage || "Request failed",
        };
      }
      return { isOk: false, message: "Unknown error" };
    }
  };

  return (
    <div className={Styles.EditInfoContainer}>
      <div className={Styles.EditInfoMediaContainer}>
        <EditMediaSingle
          media={thumbnail}
          applyMedia={handleApplyMedia}
          className={Styles.EditInfoMedia}
          blockedTypes={["VIDEO"]}
        />
        <ErrorText message={errors.thumbnail?.message} />
      </div>
      <div className={Styles.EditInfoContent}>
        <TitleInputValidate
          title="Page Slug"
          placeholder="page-slug"
          form={form}
          name="slug"
          checkValidate={handleCheckSlug}
        />
        <TitleSelect
          title="Category"
          placeholder="Select a category."
          form={form}
          name="category"
          options={NewsCategoryList}
        />
        <TitleTextArea
          title="Summary"
          placeholder="Write a summary of this work."
          form={form}
          name="summary"
          className={Styles.EditInfoTextArea}
        />
      </div>
      <EditPublished
        form={form}
        name="isPublished"
        className={Styles.EditInfoPublished}
      />
    </div>
  );
};

export default NewsEditInfo;
