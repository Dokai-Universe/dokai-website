import { Category } from "./categories";
import { MediaSource } from "@components/ui/Media/types";

export type WorkItem = {
  id: number;
  title: string;
  category: Category;
  media: MediaSource;
  href: string;
  summary: string;
};
