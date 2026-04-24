"use client";

import { authQueryKeys } from "@controllers/auth/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AuthDonePage() {
  const qc = useQueryClient();

  useEffect(() => {
    qc.invalidateQueries({ queryKey: authQueryKeys.session() });
    (async () => {
      const url = new URL(window.location.href);
      const next = url.searchParams.get("next") || "/";
      const error = url.searchParams.get("error");

      const target = error
        ? `/auth/login?error=${encodeURIComponent(error)}`
        : next;

      if (window.opener) {
        window.opener.location.href = target;
        window.close();
        return;
      }

      window.location.href = target;
    })();
  }, []);

  return <div style={{ padding: 24 }}>Finishing...</div>;
}
