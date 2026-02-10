import { MediaSource } from "@components/ui/Media/types";

export type ExtraInfo = {
  title: string;
  content: string;
};

const extraInfos: ExtraInfo[] = [
  {
    title: "Client",
    content: "NHPCI",
  },
  {
    title: "AGENCY",
    content: "DEEP DIVE",
  },
  {
    title: "PRODUCTION",
    content: "클 X DOKai",
  },
  {
    title: "CAPABILITIES",
    content: "AI Generator + Edit/2D/DI/SOUND",
  },
];

const keyVisuals: MediaSource[] = [
  {
    type: "IMAGE",
    src: "/nhi_0.png",
    alt: "nhi_0",
  },
  {
    type: "LOOP",
    src: "1141952708",
    alt: "nhi_1",
    loop: { start: 6.5, end: 9 },
  },
  {
    type: "IMAGE",
    src: "/nhi_1.png",
    alt: "nhi_2",
  },
  {
    type: "IMAGE",
    src: "/nhi_2.png",
    alt: "nhi_3",
  },
  {
    type: "LOOP",
    src: "1141952708",
    alt: "nhi_4",
    loop: { start: 14, end: 16 },
  },
  {
    type: "IMAGE",
    src: "/nhi_3.png",
    alt: "nhi_5",
  },
];

export type Credit = {
  team: string;
  members: {
    role: string;
    names: string[];
  }[];
};

const credits: Credit[] = [
  {
    team: "DOKAI",
    members: [
      {
        role: "E. Producer",
        names: ["Ohseok Seo"],
      },
      {
        role: "Director",
        names: ["Younghoi Kim"],
      },
      {
        role: "CR Director",
        names: ["Seung gyum Kim"],
      },
      {
        role: "Art director",
        names: ["Junseok Kim", "Sehyun Jung", "Sol Lee"],
      },
    ],
  },
  {
    team: "DEEP DIVE",
    members: [
      {
        role: "tmp1",
        names: ["tmp1", "tmp2"],
      },
      {
        role: "tmp2",
        names: ["tmp1"],
      },
    ],
  },
];

export type WorkDetail = {
  title: string;
  date: Date;
  productionType: string;
  mainImage: MediaSource;
  extraInfo: ExtraInfo[];
  keyVisuals: MediaSource[];
  credits: Credit[];
};

export const fetchWorkDetail = async (id: string): Promise<WorkDetail> => {
  return await Promise.resolve({
    title: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    date: new Date("2025"),
    productionType: "100% AI-generated",
    mainImage: {
      type: "VIDEO",
      src: "https://vimeo.com/1141952708",
      alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    },
    extraInfo: extraInfos,
    keyVisuals: keyVisuals,
    credits: credits,
  });
};
