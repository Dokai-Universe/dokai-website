import Link from "next/link";
import * as Styles from "./style.css";
import useIsPastSentinel from "@hooks/useIsPastSentinel";
import SearchSVG from "@assets/icons/search.svg";
import HamburgerXSVG from "@assets/icons/hamburger-x.svg";
import MenuBGSVG from "@assets/icons/menu-bg.svg";

const navList = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

const HeaderNav = ({
  isDrawerOpen,
  openSearch,
  toggleDrawer,
}: {
  isDrawerOpen: boolean;
  openSearch: () => void;
  toggleDrawer: () => void;
}) => {
  const { sentinelRef, isPast: isFloatingMenu } = useIsPastSentinel();

  return (
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
      <button onClick={openSearch} className={Styles.NavSearchButton}>
        <SearchSVG className={Styles.NavIcon} />
      </button>
      <button
        onClick={toggleDrawer}
        className={Styles.NavDrawerButton}
        data-floating={isFloatingMenu}
        aria-expanded={isDrawerOpen}
        aria-label="Open menu"
      >
        <MenuBGSVG className={Styles.NavDrawerButtonDeco} />
        <HamburgerXSVG className={Styles.NavIcon} data-open={isDrawerOpen} />
      </button>
    </nav>
  );
};

export default HeaderNav;
