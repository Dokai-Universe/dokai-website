import SearchSVG from "@assets/icons/search.svg";
import * as Styles from "./Drawer.css";
import Link from "next/link";
import ArrowRightSVG from "@assets/icons/arrow-right.svg";

const drawerNavItems = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const DrawerNav = ({ handleOpenSearch }: { handleOpenSearch: () => void }) => {
  return (
    <nav className={Styles.NavGrid}>
      <div className={Styles.NavColumn}>
        <button onClick={handleOpenSearch} className={Styles.NavSearchButton}>
          <SearchSVG className={Styles.NavSearchIcon} />
        </button>
        {drawerNavItems.map((menu) => (
          <Link
            key={`DRAWER_MENU_${menu.label}`}
            href={menu.href}
            className={Styles.NavLink}
          >
            <ArrowRightSVG className={Styles.NavArrowIcon} />
            <p>{menu.label}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DrawerNav;
