import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { MediaSource, MediaType } from "@domain/media";
import EditButton from "../EditButton/EditButton";
import { useModalStackStore } from "@stores/modalStackStore";
import * as Styles from "./style.css";
import PlusSVG from "@assets/icons/plus.svg";

const EditMediaSingle = ({
  media,
  applyMedia,
  onClick,
  className,
  cardClassName,
  buttonClassName,
  blockedTypes,
  priority,
}: {
  media?: MediaSource | null;
  applyMedia?: (media: MediaSource) => void;
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
    push("EDIT_MEDIA_SINGLE", {
      initial: media,
      applyMedia,
      blockedTypes,
    });
  };

  return (
    <div className={`${Styles.Container} ${className}`}>
      {media ? (
        <>
          <MediaCard
            media={media}
            className={`${Styles.Media} ${cardClassName ?? className}`}
            priority={priority}
          />
          <EditButton
            onClick={handleEditMedias}
            className={`${Styles.Button} ${buttonClassName}`}
          />
        </>
      ) : (
        <div className={`${Styles.Media} ${cardClassName ?? className}`}>
          <button className={Styles.AddMedia} onClick={handleEditMedias}>
            <PlusSVG className={Styles.AddMediaIcon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditMediaSingle;
