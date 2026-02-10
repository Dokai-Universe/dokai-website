"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Player from "@vimeo/player";
import { LoopConfig } from "./types";

type Props = {
  videoId: string | number;
  className?: string;
  loop?: LoopConfig;
};

const clampNonNeg = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);

const VimeoPlayer = ({ videoId, className, loop }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMounted(true), []);

  const isLoop = !!loop;
  const autoplay = isLoop;
  const muted = isLoop;

  const src = useMemo(() => {
    const params = new URLSearchParams({
      background: isLoop ? "1" : "0",
      autoplay: autoplay ? "1" : "0",
      muted: muted ? "1" : "0",
      playsinline: "1",
      autopause: "0",
      dnt: "1",
    });

    const start = clampNonNeg(loop?.start ?? 0);
    const t = isLoop ? `#t=${start}s` : "";
    return `https://player.vimeo.com/video/${videoId}?${params.toString()}${t}`;
  }, [videoId, autoplay, muted, isLoop, loop?.start]);

  useEffect(() => {
    if (!mounted) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const player = new Player(iframe);
    let cancelled = false;

    const onLoaded = () => setReady(true);

    player.on("loaded", () => {
      if (isLoop) return;
      onLoaded();
    });
    player.on("play", onLoaded);

    if (!isLoop) {
      return () => {
        player.off("loaded", onLoaded);
        player.off("play", onLoaded);
        player.destroy();
      };
    }

    const init = async () => {
      try {
        const start = clampNonNeg(loop?.start ?? 0);
        const duration = await player.getDuration();
        const end = clampNonNeg(loop?.end ?? duration);

        // start가 end보다 크면 안전하게 start로 맞추기
        const safeEnd = Math.max(end, start);

        await player.setVolume(0);
        await player.setCurrentTime(start);
        await player.play();

        // ready 처리(자동재생이 늦게 붙는 경우 대비)
        onLoaded();

        const onTime = async ({ seconds }: { seconds: number }) => {
          if (cancelled) return;
          if (seconds >= safeEnd) {
            try {
              await player.setCurrentTime(start);
              await player.play();
            } catch {}
          }
        };

        player.on("timeupdate", onTime);

        // cleanup에서 off 하기 위해 반환
        return () => player.off("timeupdate", onTime);
      } catch {
        // ignore
      }
      return undefined;
    };

    let offTime: undefined | (() => void);

    player.ready().then(async () => {
      if (cancelled) return;
      offTime = await init();
    });

    return () => {
      cancelled = true;
      offTime?.();
      player.off("loaded", onLoaded);
      player.off("play", onLoaded);
      player.destroy();
    };
  }, [videoId, isLoop, loop?.start, loop?.end, mounted]);

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
            isLoop
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
