const FileVideoPlayer = ({
  src,
  loop,
  onLoad,
  onError,
}: {
  src: string;
  loop?: {
    start?: number;
    end?: number;
  };
  onLoad?: () => void;
  onError?: () => void;
}) => {
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!loop) return;

    const video = e.currentTarget;
    const start = loop.start ?? 0;
    const end = loop.end;

    if (typeof end === "number" && video.currentTime >= end) {
      video.currentTime = start;
      video.play();
    }
  };

  return (
    <video
      src={src}
      autoPlay={!!loop}
      muted={!!loop}
      playsInline
      controls={!loop}
      onLoadedData={(e) => {
        if (loop?.start) {
          e.currentTarget.currentTime = loop.start;
        }

        onLoad?.();
      }}
      onTimeUpdate={handleTimeUpdate}
      onError={onError}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
};

export default FileVideoPlayer;
