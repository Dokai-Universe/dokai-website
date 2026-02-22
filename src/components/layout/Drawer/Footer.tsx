import * as Styles from "./style.css";
import Link from "next/link";
import Image from "next/image";
import LogoPNG from "@assets/dokai.png";
import ExternalLinks from "@ts/external_links";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";

const DrawerFooter = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();

  const handleClickName = () => {
    if (count + 1 === 10) {
      router.push("/auth/login");
    }
    setCount((prev) => prev + 1);
  };

  return (
    <footer className={Styles.Footer}>
      <p className={Styles.FooterTitle}>
        © 2026{" "}
        <span
          onClick={handleClickName}
          style={{
            opacity: (10 - count) / 10,
            userSelect: "none",
          }}
        >
          DOKAI
        </span>
        . All Rights Reserved.
      </p>
      <nav className={Styles.SocialRow}>
        {ExternalLinks.map((link) => (
          <Link
            href={link.href}
            key={`FOOTER_LINK_${link.label}`}
            className={Styles.SocialLink}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link href="/" className={Styles.FooterIconButton}>
        <Image src={LogoPNG} alt="logo" className={Styles.FooterIcon} />
      </Link>
    </footer>
  );
};

export default DrawerFooter;
