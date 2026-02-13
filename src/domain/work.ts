import type { MediaSource } from "./media";

export type WorkCategory =
  | "ANIMATE"
  | "BRANDING"
  | "CHARACTER"
  | "AWARD"
  | "FILM"
  | "COMMERCIAL"
  | "SOCIAL_CONTENTS";

export type WorkMetaField = {
  name: string;
  value: string;
};

export type Credit = {
  team: string;
  members: {
    role: string;
    names: string[];
  }[];
};

export type Work = {
  title: string;
  media: MediaSource;
  summary: string;
  category: WorkCategory;
  publishedAt: string;
  productionType: string;
  meta: WorkMetaField[];
  keyVisuals: MediaSource[];
  credits: Credit[];
};
