"use client";

import Link from "next/link";
import LogoSVG from "@assets/dokai.png";

import * as FooterStyles from "@components/layout/Footer/Footer.css";
import * as Styles from "./style.css";
import Image from "next/image";
import CompanyInfo from "@ts/company_info";
import NaverMap from "@components/ui/NaverMap/NaverMap";
import VimeoSVG from "@assets/social/Vimeo.svg";
import YoutubeSVG from "@assets/social/Youtube.svg";
import InstagramSVG from "@assets/social/Instagram.svg";
import BehanceSVG from "@assets/social/Behance.svg";

const ExternalLinks = [
  {
    label: "Vimeo",
    icon: VimeoSVG,
    href: "https://vimeo.com/dokaiuniverse",
  },
  {
    label: "Youtube",
    icon: YoutubeSVG,
    href: "https://www.youtube.com/@Dokaiuniverse",
  },
  {
    label: "Instagram",
    icon: InstagramSVG,
    href: "https://www.instagram.com/dokai_universe/",
  },
  {
    label: "Behance",
    icon: BehanceSVG,
    href: "https://www.behance.net/dokaiuniverse",
  },
];

const ContactPage = () => {
  const { email, tel, address } = CompanyInfo;

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <div className={Styles.Content}>
        <p className={FooterStyles.ContentTitle}>Contact</p>
        <div className={FooterStyles.ContentWrapper}>
          <div className={FooterStyles.ItemContainer}>
            <p className={FooterStyles.ItemTitle}>{email.label}</p>
            <Link
              href={`mailto:${email.address}`}
              className={`${FooterStyles.ItemSub}`}
            >
              {email.value}
            </Link>
          </div>
          {/* <div className={FooterStyles.ItemContainer}>
            <p className={FooterStyles.ItemTitle}>{tel.label}</p>
            <Link
              href={`tel:${tel.number}`}
              className={`${FooterStyles.ItemSub}`}
            >
              {tel.value}
            </Link>
          </div> */}
          <div className={FooterStyles.ItemContainer}>
            <p className={FooterStyles.ItemTitle}>{address.label}</p>
            <Link
              href={address.mapsUrl}
              className={`${FooterStyles.ItemSub} address`}
            >
              {address.value}
            </Link>
            <div className={FooterStyles.ItemMapContainer}>
              <NaverMap />
            </div>
          </div>
        </div>
      </div>
      <div className={FooterStyles.Footer}>
        <p className={FooterStyles.FooterTitle}>
          © 2026 DOKAI. All Rights Reserved.
        </p>
        <nav className={FooterStyles.SocialRow}>
          {ExternalLinks.map((link) => (
            <Link
              href={link.href}
              key={`FOOTER_LINK_${link.label}`}
              className={FooterStyles.SocialLink}
            >
              <p className={FooterStyles.SocialLabel}>{link.label}</p>
              <link.icon className={FooterStyles.SocialIcon} />
            </Link>
          ))}
        </nav>
        <Link href="/" className={FooterStyles.FooterIconButton}>
          <Image src={LogoSVG} alt="logo" className={FooterStyles.FooterIcon} />
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
