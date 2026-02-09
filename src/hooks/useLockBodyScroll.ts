import { useEffect } from "react";

const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;

    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflowY = "scroll"; // 레이아웃 점프 방지용

    return () => {
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      document.body.style.overflowY = prev.overflowY;

      window.scrollTo(0, scrollY);
    };
  }, [locked]);
};

export default useLockBodyScroll;
