import { createSupabaseServerClient } from "@lib/supabase/server";
import type { WorkDetailResponse } from "./types";

export const loadWorkDetail = async (
  slug: string,
): Promise<WorkDetailResponse | null> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("works")
    .select("id, slug, data, is_published, updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    slug: data.slug,
    isPublished: data.is_published,
    data: data.data,
    updatedAt: data.updated_at,
  } as WorkDetailResponse;
};
