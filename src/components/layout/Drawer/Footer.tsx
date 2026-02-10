import * as Styles from "./style.css";
import Link from "next/link";
import Image from "next/image";
import LogoPNG from "@assets/dokai.png";
import ExternalLinks from "@ts/external_links";

const DrawerFooter = () => {
  return (
    <footer className={Styles.Footer}>
      <p className={Styles.FooterTitle}>© 2026 DOKAI. All Rights Reserved.</p>
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
