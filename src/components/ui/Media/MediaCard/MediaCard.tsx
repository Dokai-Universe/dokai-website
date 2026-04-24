"use client";

import { MediaSource } from "@domain/media";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";
import React from "react";
import * as Styles from "./style.css";

const MediaCard = ({
  media,
  className,
  useAlternative,
  blockInteractive,
  priority,
}: {
  media?: MediaSource | null;
  className?: string;
  useAlternative?: boolean;
  blockInteractive?: boolean;
  priority?: boolean;
}) => {
  return (
    <div className={`${Styles.Card} ${className}`}>
      {!media ? null : media.type === "IMAGE" ? (
        <ImageCard
          image={media}
          useAlternative={useAlternative}
          key={`IMAGE_CARD_${media.src}`}
          priority={priority}
        />
      ) : (
        <VideoCard
          video={media}
          useAlternative={useAlternative}
          blockInteractive={blockInteractive}
          key={`VIDEO_CARD_${media.src}${media.type === "LOOP" ? `_${media.loop?.start}_${media.loop?.end}` : ""}`}
        />
      )}
    </div>
  );
};

export default React.memo(MediaCard);
