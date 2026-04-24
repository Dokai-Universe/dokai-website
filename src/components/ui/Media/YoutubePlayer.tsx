"use client";

import { useEffect, useRef } from "react";
type YouTubePlayerInstance = {
  mute: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
  getCurrentTime: () => number;
  destroy: () => void;
};

type YouTubePlayerEvent = {
  target: YouTubePlayerInstance;
};

type YouTubePlayerOptions = {
  videoId: string;
  width?: string;
  height?: string;
  playerVars?: {
    autoplay?: 0 | 1;
    mute?: 0 | 1;
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    fs?: 0 | 1;
    modestbranding?: 0 | 1;
    rel?: 0 | 1;
    playsinline?: 0 | 1;
    iv_load_policy?: 1 | 3;
    cc_load_policy?: 0 | 1;
    start?: number;
  };
  events?: {
    onReady?: (event: YouTubePlayerEvent) => void;
    onError?: () => void;
  };
};

type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: YouTubePlayerOptions,
  ) => YouTubePlayerInstance;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const loadYouTubeApi = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  return new Promise<YouTubeApi>((resolve) => {
    const prevReady = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      prevReady?.();
      if (window.YT) {
        resolve(window.YT);
      }
    };

    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }
  });
};

const YouTubePlayer = ({
  videoId,
  loop,
  onLoad,
  onError,
}: {
  videoId: string;
  loop?: {
    start?: number;
    end?: number;
  };
  onLoad?: () => void;
  onError?: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const intervalRef = useRef<number | null>(null);

  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);

  const start = loop?.start ?? 0;
  const end = loop?.end;
  const isLoop = !!loop;

  useEffect(() => {
    onLoadRef.current = onLoad;
    onErrorRef.current = onError;
  }, [onLoad, onError]);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;

    loadYouTubeApi()
      .then((YT) => {
        if (!mounted || !containerRef.current) return;

        playerRef.current = new YT.Player(containerRef.current, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: isLoop ? 1 : 0,
            mute: isLoop ? 1 : 0,
            controls: isLoop ? 0 : 1,
            disablekb: isLoop ? 1 : 0,
            fs: isLoop ? 0 : 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            iv_load_policy: 3,
            cc_load_policy: 0,
            start,
          },
          events: {
            onReady: (event: YouTubePlayerEvent) => {
              if (isLoop) {
                event.target.mute();
                event.target.seekTo(start, true);
                event.target.playVideo();
              }

              onLoadRef.current?.();
            },
            onError: () => {
              onErrorRef.current?.();
            },
          },
        });

        if (isLoop && typeof end === "number") {
          intervalRef.current = window.setInterval(() => {
            const player = playerRef.current;
            if (!player?.getCurrentTime) return;

            if (player.getCurrentTime() >= end) {
              player.seekTo(start, true);
              player.playVideo();
            }
          }, 200);
        }
      })
      .catch(() => {
        onErrorRef.current?.();
      });

    return () => {
      mounted = false;

      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId, isLoop, start, end]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {isLoop && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "auto",
          }}
        />
      )}
    </div>
  );
};

export default YouTubePlayer;
