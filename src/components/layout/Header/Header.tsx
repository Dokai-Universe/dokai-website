"use client";

import Link from "next/link";
import LogoPNG from "@assets/dokai.png";
import SearchSVG from "@assets/icons/search.svg";
import { useCallback, useEffect, useState } from "react";
import HamburgerXSVG from "@assets/icons/hamburger-x.svg";
import * as Styles from "./Header.css";
import MenuBGSVG from "@assets/icons/menu-bg.svg";
import DrawerMenu from "../Drawer/Drawer";
import useLockBodyScroll from "@hooks/useLockBodyScroll";
import useIsPastSentinel from "@hooks/useIsPastSentinel";
import Image from "next/image";
import Search from "../Search/Search";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useLockBodyScroll(isDrawerOpen || isSearchOpen);

  const { sentinelRef, isPast: isFloatingMenu } = useIsPastSentinel();

  const handleCloseDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const handleOpenSearch = useCallback(() => setIsSearchOpen(true), []);

  const handleCloseSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    const onPopState = () => {
      setIsDrawerOpen(false);
      setIsSearchOpen(false);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return (
    <header className={Styles.Layout}>
      <Link href="/" className={Styles.LogoContainer}>
        <Image src={LogoPNG} alt="logo" className={Styles.LogoImage} />
      </Link>
      <nav ref={sentinelRef} className={Styles.NavContainer}>
        <Link href="/work" className={`${Styles.NavLabel} ${Styles.Clickable}`}>
          Work
        </Link>
        <Link
          href="/about"
          className={`${Styles.NavLabel} ${Styles.Clickable}`}
        >
          About
        </Link>
        <SearchSVG
          className={`${Styles.NavIcon} ${Styles.Clickable}`}
          onClick={handleOpenSearch}
        />
        <button
          type="button"
          className={Styles.MenuButton}
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
      <DrawerMenu
        isOpen={isDrawerOpen}
        handleClose={handleCloseDrawer}
        handleOpenSearch={handleOpenSearch}
      />
      <Search isOpen={isSearchOpen} handleClose={handleCloseSearch} />
    </header>
  );
};

export default Header;
