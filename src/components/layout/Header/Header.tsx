"use client";

import Link from "next/link";
import LogoSVG from "@assets/dokai.svg";
import SearchSVG from "@assets/icons/search.svg";
import { useState } from "react";
import HamburgerXSVG from "@assets/icons/hamburger-x.svg";
import * as Style from "./Header.css";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <header className={Style.Layout}>
      <Link href="/">
        <LogoSVG />
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/about">About</Link>
        <Link href="/works">Works</Link>
        <SearchSVG style={{ stroke: "red" }} />
        <HamburgerXSVG
          data-open={openDrawer}
          onClick={() => setOpenDrawer(!openDrawer)}
        />
      </nav>
    </header>
  );
};

export default Header;
