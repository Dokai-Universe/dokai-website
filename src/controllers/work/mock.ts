import { MediaSource } from "@components/ui/Media/types";
import { Credit, Work, WorkCard, WorkMetaField } from "@domain/work";

const meta: WorkMetaField[] = [
  {
    name: "Client",
    values: ["NHPCI"],
  },
  {
    name: "AGENCY",
    values: ["DEEP DIVE"],
  },
  {
    name: "PRODUCTION",
    values: ["클 X DOKai"],
  },
  {
    name: "CAPABILITIES",
    values: ["AI Generator + Edit/2D/DI/SOUND"],
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

export const mockWorkDetail: Work = {
  title: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
  thumbnail: {
    type: "VIDEO",
    src: "/nhi_0.png",
    alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
  },
  summary: "NHPCI Rice Consumption PromotionCampaign",
  category: "ANIMATE",
  mainMedia: {
    type: "VIDEO",
    src: "https://vimeo.com/1141952708",
    alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
  },
  publishedAt: "",
  productionType: "",
  meta: meta,
  keyVisuals: keyVisuals,
  credits: credits,
};

export const mockWorkCard: WorkCard[] = [
  {
    slug: "nhi",
    title: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    thumbnail: {
      type: "VIDEO",
      src: "/nhi_0.png",
      alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    },
    summary: "NHPCI Rice Consumption PromotionCampaign",
    category: "ANIMATE",
    fixedAt: null,
  },
  {
    slug: "nhi",
    title: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    thumbnail: {
      type: "VIDEO",
      src: "/nhi_0.png",
      alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    },
    summary: "NHPCI Rice Consumption PromotionCampaign",
    category: "ANIMATE",
    fixedAt: null,
  },
  {
    slug: "nhi",
    title: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    thumbnail: {
      type: "VIDEO",
      src: "/nhi_0.png",
      alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    },
    summary: "NHPCI Rice Consumption PromotionCampaign",
    category: "ANIMATE",
    fixedAt: null,
  },
  {
    slug: "nhi",
    title: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    thumbnail: {
      type: "VIDEO",
      src: "/nhi_0.png",
      alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    },
    summary: "NHPCI Rice Consumption PromotionCampaign",
    category: "ANIMATE",
    fixedAt: null,
  },
  {
    slug: "nhi",
    title: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    thumbnail: {
      type: "VIDEO",
      src: "/nhi_0.png",
      alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    },
    summary: "NHPCI Rice Consumption PromotionCampaign",
    category: "ANIMATE",
    fixedAt: null,
  },
  {
    slug: "nhi",
    title: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    thumbnail: {
      type: "VIDEO",
      src: "/nhi_0.png",
      alt: "[NHPCI Rice Consumption PromotionCampaign] Absolutely Rice!",
    },
    summary: "NHPCI Rice Consumption PromotionCampaign",
    category: "ANIMATE",
    fixedAt: null,
  },
];
