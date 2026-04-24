import { useFormContext, useWatch } from "react-hook-form";
import { NewsInput } from "./news";
import * as Styles from "./style.css";
import NewsExternalLink from "./ExternalLink";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import { useModalStackStore } from "@stores/modalStackStore";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import EditButton from "@components/ui/Edit/EditButton/EditButton";

const NewsEditExternalLink = () => {
  const form = useFormContext<NewsInput>();

  const {
    setValue,
    control,
    formState: { errors },
  } = form;

  const watched = useWatch({ control });
  const externalUrl = watched.externalUrl;

  const { push } = useModalStackStore();

  const handleSetExternalUrl = () => {
    push("HYPERLINK", {
      onApply: (url: string) => {
        setValue("externalUrl", url);
      },
    });
  };

  return (
    <div className={Styles.EditExternalLink}>
      {externalUrl ? (
        <NewsExternalLink url={externalUrl} />
      ) : (
        <div className={Styles.AddExternalLinkContainer}>
          <p className={Styles.AddExternalLinkLabel}>External Link</p>
          <AddButton
            className={Styles.AddExternalLinkButton}
            onClick={handleSetExternalUrl}
          />
          {errors.externalUrl?.message && (
            <ErrorText message={errors.externalUrl.message} />
          )}
        </div>
      )}
      {externalUrl && (
        <EditButton
          onClick={handleSetExternalUrl}
          className={Styles.EditExternalLinkButton}
        />
      )}
    </div>
  );
};

export default NewsEditExternalLink;
