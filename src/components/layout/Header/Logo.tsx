import Image from "next/image";
import Link from "next/link";
import LogoPNG from "@assets/dokai.png";
import * as Styles from "./style.css";
import { IMAGE_SIZES } from "@ts/image";

const HeaderLogo = ({ closeModals }: { closeModals: () => void }) => {
  return (
    <Link href="/" className={Styles.LogoContainer} onClick={closeModals}>
      <Image
        src={LogoPNG}
        alt="logo"
        className={Styles.LogoImage}
        sizes={IMAGE_SIZES}
        priority
      />
    </Link>
  );
};

export default HeaderLogo;
