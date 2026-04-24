import { getRandomColor } from "@utils/Color";
import FooterClient from "./client";

const Footer = () => {
  const randomColor = getRandomColor();
  return <FooterClient initialColor={randomColor} />;
};

export default Footer;
