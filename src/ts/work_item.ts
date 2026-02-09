import { Category } from "./categories";
import { accentColors } from "../styles/palette";

export type WorkItem = {
  id: number;
  title: string;
  category: Category;
  imageSrc: string;
  imageType: "IMAGE" | "VIDEO";
  href: string;
  summary: string;
  bgColor: string;
};
