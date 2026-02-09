"use client";

import ExternalLinks from "@ts/external_links";
import { getRandomLightColor } from "@utils/Color";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as Styles from "./Drawer.css";

import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import SearchSVG from "@assets/icons/search.svg";

type DrawerMenuProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpenSearch: () => void;
};

const drawerMenuItems = [
  { label: "Work", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "" },
  { label: "Careers", href: "" },
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
      <div className={`${Styles.SectionGrid} ${Styles.FooterGrid}`}>
        <p className={Styles.FooterText}>© 2026 DOKAI</p>
        <div className={Styles.SocialRow}>
          {ExternalLinks.map((link) => (
            <Link
              key={`DRAWER_MENU_${link.label}`}
              href={link.href}
              className={Styles.SocialLink}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerMenu;
