import CrossSVG from "@assets/icons/cross.svg";
import { useEffect, useRef, useState } from "react";
import * as Styles from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createPortal } from "react-dom";

const TRANSITION_DURATION = 200;

type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  maxWidth?: string;
  className?: string;
};

const ModalLayout = ({
  title,
  isOpen,
  className,
  onClose,
  children,
  maxWidth = "34rem",
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsVisible(true));
        });
      }, 0);
    } else {
      handleClose();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, TRANSITION_DURATION);
  };

  return createPortal(
    <div
      className={Styles.Overlay({ isVisible: isVisible })}
      style={assignInlineVars({
        [Styles.TransitionDurationVar]: `${TRANSITION_DURATION}ms`,
        [Styles.MaxWidthVar]: maxWidth,
      })}
      onMouseDown={handleClose}
    >
      <div
        className={Styles.Layout({ isVisible: isVisible })}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={Styles.Header}>
          <p className={Styles.HeaderTitle}>{title}</p>
          <button className={Styles.CloseButton} onClick={handleClose}>
            <CrossSVG className={Styles.CloseButtonIcon} />
          </button>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalLayout;
