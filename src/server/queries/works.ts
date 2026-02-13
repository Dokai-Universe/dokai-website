import type { SupabaseClient } from "@supabase/supabase-js";
import type { Work, WorkCategory } from "@domain/work";
import { decodeCursor, encodeCursor } from "../pagination/cursor";

export type WorksQuery = {
  queries?: string[]; // ✅ q 대신
  category?: WorkCategory;
  productionType?: string;
  limit?: number;
  cursor?: string;
  publishedOnly?: boolean;
};

export type WorkCard = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: WorkCategory;
  publishedAt: string;
  productionType: string;
  media: Work["media"];
  isPublished: boolean;
};

export async function fetchWorks(
  supabase: SupabaseClient,
  query: WorksQuery,
): Promise<{ items: WorkCard[]; nextCursor?: string }> {
  const limit = Math.min(Math.max(query.limit ?? 24, 1), 50);
  const cur = decodeCursor(query.cursor);
  const publishedOnly = query.publishedOnly ?? true;

  let qb = supabase
    .from("works")
    .select("id, slug, data, created_at, is_published")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(limit + 1);

  if (publishedOnly) qb = qb.eq("is_published", true);

  if (cur) {
    qb = qb.or(
      `created_at.lt.${cur.createdAt},and(created_at.eq.${cur.createdAt},id.lt.${cur.id})`,
    );
  }

  if (query.category) qb = qb.eq("data->>category", query.category);
  if (query.productionType)
    qb = qb.eq("data->>productionType", query.productionType);

  if (query.queries?.length) {
    const terms = query.queries.map((s) => s.trim()).filter(Boolean);

    if (terms.length) {
      // websearch 문법으로 AND 결합
      // 예: ["ai","nike"] -> "ai nike"
      const web = terms.join(" ");

      qb = qb.textSearch("search_tsv", web, {
        type: "websearch",
        config: "simple",
      });
    }
  }

  const { data, error } = await qb;
  if (error) throw error;

  const rows = data ?? [];
  const hasMore = rows.length > limit;
  const sliced = rows.slice(0, limit);

  const items: WorkCard[] = sliced.map((r) => {
    const w = r.data as Work;
    return {
      id: r.id,
      slug: r.slug,
      title: w.title,
      summary: w.summary,
      category: w.category,
      publishedAt: w.publishedAt,
      productionType: w.productionType,
      media: w.media,
      isPublished: !!r.is_published,
    };
  });

  const nextCursor =
    hasMore && sliced.length
      ? encodeCursor({
          createdAt: sliced[sliced.length - 1].created_at,
          id: sliced[sliced.length - 1].id,
        })
      : undefined;

  return { items, nextCursor };
}
