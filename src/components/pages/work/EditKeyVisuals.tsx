import * as Styles from "./style.css";
import { WorkInput } from "./work";
import { useFormContext } from "react-hook-form";
import { MediaSource } from "@domain/media";
import EditMediaList from "@components/ui/Edit/EditMediaList/EditMediaList";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";

const WorkEditKeyVisuals = () => {
  const form = useFormContext<WorkInput>();
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const keyVisuals = (watch("keyVisuals") as MediaSource[]) ?? [];

  return (
    <div className={Styles.KeyVisualsContainer}>
      <p className={Styles.KeyVisualsTitle}>Key visual</p>
      <EditMediaList
        className={Styles.KeyVisualsMediaContainer}
        cardClassName={Styles.KeyVisualsMedia}
        medias={keyVisuals}
        applyMedias={(medias) => setValue("keyVisuals", medias)}
        priority
      />
      <ErrorText message={errors.keyVisuals?.message as string} />
    </div>
  );
};

export default WorkEditKeyVisuals;
