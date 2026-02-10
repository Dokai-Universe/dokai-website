import Image from "next/image";
import VimeoPlayer from "./VimeoPlayer";
import { MediaSource } from "./types";
import { IMAGE_SIZES } from "@ts/image";

const MediaCard = ({
  className,
  media,
}: {
  className?: string;
  media: MediaSource;
}) => {
  const { type, src, alt } = media;

  if (type == "IMAGE") {
    return (
      <div
        className={className}
        style={{
          position: "relative",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={IMAGE_SIZES}
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  const videoId = Number(src.split("/").at(-1));
  return (
    <VimeoPlayer
      videoId={videoId}
      className={className}
      loop={type == "LOOP" ? media.loop : undefined}
    />
  );
};

export default MediaCard;
