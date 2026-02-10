"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import MediaCard from "../MediaCard";
import { MediaSource } from "../types";
import * as Styles from "./style.css";
import CaretLeft from "@assets/icons/caret_left.svg";
import CaretRight from "@assets/icons/caret_right.svg";

type Props = {
  mediaList: MediaSource[];
  className?: string; // 슬라이더 전체 컨테이너 클래스
  initialIndex?: number;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function MediaSlider({
  mediaList,
  className,
  initialIndex = 0,
}: Props) {
  const count = mediaList.length;

  const [index, setIndex] = useState(() => clamp(initialIndex, 0, count - 1));

  const goTo = useCallback(
    (next: number) => setIndex((prev) => clamp(next, 0, count - 1)),
    [count],
  );
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIndex((i) => Math.min(count - 1, i + 1)),
    [count],
  );

  // ✅ 스와이프
  const dragRef = useRef<{ startX: number; active: boolean } | null>(null);

  const translateX = useMemo(() => `translateX(-${index * 100}%)`, [index]);

  // ✅ 비디오/무거운 요소는 현재 인덱스 주변만 렌더링
  const shouldRender = useCallback(
    (i: number) => {
      return Math.abs(i - index) <= 1; // 현재/이전/다음만
    },
    [index],
  );

  // ✅ 1개면 그냥 반환
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
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
  };

  const onPointerCancel = () => {
    if (dragRef.current) dragRef.current.active = false;
  };

  return (
    <div className={`${Styles.Container} ${className ?? ""}`}>
      <div
        className={Styles.Viewport}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        role="region"
        aria-label="Media slider"
      >
        <div className={Styles.Track} style={{ transform: translateX }}>
          {mediaList.map((media, i) => (
            <div key={i} className={Styles.Slide} aria-hidden={i !== index}>
              {shouldRender(i) ? (
                <MediaCard className={className} media={media} />
              ) : (
                // ✅ 레이아웃 유지용 placeholder (비디오 iframe 미생성)
                <div className={className} />
              )}
            </div>
          ))}
        </div>

        <div className={Styles.Controls}>
          <div className={Styles.ButtonContainer}>
            <button
              onClick={prev}
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
              onClick={next}
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
