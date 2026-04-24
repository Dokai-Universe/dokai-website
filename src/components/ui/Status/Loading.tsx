import Image from "next/image";
import LoadingPNG from "@assets/Loading.png";
import { IMAGE_SIZES } from "@ts/image";
import * as Styles from "./style.css";

const LoadingComponent = ({
  className,
  useText,
}: {
  className?: string;
  useText?: true | string;
}) => {
  return (
    <div className={`${Styles.Container} ${className}`}>
      <div className={Styles.ImageContainer}>
        <Image
          src={LoadingPNG}
          alt="loading"
          fill
          sizes={IMAGE_SIZES}
          className={`${Styles.Image} ${Styles.Spin}`}
        />
      </div>
      {useText && (
        <p className={Styles.Text}>
          {useText === true ? "Loading..." : useText}
        </p>
      )}
    </div>
  );
};

export default LoadingComponent;
