"use client";

import Link from "next/link";
import LogoSVG from "@assets/dokai.svg";
import SearchSVG from "@assets/icons/search.svg";
import { useState } from "react";
import HamburgerXSVG from "@assets/icons/hamburger-x.svg";
import * as Styles from "./Header.css";
import MenuBGSVG from "@assets/icons/menu-bg.svg";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <header className={Styles.Layout}>
      <Link href="/" className={Styles.LogoContainer}>
        <LogoSVG className={Styles.LogoImage} />
      </Link>
      <nav className={Styles.NavContainer}>
        <Link href="/works" className={Styles.NavLabel}>
          Work
        </Link>
        <Link href="/about" className={Styles.NavLabel}>
          About
        </Link>
        <SearchSVG className={Styles.NavIcon} />

        <div
          className={Styles.MenuButton}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuBGSVG className={Styles.MenuDeco} />
          <HamburgerXSVG className={Styles.NavIcon} data-open={openDrawer} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
