import { getRandomLightColor } from "@utils/Color";
import { useEffect, useRef } from "react";
import * as Styles from "./style.css";
import DrawerNav from "./Nav";
import DrawerFooter from "./Footer";

type DrawerMenuProps = {
  isOpen: boolean;
  handleOpenSearch: () => void;
};

const DrawerMenu = ({ isOpen, handleOpenSearch }: DrawerMenuProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    overlayRef.current?.style.setProperty("--drawer-bg", getRandomLightColor());
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className={`${Styles.Overlay} layout-wrapper`}
      data-open={isOpen}
      inert={!isOpen}
    >
      <DrawerNav handleOpenSearch={handleOpenSearch} />
      <DrawerFooter />
    </div>
  );
};

export default DrawerMenu;
