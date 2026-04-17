import { MediaSource } from "./media";

export type NewsChapterContent =
  | {
      type: "TEXT";
      text: string;
    }
  | {
      type: "MEDIA";
      media: MediaSource | null;
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
  chapters: NewsChapter[];
  externalUrl: string;
  projectManager: string;
  contentsNumero: string;
};

export type NewsListItem = {
  slug: string;
} & Pick<News, "title" | "thumbnail" | "category" | "publishedAt">;
