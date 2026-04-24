import Image from "next/image";
import MascotPNG from "@assets/mascot.png";
import { IMAGE_SIZES } from "@ts/image";
import * as Styles from "./style.css";

const EmptyMedia = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className={Styles.Container} onClick={onClick}>
      <div className={Styles.IconContainer}>
        <Image
          src={MascotPNG}
          alt="mascott"
          fill
          sizes={IMAGE_SIZES}
          className={Styles.Icon}
        />
      </div>
      <p className={Styles.Text}>Select a media</p>
    </div>
  );
};

export default EmptyMedia;
