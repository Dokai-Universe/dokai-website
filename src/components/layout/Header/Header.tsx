"use client";

import { useCallback, useEffect, useState } from "react";
import * as Styles from "./style.css";
import DrawerMenu from "../Drawer/Drawer";
import useLockBodyScroll from "@hooks/useLockBodyScroll";
import Search from "../Search/Search";
import HeaderLogo from "./Logo";
import HeaderNav from "./Nav";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useLockBodyScroll(isDrawerOpen || isSearchOpen);

  const handleToggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
    setIsSearchOpen(false);
  }, []);

  const handleOpenSearch = useCallback(() => setIsSearchOpen(true), []);

  const handleCloseSearch = useCallback(() => setIsSearchOpen(false), []);

  const handleCloseModals = useCallback(() => {
    setIsDrawerOpen(false);
    setIsSearchOpen(false);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleCloseModals();
  }, [pathname]);

  return (
    <header className={`${Styles.Layout} layout-wrapper`}>
      <HeaderLogo closeModals={handleCloseModals} />
      <HeaderNav
        isDrawerOpen={isDrawerOpen}
        openSearch={handleOpenSearch}
        toggleDrawer={handleToggleDrawer}
      />
      <DrawerMenu isOpen={isDrawerOpen} handleOpenSearch={handleOpenSearch} />
      <Search isOpen={isSearchOpen} handleClose={handleCloseSearch} />
    </header>
  );
};

export default Header;
