import { getRandomColor, getReadableTextColor } from "@utils/Color";
import { useEffect, useRef } from "react";
import * as Styles from "./style.css";
import MediaCard from "../MediaCard/MediaCard";
import { MediaSource } from "@domain/media";

const MediaHoverOverlay = ({
  children,
  className,
  media,
  priority,
}: {
  children?: React.ReactNode;
  className?: string;
  media: MediaSource | null;
  priority?: boolean;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const randomColor = getRandomColor();
    overlayRef.current?.style.setProperty("--hover-bg-color", randomColor);
    overlayRef.current?.style.setProperty(
      "--hover-fg-color",
      getReadableTextColor(randomColor),
    );
  }, []);

  return (
    <div className={`${Styles.Container} ${className}`}>
      {media && (
        <MediaCard media={media} className={Styles.Media} priority={priority} />
      )}
      <div ref={overlayRef} className={Styles.Overlay}>
        <span className={Styles.OverlayBackground} />
        <div className={Styles.OverlayContent}>{children}</div>
      </div>
    </div>
  );
};

export default MediaHoverOverlay;
