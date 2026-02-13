"use client";

import { useEffect, useState } from "react";

export function useMe() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.ok) setMe(await res.json());
      else setMe(null);
      setLoading(false);
    })();
  }, []);

  return { me, loading, isAuthed: !!me };
}
