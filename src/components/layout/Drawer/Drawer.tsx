import ExternalLinks from "@ts/external_links";
import { getRandomLightColor } from "@utils/Color";
import Link from "next/link";
import { useMemo } from "react";
import * as Styles from "./Drawer.css";

import ArrowRightSVG from "@assets/icons/arrow-right.svg";

type DrawerMenuProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const drawerMenuItems = [
  { label: "Work", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "" },
  { label: "Careers", href: "" },
];

import SearchSVG from "@assets/icons/search.svg";

const DrawerMenu = ({ isOpen, handleClose }: DrawerMenuProps) => {
  const drawerBg = useMemo(() => getRandomLightColor(), []);

  return (
    <div
      className={Styles.Overlay}
      data-open={isOpen}
      style={
        {
          "--drawer-bg": drawerBg,
        } as React.CSSProperties
      }
      aria-hidden={!isOpen}
    >
      <div className={Styles.SectionGrid}>
        <div className={Styles.MenuColumn}>
          <SearchSVG className={Styles.MenuSearch} />
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
