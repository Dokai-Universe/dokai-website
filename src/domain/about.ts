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

export type AboutMedias = {
  align: "LEFT" | "RIGHT";
  medias: MediaSource[];
};

export type AboutSection =
  | {
      contentType: "TEXT";
      text: string;
    }
  | {
      contentType: "GROUP";
      text: string;
      content: AboutGroup[];
    }
  | {
      contentType: "CARD";
      text: string;
      content: AboutCard[];
    }
  | {
      contentType: "TEAM";
      text: string;
      content: AboutTeam[];
    };

export type AboutContent =
  | {
      type: "MEDIAS";
      value: AboutMedias;
    }
  | {
      type: "SECTION";
      name: string; // 섹션 라벨(표시용)
      value: AboutSection;
    };

export type About = {
  intro: string;
  contents: AboutContent[];
};
