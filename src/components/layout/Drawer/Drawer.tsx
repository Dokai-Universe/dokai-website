"use client";

import ExternalLinks from "@ts/external_links";
import { getRandomLightColor } from "@utils/Color";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as Styles from "./Drawer.css";
import LogoPNG from "@assets/dokai.png";

import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import SearchSVG from "@assets/icons/search.svg";
import Image from "next/image";

type DrawerMenuProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpenSearch: () => void;
};

const drawerMenuItems = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const DrawerMenu = ({
  isOpen,
  handleClose,
  handleOpenSearch,
}: DrawerMenuProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    overlayRef.current?.style.setProperty("--drawer-bg", getRandomLightColor());
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className={Styles.Overlay}
      data-open={isOpen}
      aria-hidden={!isOpen}
    >
      <div className={Styles.SectionGrid}>
        <div className={Styles.MenuColumn}>
          <SearchSVG className={Styles.MenuSearch} onClick={handleOpenSearch} />
          {drawerMenuItems.map((menu) => (
            <Link
              key={`DRAWER_MENU_${menu.label}`}
              href={menu.href}
              className={Styles.MenuLink}
              onClick={handleClose}
            >
              <ArrowRightSVG className={Styles.MenuArrow} />
              <p>{menu.label}</p>
            </Link>
          ))}
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
    </div>
  );
};

export default DrawerMenu;
