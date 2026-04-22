import { createSupabaseServerClient } from "@lib/supabase/server";
import type { NewsDetailResponse } from "./types";

export const loadNewsDetail = async (
  slug: string,
): Promise<NewsDetailResponse | null> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("news")
    .select("id, slug, data, is_published, updated_at, view_count")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    slug: data.slug,
    isPublished: data.is_published,
    data: data.data,
    updatedAt: data.updated_at,
    viewCount: data.view_count,
  } as NewsDetailResponse;
};
