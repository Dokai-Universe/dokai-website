import { MediaSource } from "@components/ui/Media/types";
import { About } from "@domain/about";

const manifesto: Manifesto = {
  text: "As AI accelerates the world, DOKAI creates what technology alone cannot emotion. We craft refined visuals and human stories that connect brands with people. Beyond innovation. Toward meaningful change. This is DOKAI.",
};

const services: Services = {
  text: "Crafting domain-optimized creative services across specialized disciplines.",
  quadrant: [
    {
      name: "ATL",
      values: ["commercial film", "brand film", "campaign film"],
    },
    {
      name: "Digital",
      values: ["viral film", "SNS short form", "content"],
    },
    {
      name: "BTL",
      values: ["exhibition content", "DOOH / FOOH", "new media"],
    },
    {
      name: "Content",
      values: [
        "entertainment broadcast",
        "feature & short movie",
        "music video",
      ],
    },
  ],
  medias: [],
};

const workflow: Workflow = {
  text: "Producing high-end AI content beyond standard AI outputs, with collaborative capabilities alongside global AI artists",
  tools: [
    {
      title: "DOKAI",
      text: "Creative ideas, Art directing / Producing",
      icon: "/workflow_dokai.png",
    },
    {
      title: "NINE TAILED FOX",
      text: "Producing Global OTT series (with Netflix, Disney+, apple TV)",
      icon: "/workflow_nine_tailed_fox.png",
    },
    {
      title: "GHOST BUSTER",
      text: "Sound Design / Mixing/Creating AI Song",
      icon: "/workflow_ghost_buster.png",
    },
    {
      title: "NOOZ",
      text: "2D/ 3D Mastering/Editing /DI",
      icon: "/workflow_nooz.png",
    },
  ],
  medias: [],
};

const team: Team = {
  text: "Our team becomes an extension of yours, purpose-built from the ground up to meet any challenge.",
  members: [
    { role: "CEO", names: ["Jaehyo Lee", "Jinho Lee"] },
    { role: "Producer", names: ["Ohseok Seo"] },
    { role: "Creative director", names: ["Seung gyum Kim"] },
    { role: "Director", names: ["Seonghoon So", "Bason Baek", "Younghoi Kim"] },
    {
      role: "Art director",
      names: ["Junseok Kim", "Sehyun Jung", "Sol Lee", "Min Heo", "Minho Son"],
    },
  ],
  medias: [],
};

export type Manifesto = {
  text: string;
};

export type Services = {
  text: string;
  quadrant: {
    name: string;
    values: string[];
  }[];
  medias: MediaSource[];
};

export type Workflow = {
  text: string;
  tools: {
    title: string;
    text: string;
    icon: string;
  }[];
  medias: MediaSource[];
};

export type Team = {
  text: string;
  members: {
    role: string;
    names: string[];
  }[];
  medias: MediaSource[];
};

export type AboutInfo = {
  intro: string;
  manifesto: Manifesto;
  services: Services;
  workflow: Workflow;
  team: Team;
};

type AboutPageResponse = {
  data: About;
  updatedAt: string | null;
};

export const fetchAbout = async (): Promise<AboutPageResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/about`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (res.status === 404) {
    return { data: { intro: "", contents: [] }, updatedAt: null };
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch about: ${res.status}`);
  }

  return res.json();
};
