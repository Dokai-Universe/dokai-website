import { createSupabaseBrowserClient } from "@lib/supabase/browser";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authQueryKeys } from "@controllers/auth/queryKeys";
import { fetchSessionStatus } from "@controllers/auth/fetch";
import { SessionStatus } from "@controllers/auth/types";

const useAuthUser = () => {
  const [user, setUser] = useState<SessionStatus | null>(null);
  const supabase = createSupabaseBrowserClient();
  const qc = useQueryClient();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) return;

      const user = qc.getQueryData(authQueryKeys.session());
      if (user) {
        setUser(user as SessionStatus);
        return;
      }

      const data = await fetchSessionStatus();
      qc.setQueryData(authQueryKeys.session(), data);
      setUser(data);
    });
    return () => data.subscription.unsubscribe();
  }, [supabase, qc]);

  return [user];
};

export default useAuthUser;
