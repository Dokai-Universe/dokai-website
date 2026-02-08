import Link from "next/link";
import LogoPNG from "@assets/dokai.png";
import LogoWhitePNG from "@assets/dokai-white.png";
import * as Styles from "./Footer.css";
import Image from "next/image";
import ExternalLinks from "@ts/external_links";
import { getRandomColor, getReadableTextColor } from "@utils/Color";
import CompanyInfo from "@ts/company_info";

const Footer = () => {
  const bg = getRandomColor();
  const fg = getReadableTextColor(bg);

  const img = fg == "black" ? LogoPNG : LogoWhitePNG;

  const { email, tel, address } = CompanyInfo;

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
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>{email.label}</p>
            <Link
              href={`mailto:${email.address}`}
              className={`${Styles.ItemSub} email`}
            >
              {email.value}
            </Link>
          </div>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>{tel.label}</p>
            <Link href={`tel:${tel.number}`} className={`${Styles.ItemSub}`}>
              {tel.value}
            </Link>
          </div>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>{address.label}</p>
            <Link
              href={address.mapsUrl}
              className={`${Styles.ItemSub} address`}
            >
              {address.value}
            </Link>
            <div className={Styles.ItemMapContainer}></div>
          </div>
        </div>
      </div>
      <span />
      <div className={Styles.Footer}>
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
          <span className={Styles.SocialSpacer} />
          <Link href="/" className={Styles.FooterIconButton}>
            <Image src={img} alt="logo" className={Styles.FooterIcon} />
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
