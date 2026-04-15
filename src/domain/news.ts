import { MediaSource } from "./media";

export type NewsChapterContent =
  | {
      type: "TEXT";
      content: string;
    }
  | {
      type: "MEDIA";
      content: MediaSource | null;
    };

//

export type NewsChapter = {
  title: string;
  contents: NewsChapterContent[];
};

export type News = {
  title: string;
  thumbnail: MediaSource | null;
  category: string;
  summary: string;
  publishedAt: Date;
  viewCount: number;
  chapters: NewsChapter[];
  externalUrl: string;
  projectManager: string;
  contentsNumero: string;
};

export type NewsListItem = {
  slug: string;
} & Pick<
  News,
  "title" | "thumbnail" | "category" | "publishedAt" | "viewCount"
>;
