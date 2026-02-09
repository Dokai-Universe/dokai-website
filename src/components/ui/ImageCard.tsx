import Image from "next/image";
import VimeoPlayer from "./VimeoPlayer";

const ImageCard = ({
  className,
  src,
  alt,
  type,
  loop,
}: {
  className?: string;
  src: string;
  alt: string;
  type: "IMAGE" | "VIDEO" | "LOOP";
  loop?: { start: number; end: number };
}) => {
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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      loop={type == "LOOP" ? loop : undefined}
    />
  );
};

export default ImageCard;
