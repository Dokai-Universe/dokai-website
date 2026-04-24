import { createSupabaseServerClient } from "@lib/supabase/server";
import type { AboutDetailResponse } from "./types";

export const loadAboutDetail =
  async (): Promise<AboutDetailResponse | null> => {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("about_page")
      .select("id, data, updated_at")
      .eq("id", "about")
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      data: data.data,
      updatedAt: data.updated_at,
    } as AboutDetailResponse;
  };
