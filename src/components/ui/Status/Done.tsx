import Image from "next/image";
import DonePNG from "@assets/Done.png";
import { IMAGE_SIZES } from "@ts/image";
import * as Styles from "./style.css";

const DoneComponent = ({
  className,
  doneText,
}: {
  className?: string;
  doneText: string;
}) => {
  return (
    <div className={`${Styles.Container} ${className}`}>
      <div className={Styles.ImageContainer}>
        <Image
          src={DonePNG}
          alt="loading"
          fill
          sizes={IMAGE_SIZES}
          className={Styles.Image}
        />
      </div>
      <p className={Styles.Text}>{doneText}</p>
    </div>
  );
};

export default DoneComponent;
