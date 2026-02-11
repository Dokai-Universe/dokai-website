"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MediaCard from "../MediaCard";
import { MediaSource } from "../types";
import * as Styles from "./style.css";
import CaretLeft from "@assets/icons/caret_left.svg";
import CaretRight from "@assets/icons/caret_right.svg";

type Props = {
  mediaList: MediaSource[];
  className?: string; // 슬라이더 전체 컨테이너 클래스
  initialIndex?: number;
  autoPlayMs?: number;
  pauseOnHover?: boolean;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function MediaSlider({
  mediaList,
  className,
  initialIndex = 0,
  autoPlayMs = 4000,
  pauseOnHover = true,
}: Props) {
  const count = mediaList.length;

  const [index, setIndex] = useState(() => clamp(initialIndex, 0, count - 1));

  const dragRef = useRef<{ startX: number; active: boolean } | null>(null);

  const translateX = useMemo(() => `translateX(-${index * 100}%)`, [index]);

  // ---------- autoplay ----------
  const intervalRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const clearAutoplay = useCallback(() => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (!autoPlayMs || autoPlayMs <= 0) return;
    if (count <= 1) return;

    intervalRef.current = window.setInterval(() => {
      // hover pause 등으로 paused 상태면 skip
      if (pausedRef.current) return;

      setIndex((i) => (i + 1) % count);
    }, autoPlayMs);
  }, [autoPlayMs, clearAutoplay, count]);

  const restartAutoplay = useCallback(() => {
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIndex((i) => clamp(i, 0, Math.max(0, count - 1)));
    restartAutoplay();
  }, [count, restartAutoplay]);

  // ---------- navigation helpers ----------
  const goTo = useCallback(
    (next: number, byUser = false) => {
      setIndex(() => clamp(next, 0, count - 1));
      if (byUser) restartAutoplay();
    },
    [count, restartAutoplay],
  );

  const prev = useCallback(
    (byUser = false) => {
      setIndex((i) => Math.max(0, i - 1));
      if (byUser) restartAutoplay();
    },
    [restartAutoplay],
  );

  const next = useCallback(
    (byUser = false) => {
      setIndex((i) => Math.min(count - 1, i + 1));
      if (byUser) restartAutoplay();
    },
    [count, restartAutoplay],
  );

  if (count <= 1) {
    const media = mediaList[0];
    if (!media) return null;
    return <MediaCard className={className} media={media} />;
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, active: true };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d?.active) return;
    d.active = false;

    const dx = e.clientX - d.startX;
    const threshold = 40; // px
    if (dx > threshold) prev(true);
    else if (dx < -threshold) next(true);
    else restartAutoplay();
  };

  const onPointerCancel = () => {
    if (dragRef.current) dragRef.current.active = false;
  };

  const onMouseEnter = () => {
    if (!pauseOnHover) return;
    pausedRef.current = true;
  };

  const onMouseLeave = () => {
    if (!pauseOnHover) return;
    pausedRef.current = false;
    restartAutoplay();
  };

  return (
    <div className={`${Styles.Container} ${className ?? ""}`}>
      <div
        className={Styles.Viewport}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="region"
        aria-label="Media slider"
      >
        <div className={Styles.Track} style={{ transform: translateX }}>
          {mediaList.map((media, i) => (
            <MediaCard
              key={i}
              className={`${Styles.Slide} ${className}`}
              media={media}
            />
          ))}
        </div>

        <div className={Styles.Controls}>
          <div className={Styles.ButtonContainer}>
            <button
              onClick={() => prev(true)}
              disabled={index === 0}
              aria-label="Previous"
              type="button"
              className={Styles.Button}
            >
              <CaretLeft className={Styles.ButtonIcon} />
            </button>
          </div>

          <div className={Styles.Dots} aria-label="Slide indicators">
            {mediaList.map((_, i) => (
              <button
                key={i}
                type="button"
                className={Styles.Dot}
                data-active={i === index}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className={Styles.ButtonContainer}>
            <button
              onClick={() => next(true)}
              disabled={index === count - 1}
              aria-label="Next"
              type="button"
              className={Styles.Button}
            >
              <CaretRight className={Styles.ButtonIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
