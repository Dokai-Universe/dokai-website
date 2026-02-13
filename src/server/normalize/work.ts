import type { Work } from "@domain/work";

export function normalizeWork(input: Partial<Work>): Work {
  const w = input as Work;

  return {
    title: w.title ?? "",
    media: w.media,
    summary: w.summary ?? "",
    category: w.category,
    publishedAt: w.publishedAt ?? new Date().toISOString().slice(0, 10),
    productionType: w.productionType ?? "",
    meta: w.meta ?? [],
    keyVisuals: w.keyVisuals ?? [],
    credits: w.credits ?? [],
  };
}
