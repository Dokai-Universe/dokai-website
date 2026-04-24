import ImageSVG from "@assets/icons/image.svg";
import VideoSVG from "@assets/icons/video.svg";
import * as Styles from "./style.css";
import { useMemo } from "react";
import { MediaType } from "@domain/media";

const SelectMedia = ({
  blockedTypes,
  selectMedia,
}: {
  blockedTypes?: MediaType[];
  selectMedia: (type: "IMAGE" | "VIDEO" | "NONE") => void;
}) => {
  const { canImage, canVideo, canLoop, canAnyVideoLike } = useMemo(() => {
    const canImage = !blockedTypes?.includes("IMAGE");
    const canVideo = !blockedTypes?.includes("VIDEO");
    const canLoop = !blockedTypes?.includes("LOOP");
    const canAnyVideoLike = canVideo || canLoop;

    return {
      canImage,
      canVideo,
      canLoop,
      canAnyVideoLike,
    };
  }, [blockedTypes]);

  if (!canImage || !canAnyVideoLike) {
    if (!canImage && !canAnyVideoLike) {
      selectMedia("NONE");
    } else if (!canAnyVideoLike) {
      selectMedia("IMAGE");
    } else {
      selectMedia("VIDEO");
    }

    return null;
  }

  return (
    <div className={Styles.SelectMediaContainer}>
      <button
        type="button"
        onClick={() => selectMedia("IMAGE")}
        className={Styles.SelectMediaButton}
      >
        <ImageSVG className={Styles.SelectMediaButtonIcon} />
        <p className={Styles.SelectMediaButtonText}>Image</p>
      </button>
      <button
        type="button"
        onClick={() => selectMedia("VIDEO")}
        className={Styles.SelectMediaButton}
      >
        <VideoSVG className={Styles.SelectMediaButtonIcon} />
        <p className={Styles.SelectMediaButtonText}>Video</p>
      </button>
    </div>
  );
};

export default SelectMedia;
