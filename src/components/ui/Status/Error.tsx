import Image from "next/image";
import ErrorPNG from "@assets/Error.png";
import { IMAGE_SIZES } from "@ts/image";
import * as Styles from "./style.css";

const ErrorComponent = ({
  className,
  errorText,
}: {
  className?: string;
  errorText?: string;
}) => {
  return (
    <div className={`${Styles.Container} ${className}`}>
      <div className={Styles.ImageContainer}>
        <Image
          src={ErrorPNG}
          alt="error"
          fill
          sizes={IMAGE_SIZES}
          className={Styles.Image}
        />
      </div>
      <p className={Styles.Text} style={{ color: "red" }}>
        {errorText ?? "Unknown Error"}
      </p>
    </div>
  );
};

export default ErrorComponent;
