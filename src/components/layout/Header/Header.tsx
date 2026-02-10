"use client";

import { useCallback, useState } from "react";
import * as Styles from "./style.css";
import DrawerMenu from "../Drawer/Drawer";
import useLockBodyScroll from "@hooks/useLockBodyScroll";
import Search from "../Search/Search";
import HeaderLogo from "./Logo";
import HeaderNav from "./Nav";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useLockBodyScroll(isDrawerOpen || isSearchOpen);

  const handleToggleDrawer = useCallback(
    () => setIsDrawerOpen((prev) => !prev),
    [],
  );

  const handleCloseDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const handleOpenSearch = useCallback(() => setIsSearchOpen(true), []);

  const handleCloseSearch = useCallback(() => setIsSearchOpen(false), []);

  const closeModals = useCallback(() => {
    setIsDrawerOpen(false);
    setIsSearchOpen(false);
  }, []);

  return (
    <header className={`${Styles.Layout} layout-wrapper`}>
      <HeaderLogo closeModals={closeModals} />
      <HeaderNav
        isDrawerOpen={isDrawerOpen}
        openSearch={handleOpenSearch}
        toggleDrawer={handleToggleDrawer}
      />
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
