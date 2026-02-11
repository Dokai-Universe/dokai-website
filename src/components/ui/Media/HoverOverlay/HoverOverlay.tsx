import { getRandomColor, getReadableTextColor } from "@utils/Color";
import { useEffect, useRef } from "react";
import * as Styles from "./style.css";
import { MediaSource } from "../types";
import MediaCard from "../MediaCard";

const MediaHoverOverlay = ({
  children,
  className,
  media,
}: {
  children?: React.ReactNode;
  className?: string;
  media: MediaSource;
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
      <MediaCard media={media} className={Styles.Media} />
      <div ref={overlayRef} className={Styles.Overlay}>
        <span className={Styles.OverlayBackground} />
        <div className={Styles.OverlayContent}>{children}</div>
      </div>
    </div>
  );
};

export default MediaHoverOverlay;
