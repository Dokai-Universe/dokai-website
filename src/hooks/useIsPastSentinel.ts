import { useEffect, useRef, useState } from "react";

const useIsPastSentinel = () => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const io = new IntersectionObserver(
      ([entry]) => setIsPast(!entry.isIntersecting),
      { root: null, threshold: 0 },
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return { sentinelRef, isPast };
};

export default useIsPastSentinel;
