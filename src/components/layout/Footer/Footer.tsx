"use client";

import Link from "next/link";
import LogoPNG from "@assets/dokai.png";
import * as Styles from "./Footer.css";
import Image from "next/image";
import ExternalLinks from "@ts/external_links";
import { getRandomColor, getReadableTextColor } from "@utils/Color";
import CompanyInfo from "@ts/company_info";
import NaverMap from "@components/ui/NaverMap/NaverMap";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const footerRef = useRef<HTMLDivElement>(null);

  const { email, tel, address } = CompanyInfo;

  useEffect(() => {
    const bg = getRandomColor();
    const fg = getReadableTextColor(bg);

    if (footerRef.current) {
      footerRef.current.style.setProperty("--footer-bg", bg);
      footerRef.current.style.setProperty("--footer-fg", fg);
      footerRef.current.style.setProperty(
        "--footer-logo-invert",
        fg === "black" ? "0" : "1",
      );
    }
  }, [pathname]);

  return (
    <footer ref={footerRef} className={`${Styles.Layout} layout-wrapper`}>
      <div className={Styles.Content}>
        <p className={Styles.ContentTitle}>Contact</p>
        <div className={Styles.ContentWrapper}>
          <div className={Styles.ItemContainer}>
            <p className={Styles.ItemTitle}>{email.label}</p>
            <Link
              href={`mailto:${email.address}`}
              className={`${Styles.ItemSub}`}
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
            <div className={Styles.ItemMapContainer}>
              <NaverMap />
            </div>
          </div>
        </div>
      </div>
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
        </nav>
        <Link href="/" className={Styles.FooterIconButton}>
          <Image src={LogoPNG} alt="logo" className={Styles.FooterIcon} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
