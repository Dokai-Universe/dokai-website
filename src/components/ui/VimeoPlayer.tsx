"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Player from "@vimeo/player";

type Props = {
  videoId: string | number;
  className?: string;
  loop?: { start: number; end: number }; // 있으면 구간루프
};

const VimeoPlayer = ({ videoId, className, loop }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMounted(true), []);

  const autoplay = !!loop;
  const muted = !!loop;

  const src = useMemo(() => {
    const params = new URLSearchParams({
      background: loop ? "1" : "0",
      autoplay: autoplay ? "1" : "0",
      muted: muted ? "1" : "0",
      playsinline: "1",
      autopause: "0",
      dnt: "1",
    });

    const t = loop ? `#t=${Math.max(loop.start, 0)}s` : "";
    return `https://player.vimeo.com/video/${videoId}?${params.toString()}${t}`;
  }, [videoId, autoplay, muted, loop]);

  useEffect(() => {
    if (!mounted) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const player = new Player(iframe);
    let cancelled = false;

    const onLoaded = () => {
      setReady(true);
    };

    player.on("loaded", () => {
      if (loop) return;
      onLoaded();
    });
    player.on("play", onLoaded);

    if (loop) {
      const { start, end } = loop;

      const init = async () => {
        try {
          await player.setVolume(0);
          await player.setCurrentTime(start);
          await player.play();
        } catch {}
      };

      const onTime = async ({ seconds }: { seconds: number }) => {
        if (seconds >= end && !cancelled) {
          try {
            await player.setCurrentTime(start);
            await player.play();
          } catch {}
        }
      };

      player.on("timeupdate", onTime);
      player.ready().then(init);

      return () => {
        cancelled = true;
        player.off("timeupdate", onTime);
        player.off("loaded", onLoaded);
        player.off("play", onLoaded);
        player.destroy();
      };
    }

    return () => {
      player.off("loaded", onLoaded);
      player.off("play", onLoaded);
      player.destroy();
    };
  }, [videoId, loop, mounted]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
      }}
    >
      {mounted && (
        <iframe
          ref={iframeRef}
          src={src}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          frameBorder={0}
          allow={
            loop
              ? "autoplay; fullscreen; picture-in-picture"
              : "fullscreen; picture-in-picture"
          }
          title="Vimeo video"
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: ready ? 0 : 1,
          transition: "opacity 300ms ease-in-out",
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(10px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default VimeoPlayer;
