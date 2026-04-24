import type { MediaSource } from "./media";

export type AboutGroup = {
  name: string;
  values: string[];
};

export type AboutCard = {
  title: string;
  text: string;
  icon: string; // 아이콘 키 or URL
};

export type AboutTeam = {
  role: string;
  names: string[];
};

export type AboutContentTeam = {
  type: "TEAM";
  name: string;
  text: string;
  content: AboutTeam[];
};

export type AboutContentCard = {
  type: "CARD";
  name: string;
  text: string;
  content: AboutCard[];
};

export type AboutContentGroup = {
  type: "GROUP";
  name: string;
  text: string;
  content: AboutGroup[];
};

export type AboutContentText = {
  type: "TEXT";
  name: string;
  text: string;
};

export type AboutContentMedias = {
  type: "MEDIAS";
  align: "LEFT" | "RIGHT";
  size: "NORMAL" | "FULL";
  name: string;
  medias: MediaSource[];
};

export type AboutContent =
  | AboutContentText
  | AboutContentGroup
  | AboutContentCard
  | AboutContentTeam
  | AboutContentMedias;

export type IndexedAboutContent = {
  id: number;
  content: AboutContent;
};

export type About = {
  intro: string;
  contents: AboutContent[];
};
