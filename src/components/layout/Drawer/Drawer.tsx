import { getRandomLightColor } from "@utils/Color";
import { useEffect, useRef } from "react";
import * as Styles from "./Drawer.css";
import { usePathname } from "next/navigation";
import DrawerNav from "./Nav";
import DrawerFooter from "./Footer";

type DrawerMenuProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpenSearch: () => void;
};

const DrawerMenu = ({
  isOpen,
  handleClose,
  handleOpenSearch,
}: DrawerMenuProps) => {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    handleClose();
  }, [pathname, handleClose]);

  useEffect(() => {
    if (!isOpen) return;
    overlayRef.current?.style.setProperty("--drawer-bg", getRandomLightColor());
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className={`${Styles.Overlay} layout-wrapper`}
      data-open={isOpen}
      aria-hidden={!isOpen}
    >
      <DrawerNav handleOpenSearch={handleOpenSearch} />
      <DrawerFooter />
    </div>
  );
};

export default DrawerMenu;
