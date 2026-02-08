import Link from "next/link";
import LogoPNG from "@assets/dokai.png";
import LogoWhitePNG from "@assets/dokai-white.png";
import * as Styles from "./Footer.css";
import Image from "next/image";
import FooterLinks from "@ts/footer_links";
import FooterInfos from "@ts/footer_infos";
import { getRandomColor, getReadableTextColor } from "@utils/Color";

const Footer = () => {
  const bg = getRandomColor();
  const fg = getReadableTextColor(bg);

  const img = fg == "black" ? LogoPNG : LogoWhitePNG;

  return (
    <footer
      className={Styles.Layout}
      style={
        {
          "--footer-bg": bg,
          "--footer-fg": fg,
        } as React.CSSProperties
      }
    >
      <div className={Styles.Content}>
        <p className={Styles.ContentTitle}>Contact</p>
        <div className={Styles.ContentWrapper}>
          {FooterInfos.map((e) => (
            <div key={`FOOTER_INFO_${e.key}`} className={Styles.ItemContainer}>
              <p className={Styles.ItemTitle}>{e.key}</p>
              <p className={`${Styles.ItemSub} ${e.className}`}>{e.text}</p>
              {e.key === "Address" && (
                <div className={Styles.ItemMapContainer}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <span />
      <div className={Styles.Footer}>
        <p className={Styles.FooterTitle}>© 2026 DOKAI. All Rights Reserved.</p>
        <nav className={Styles.FooterNav}>
          {FooterLinks.map((e) => (
            <Link href={e.uri} key={`FOOTER_LINK_${e.key}`}>
              {e.key}
            </Link>
          ))}
        </nav>
        <Link href="/" className={Styles.FooterIconButton}>
          <Image src={img} alt="logo" className={Styles.FooterIcon} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
