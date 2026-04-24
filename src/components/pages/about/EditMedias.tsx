import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";
import { AboutContentMedias } from "@domain/about";
import * as Styles from "./style.css";
import { useFormContext } from "react-hook-form";
import { AboutInput } from "./about";
import ArrowLeftSVG from "@assets/icons/arrow-left.svg";
import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import PlusSVG from "@assets/icons/plus.svg";
import { useModalStackStore } from "@stores/modalStackStore";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import ExpandSVG from "@assets/icons/expand.svg";
import ShrinkSVG from "@assets/icons/shrink.svg";

const AboutPageEditMedias = ({ index }: { index: number }) => {
  const form = useFormContext<AboutInput>();
  const { watch, setValue } = form;

  const { push } = useModalStackStore();

  const content = watch(`contents.${index}`) as AboutContentMedias;
  const align = content.align;
  const size = content.size;

  const handleEditMedias = () => {
    push("EDIT_MEDIA_LIST", {
      initial: content.medias,
      applyMedias: (medias) => {
        setValue(`contents.${index}.medias`, medias);
      },
    });
  };

  const handleChangeAlign = () => {
    setValue(`contents.${index}.align`, align === "LEFT" ? "RIGHT" : "LEFT");
  };

  const handleChangeSize = () => {
    setValue(`contents.${index}.size`, size === "NORMAL" ? "FULL" : "NORMAL");
  };

  return (
    <div className={Styles.ContentContainer}>
      <TitleInput
        title="Name"
        form={form}
        name={`contents.${index}.name`}
        className={Styles.ContentName({ align })}
      />
      <div className={Styles.EditMediasContainer({ size })}>
        {content.medias.length ? (
          <div
            className={Styles.MediasMediaContainer({
              align: content.align,
              size: content.size,
            })}
          >
            <MediaSlider
              mediaList={content.medias}
              className={Styles.MediasMedia({
                size: content.size,
              })}
            />
          </div>
        ) : (
          <button
            className={Styles.EditMediasAddMediaButton}
            onClick={handleEditMedias}
          >
            <PlusSVG className={Styles.EditMediasAddMediaButtonIcon} />
          </button>
        )}
        <div className={Styles.EditMediasButtonContainer({ align })}>
          <button
            onClick={handleChangeSize}
            className={Styles.EditMediasTopButton}
          >
            {size === "NORMAL" ? (
              <ExpandSVG className={Styles.EditMediasTopButtonIcon} />
            ) : (
              <ShrinkSVG className={Styles.EditMediasTopButtonIcon} />
            )}
          </button>
          <button
            onClick={handleChangeAlign}
            className={Styles.EditMediasTopButton}
          >
            {align === "RIGHT" ? (
              <ArrowLeftSVG className={Styles.EditMediasTopButtonIcon} />
            ) : (
              <ArrowRightSVG className={Styles.EditMediasTopButtonIcon} />
            )}
          </button>
        </div>
        <EditButton
          onClick={handleEditMedias}
          className={Styles.EditMediasEditButton}
        />
      </div>
    </div>
  );
};

export default AboutPageEditMedias;
