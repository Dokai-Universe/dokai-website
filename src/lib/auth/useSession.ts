"use client";

import { useEffect, useState } from "react";

export function useSession() {
  const [me, setMe] = useState<{
    role: string;
    email: string;
    loggedIn: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/auth/session`,
        {
          credentials: "include",
        },
      );
      if (res.ok) setMe(await res.json());
      else setMe(null);
      setLoading(false);
    })();
  }, []);

  return { me, loading, isAuthed: !!me };
}
