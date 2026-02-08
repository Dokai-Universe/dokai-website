"use client";

import Link from "next/link";
import LogoSVG from "@assets/dokai.svg";
import SearchSVG from "@assets/icons/search.svg";
import { useCallback, useState } from "react";
import HamburgerXSVG from "@assets/icons/hamburger-x.svg";
import * as Styles from "./Header.css";
import MenuBGSVG from "@assets/icons/menu-bg.svg";
import DrawerMenu from "../Drawer/Drawer";
import useLockBodyScroll from "@hooks/useLockBodyScroll";
import useIsPastSentinel from "@hooks/useIsPastSentinel";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useLockBodyScroll(isDrawerOpen);

  const { sentinelRef, isPast: isFloatingMenu } = useIsPastSentinel();

  const handleClose = useCallback(() => setIsDrawerOpen(false), []);

  return (
    <header className={Styles.Layout}>
      <Link href="/" className={Styles.LogoContainer}>
        <LogoSVG className={Styles.LogoImage} />
      </Link>
      <nav ref={sentinelRef} className={Styles.NavContainer}>
        <Link
          href="/works"
          className={`${Styles.NavLabel} ${Styles.Clickable}`}
        >
          Work
        </Link>
        <Link
          href="/about"
          className={`${Styles.NavLabel} ${Styles.Clickable}`}
        >
          About
        </Link>
        <SearchSVG className={`${Styles.NavIcon} ${Styles.Clickable}`} />
        <button
          type="button"
          className={`${Styles.MenuButton} ${Styles.Clickable}`}
          data-floating={isFloatingMenu}
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          aria-expanded={isDrawerOpen}
          aria-label="Open menu"
        >
          <MenuBGSVG
            className={Styles.MenuDeco}
            data-floating={isFloatingMenu}
          />
          <HamburgerXSVG className={Styles.NavIcon} data-open={isDrawerOpen} />
        </button>
      </nav>
      <DrawerMenu isOpen={isDrawerOpen} handleClose={handleClose} />
    </header>
  );
};

export default Header;
