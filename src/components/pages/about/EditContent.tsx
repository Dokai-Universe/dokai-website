import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { AboutInput } from "./about";
import * as Styles from "./style.css";
import AboutPageEditText from "./EditText";
import AboutPageEditGroup from "./EditGroup";
import { AboutContentMedias } from "@domain/about";
import TrashSVG from "@assets/icons/trash.svg";
import CaretDownSVG from "@assets/icons/caret_down.svg";
import CaretUpSVG from "@assets/icons/caret_up.svg";
import AboutPageEditMedias from "./EditMedias";
import AboutPageEditCard from "./EditCard";
import AboutPageEditTeam from "./EditTeam";

const AboutPageEditContent = ({ index }: { index: number }) => {
  const form = useFormContext<AboutInput>();
  const { watch, control } = form;

  const { move, remove } = useFieldArray({
    control,
    name: "contents",
  });

  const type = watch(`contents.${index}.type`);
  const content = watch(`contents.${index}`) as AboutContentMedias;

  const align = type === "MEDIAS" ? content.align : "RIGHT";
  const size = type === "MEDIAS" ? content.size : "NORMAL";

  const handleMoveUp = () => {
    if (index <= 0) return;
    move(index, index - 1);
  };

  const handleMoveDown = () => {
    const len = (watch("contents") ?? []).length;
    if (index >= len - 1) return;
    move(index, index + 1);
  };

  const handleDelete = () => {
    remove(index);
  };

  return (
    <div
      className={Styles.Content({
        align,
        size,
      })}
    >
      {type === "MEDIAS" ? (
        <AboutPageEditMedias index={index} />
      ) : type === "TEXT" ? (
        <AboutPageEditText index={index} />
      ) : type === "GROUP" ? (
        <AboutPageEditGroup index={index} />
      ) : type === "CARD" ? (
        <AboutPageEditCard index={index} />
      ) : type === "TEAM" ? (
        <AboutPageEditTeam index={index} />
      ) : null}
      {size !== "FULL" && (
        <div className={Styles.EditContentButtonContainer({ align })}>
          <button className={Styles.EditContentButton} onClick={handleMoveUp}>
            <CaretUpSVG className={Styles.EditContentButtonIcon} />
          </button>
          <button className={Styles.EditContentButton} onClick={handleDelete}>
            <TrashSVG className={Styles.EditContentButtonIcon} />
          </button>
          <button className={Styles.EditContentButton} onClick={handleMoveDown}>
            <CaretDownSVG className={Styles.EditContentButtonIcon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutPageEditContent;
