import type { MediaSource } from "./media";

export type ContactLink = {
  name: string;
  value: string;
  href: string;
};

export type ContentText = {
  type: "TEXT";
  name: string;
  value: string;
};

export type ContentList = {
  type: "LIST";
  name: string;
  value: string[];
};

export type Content = ContentText | ContentList;

export type Profile = {
  email: string;
  avatar: MediaSource | null;
  bio: string;
  contacts: ContactLink[];
  experiences: string[];
};

export type Project = {
  id: string;
  title: string;
  thumbnail: MediaSource | null;
  contents: Content[];
  medias: MediaSource[];
};

export type ProfileListItem = Pick<Profile, "email" | "avatar">;
export type ProjectCard = Pick<Project, "id" | "title" | "thumbnail">;
export type ProfileDetail = Profile & { projects: ProjectCard[] };
