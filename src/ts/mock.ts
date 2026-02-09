import { getRandomColor } from "@utils/Color";
import { Category } from "./categories";
import { WorkItem } from "./work_item";

type Work = {
  title: string;
  type: Category;
  image: string;
  imageType: "IMAGE" | "VIDEO";
  url: string;
  summary: string;
};

const MockWorks: Work[] = [
  {
    title: "LGU+ ixi-O Brand Film",
    type: "BRANDING",
    image:
      "https://i.vimeocdn.com/video/2108770713-7b33694005448c736529d7e93e716a413cefcfb5711026f9ab62f6d01a399529-d_640x360?&r=pad&region=us",
    imageType: "IMAGE",
    url: "",
    summary: "An brand film for LGU+ ixi-O",
  },
  {
    title: "NH Life 2025 Brand Campaign",
    type: "BRANDING",
    image:
      "https://i.vimeocdn.com/video/2096421920-9577367b905fda173e2afbe0ed3304df6ca944e7bffc9f159d50cd00b3309795-d_640x360?&r=pad&region=us",
    imageType: "IMAGE",
    url: "",
    summary: "Welcome to Kori Club",
  },
  {
    title: "PANTHEON",
    type: "AWARD",
    image: "/pantheon.png",
    imageType: "IMAGE",
    url: "",
    summary: "Greek Mythology",
  },
  {
    title: "JESPRI Packed to the Full! ",
    type: "COMMERCIAL",
    image:
      "https://i.vimeocdn.com/video/2108766307-d98927a4c90e0f843df8249fe54c7722ec3ddd6e3f685eb6e1c281a4bed3ada8-d_640x360?&r=pad&region=us",
    imageType: "IMAGE",
    url: "",
    summary: "JESPRI MV(feat. Lee Su-hyun of AKMU)",
  },
];

export const MockMainItems = Array.from({ length: 16 }).map((_, index) => {
  const work = MockWorks[Math.floor(Math.random() * MockWorks.length)];
  return {
    ...work,
    id: index,
    url: `/work/${index}`,
  };
});

export const MockWorkItems: () => Promise<WorkItem[]> = async () => {
  return Promise.resolve(
    Array.from({ length: 16 }).map((_, index) => {
      const work = MockWorks[Math.floor(Math.random() * MockWorks.length)];
      return {
        ...work,
        id: index,
        href: `/work/${index}`,
        bgColor: getRandomColor(),
        imageSrc: work.image,
        imageType: work.imageType,
        category: work.type,
      };
    }),
  );
};
