import { useState, useRef, useEffect } from "react";

type UseElementRectOptions = {
  preferBorderBox?: boolean;
  round?: boolean;
};

type ElementRect = {
  width: number;
  height: number;
};

const useElementRect = <T extends HTMLElement>(
  options: UseElementRectOptions = { preferBorderBox: true, round: false },
) => {
  const elementRef = useRef<T | null>(null);
  const [rect, setRect] = useState<ElementRect>({ width: 0, height: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const applyRect = (nextWidth: number, nextHeight: number) => {
      const width = options.round ? Math.round(nextWidth) : nextWidth;
      const height = options.round ? Math.round(nextHeight) : nextHeight;

      setRect((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      );
    };

    const initial = element.getBoundingClientRect();
    applyRect(initial.width, initial.height);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      let nextWidth = entry.contentRect.width;
      let nextHeight = entry.contentRect.height;

      if (options.preferBorderBox && entry.borderBoxSize) {
        const borderBoxSize = entry.borderBoxSize;
        const box = Array.isArray(borderBoxSize)
          ? borderBoxSize[0]
          : borderBoxSize;
        if (box) {
          if (typeof box.inlineSize === "number") nextWidth = box.inlineSize;
          if (typeof box.blockSize === "number") nextHeight = box.blockSize;
        }
      }

      applyRect(nextWidth, nextHeight);
    });

    ro.observe(element);

    return () => ro.disconnect();
  }, [options.preferBorderBox, options.round]);

  return { elementRef, ...rect };
};

export default useElementRect;
