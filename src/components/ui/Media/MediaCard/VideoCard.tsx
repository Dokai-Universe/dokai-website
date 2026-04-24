import ErrorComponent from "@components/ui/Status/Error";
import LoadingComponent from "@components/ui/Status/Loading";
import { LoopSource, VideoSource } from "@domain/media";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import FileVideoPlayer from "../FileVideoPlayer";
import YouTubePlayer from "../YoutubePlayer";

const VimeoPlayer = dynamic(() => import("../VimeoPlayer"), { ssr: false });

const VIMEO_HOSTS = new Set(["vimeo.com", "www.vimeo.com", "player.vimeo.com"]);
const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
]);

type VideoKind =
  | { type: "vimeo"; id: string }
  | { type: "youtube"; id: string }
  | { type: "file"; src: string }
  | null;

export function extractVimeoId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;

  if (/^\d{6,12}$/.test(s)) return s;

  let url: URL;
  try {
    url =
      s.startsWith("http://") || s.startsWith("https://")
        ? new URL(s)
        : new URL(`https://${s}`);
  } catch {
    return null;
  }

  if (!VIMEO_HOSTS.has(url.hostname)) return null;

  const match = url.pathname.match(/(?:\/video\/|\/)?(\d{6,12})(?:\/|$)/);
  return match?.[1] ?? null;
}

export function extractYoutubeId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;

  let url: URL;
  try {
    url =
      s.startsWith("http://") || s.startsWith("https://")
        ? new URL(s)
        : new URL(`https://${s}`);
  } catch {
    return null;
  }

  if (!YOUTUBE_HOSTS.has(url.hostname)) return null;

  if (url.hostname.includes("youtu.be")) {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  const watchId = url.searchParams.get("v");
  if (watchId) return watchId;

  const embedMatch = url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/);
  return embedMatch?.[1] ?? null;
}

const isVideoFile = (src: string) => {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
};

const getVideoKind = (src?: string): VideoKind => {
  if (!src) return null;

  const vimeoId = extractVimeoId(src);
  if (vimeoId) return { type: "vimeo", id: vimeoId };

  const youtubeId = extractYoutubeId(src);
  if (youtubeId) return { type: "youtube", id: youtubeId };

  if (isVideoFile(src)) return { type: "file", src };

  return null;
};

const VideoCard = ({
  video,
  useAlternative,
  blockInteractive,
}: {
  video?: VideoSource | LoopSource;
  useAlternative?: boolean;
  blockInteractive?: boolean;
}) => {
  const [state, setState] = useState<{
    step: "loading" | "error" | "loaded" | "idle";
    errorText?: string;
  }>({
    step: "idle",
  });

  const videoKind = useMemo(() => getVideoKind(video?.src), [video?.src]);

  useEffect(() => {
    if (!videoKind) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setState({ step: "idle" });
    } else {
      setState({ step: "loading" });
    }
  }, [videoKind]);

  const handleError = () =>
    setState({
      step: "error",
      errorText: "Invalid video",
    });

  return (
    <>
      {video && videoKind?.type === "vimeo" && (
        <VimeoPlayer
          videoId={videoKind.id}
          loop={video.type === "LOOP" ? video.loop : undefined}
          onLoad={() => setState({ step: "loaded" })}
          onError={handleError}
        />
      )}

      {video && videoKind?.type === "youtube" && (
        <YouTubePlayer
          videoId={videoKind.id}
          loop={video.type === "LOOP" ? video.loop : undefined}
          onLoad={() => setState({ step: "loaded" })}
          onError={handleError}
        />
      )}

      {video && videoKind?.type === "file" && (
        <FileVideoPlayer
          src={videoKind.src}
          loop={video.type === "LOOP" ? video.loop : undefined}
          onLoad={() => setState({ step: "loaded" })}
          onError={handleError}
        />
      )}

      {blockInteractive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "auto",
          }}
        />
      )}

      {useAlternative && state.step !== "loaded" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {state.step === "error" ? (
            <ErrorComponent errorText={state.errorText} />
          ) : state.step === "loading" ? (
            <LoadingComponent />
          ) : null}
        </div>
      )}
    </>
  );
};

export default VideoCard;
