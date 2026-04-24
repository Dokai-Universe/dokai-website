import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { MediaSource, MediaType } from "@domain/media";
import EditButton from "../EditButton/EditButton";
import { useModalStackStore } from "@stores/modalStackStore";
import * as Styles from "./style.css";
import PlusSVG from "@assets/icons/plus.svg";

const EditMediaList = ({
  medias,
  applyMedias,
  onClick,
  className,
  cardClassName,
  buttonClassName,
  blockedTypes,
  priority,
}: {
  medias?: MediaSource[];
  applyMedias?: (medias: MediaSource[]) => void;
  onClick?: () => void;
  className?: string;
  cardClassName?: string;
  buttonClassName?: string;
  blockedTypes?: MediaType[];
  priority?: boolean;
}) => {
  const { push } = useModalStackStore();

  const handleEditMedias = () => {
    onClick?.();
    push("EDIT_MEDIA_LIST", {
      initial: medias,
      applyMedias,
      blockedTypes,
    });
  };

  return (
    <div className={`${Styles.Container} ${className}`}>
      {medias?.map((media, index) => (
        <MediaCard
          key={index}
          media={media}
          className={`${Styles.Media} ${cardClassName}`}
          priority={priority && index === 0}
        />
      ))}
      {!!medias?.length && (
        <EditButton
          onClick={handleEditMedias}
          className={`${Styles.Button} ${buttonClassName}`}
        />
      )}
      <div className={`${Styles.Media} ${cardClassName}`}>
        <button className={Styles.AddMedia} onClick={handleEditMedias}>
          <PlusSVG className={Styles.AddMediaIcon} />
        </button>
      </div>
    </div>
  );
};

export default EditMediaList;
