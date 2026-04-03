"use client";

import { useEffect, useState } from "react";
import * as Styles from "./style.css";
import Link from "next/link";
import Image from "next/image";
import LogoPNG from "@assets/dokai.png";
import { IMAGE_SIZES } from "@ts/image";
import useIsPastSentinel from "@hooks/useIsPastSentinel";
import { useModalStackStore } from "@stores/modalStackStore";
import SearchSVG from "@assets/icons/search.svg";
import HamburgerXSVG from "@assets/icons/hamburger-x.svg";
import MenuBGSVG from "@assets/icons/menu-bg.svg";
import CloseLink from "@components/ui/Link/CloseLink";
import { usePathname, useSearchParams } from "next/navigation";
import useAuthUser from "@hooks/useAuthUser";

const navList = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
];

const Header = () => {
  const { sentinelRef, isPast: isFloatingMenu } = useIsPastSentinel();
  const { push, requestCloseByTypes } = useModalStackStore();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useAuthUser();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpenMenu(false);
  }, [pathname, searchParams]);

  const handleCloseAll = () => {
    setIsOpenMenu(false);
    requestCloseByTypes(["DRAWER_MENU", "SEARCH"]);
  };

  const handleClickMenu = () => {
    if (!isOpenMenu) {
      push("DRAWER_MENU", { handleCloseAll });
      setIsOpenMenu(true);
    } else {
      handleCloseAll();
    }
  };

  const handleClickSearch = () => {
    push("SEARCH", { handleCloseAll });
  };

  return (
    <header className={`${Styles.Layout} layout-wrapper`}>
      <CloseLink
        href="/"
        className={Styles.LogoContainer}
        handleClose={handleCloseAll}
      >
        <Image
          src={LogoPNG}
          alt="logo"
          className={Styles.LogoImage}
          sizes={IMAGE_SIZES}
          priority
        />
      </CloseLink>
      <nav ref={sentinelRef} className={Styles.NavContainer}>
        {navList.map((nav) => (
          <Link
            key={`HEADER_NAV_${nav.label}`}
            href={nav.href}
            className={Styles.NavLabel}
          >
            {nav.label}
          </Link>
        ))}
        <button onClick={handleClickSearch} className={Styles.NavSearchButton}>
          <SearchSVG className={Styles.NavIcon} />
        </button>
        <button
          onClick={handleClickMenu}
          className={Styles.NavDrawerButton}
          data-floating={isFloatingMenu}
          aria-expanded={isOpenMenu}
          aria-label="Open menu"
        >
          <MenuBGSVG className={Styles.NavDrawerButtonDeco} />
          <HamburgerXSVG className={Styles.NavIcon} data-open={isOpenMenu} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
