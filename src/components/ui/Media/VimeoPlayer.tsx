"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Player from "@vimeo/player";
import { LoopConfig } from "@domain/media";

type Props = {
  videoId: string | number;
  loop?: LoopConfig;
  onLoad?: () => void;
  onError?: (message: string) => void;
};

const clampNonNeg = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);

const VimeoPlayer = ({ videoId, loop, onLoad, onError }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  const didLoadRef = useRef(false);

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
    didLoadRef.current = false;
    setReady(false);
  }, [videoId, src]);

  const emitLoadOnce = () => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;
    setReady(true);
    onLoad?.();
  };

  const emitError = (message: string) => {
    // 에러 후에도 로딩 오버레이는 유지하는 게 보통 자연스러움
    onError?.(message);
  };

  useEffect(() => {
    if (!mounted) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const player = new Player(iframe);
    let cancelled = false;

    const handleLoaded = () => {
      if (cancelled) return;
      if (isLoop) return; // loop는 play 이후로 load 처리
      emitLoadOnce();
    };

    const handlePlay = () => {
      if (cancelled) return;
      emitLoadOnce();
    };

    const handleError = (e: string | { message: string; name: string }) => {
      if (cancelled) return;
      const msg =
        typeof e === "string"
          ? e
          : e?.message || e?.name || "Failed to load Vimeo video";
      emitError(msg);
    };

    player.on("loaded", handleLoaded);
    player.on("play", handlePlay);
    player.on("error", handleError);

    if (!isLoop) {
      // non-loop는 이벤트만으로 충분
      player
        .ready()
        .catch((e) =>
          handleError(e?.message ? e : { message: "Player not ready" }),
        );

      return () => {
        cancelled = true;
        player.off("loaded", handleLoaded);
        player.off("play", handlePlay);
        player.off("error", handleError);
        player.destroy();
      };
    }

    const init = async () => {
      try {
        const start = clampNonNeg(loop?.start ?? 0);
        const duration = await player.getDuration();
        const end = clampNonNeg(loop?.end ?? duration);
        const safeEnd = Math.max(end, start);

        const EPS = 0.15;

        await player.setVolume(0);
        player.setCurrentTime(start);
        await player.play();

        emitLoadOnce();

        const jumpToStart = async () => {
          if (cancelled) return;
          try {
            await player.setCurrentTime(start);
            await player.play();
          } catch {
            // ignore
          }
        };

        const onTime = async ({ seconds }: { seconds: number }) => {
          if (seconds >= safeEnd - EPS) {
            jumpToStart();
          }
        };

        const onEnded = () => {
          // Vimeo가 그냥 ended로 끝내버리는 케이스 대응
          void jumpToStart();
        };

        player.on("timeupdate", onTime);
        player.on("ended", onEnded);

        // cleanup에서 off 하기 위해 반환
        return () => {
          player.off("timeupdate", onTime);
          player.off("ended", onEnded);
        };
      } catch {
        // ignore
      }
      return undefined;
    };

    let offTime: undefined | (() => void);

    player
      .ready()
      .then(async () => {
        if (cancelled) return;
        offTime = await init();
      })
      .catch(handleError);

    return () => {
      cancelled = true;
      offTime?.();
      player.off("loaded", handleLoaded);
      player.off("play", handlePlay);
      player.off("error", handleError);
      player.destroy();
    };
  }, [mounted, isLoop, loop?.start, loop?.end, videoId, src]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "calc(100% + 2px)",
          height: "calc(100% + 2px)",
          top: "-1px",
          left: "-1px",
          pointerEvents: "auto",
          opacity: ready ? 1 : 0,
          transition: "opacity 300ms ease-in-out",
          transform: "scale(1.0)",
          transformOrigin: "center",
          outline: "none",
          border: "none",
          background: "black",
        }}
        frameBorder={0}
        allow={
          isLoop
            ? "autoplay; fullscreen; picture-in-picture"
            : "fullscreen; picture-in-picture"
        }
        title="Vimeo video"
      />
    </div>
  );
};

export default VimeoPlayer;
