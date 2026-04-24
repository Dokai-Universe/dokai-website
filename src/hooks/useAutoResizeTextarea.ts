import { useLayoutEffect, useRef } from "react";

type AutoResizeOptions = {
  /** 자동 확장 최대 줄 수 (넘으면 스크롤) */
  maxRows?: number;
  /** 최소 줄 수 */
  minRows?: number;
};

function px(n: number) {
  return `${Math.max(0, Math.floor(n))}px`;
}

function getTextareaMetrics(el: HTMLTextAreaElement) {
  const style = window.getComputedStyle(el);
  const lineHeight = parseFloat(style.lineHeight);
  const paddingTop = parseFloat(style.paddingTop);
  const paddingBottom = parseFloat(style.paddingBottom);
  const borderTop = parseFloat(style.borderTopWidth);
  const borderBottom = parseFloat(style.borderBottomWidth);

  // line-height가 "normal"인 케이스 대비 (대충 폰트사이즈*1.2로 fallback)
  const fontSize = parseFloat(style.fontSize);
  const safeLineHeight = Number.isFinite(lineHeight)
    ? lineHeight
    : fontSize * 1.2;

  const verticalExtras = paddingTop + paddingBottom + borderTop + borderBottom;

  return { lineHeight: safeLineHeight, verticalExtras };
}

export function useAutoResizeTextarea(
  value: string,
  { minRows = 1, maxRows = 12 }: AutoResizeOptions = {},
) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ✅ shrink도 반영하려면 0으로 초기화 후 scrollHeight 측정
    el.style.height = "0px";

    const { lineHeight, verticalExtras } = getTextareaMetrics(el);

    const minH = lineHeight * minRows + verticalExtras;
    const maxH = lineHeight * maxRows + verticalExtras;

    const next = Math.min(Math.max(el.scrollHeight, minH), maxH);

    el.style.height = px(next);
    el.style.overflowY = el.scrollHeight > maxH ? "auto" : "hidden";
  }, [value, minRows, maxRows]);

  return ref;
}
