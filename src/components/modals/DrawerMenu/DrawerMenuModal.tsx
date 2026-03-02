"use client";

import { getRandomLightColor } from "@utils/Color";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as Styles from "./style.css";
import { createPortal } from "react-dom";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import SearchSVG from "@assets/icons/search.svg";
import ArrowRightSVG from "@assets/icons/arrow-right.svg";
import { useModalStackStore } from "@stores/modalStackStore";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import LogoPNG from "@assets/dokai.png";
import ExternalLinks from "@ts/external_links";
import { IMAGE_SIZES } from "@ts/image";
import CloseLink from "@components/ui/Link/CloseLink";
import { fetchLogout } from "@controllers/auth/fetch";
import { useAppQuery } from "@controllers/common";
import { authQueriesClient } from "@controllers/auth/query.client";

const drawerNavItems = [
  { label: "Work", href: "/work", private: false },
  { label: "About", href: "/about", private: false },
  { label: "Contact", href: "/contact", private: false },
  { label: "Careers", href: "/careers", private: false },
  { label: "Admin", href: "/admin", private: true },
];

const TRANSITION_DURATION = 250;

type Props = {
  handleCloseAll: () => void;
  isOpen: boolean;
  closeModal: () => void;
};

const DrawerMenu = ({ handleCloseAll, isOpen, closeModal }: Props) => {
  const { data: sessionStatus } = useAppQuery(
    authQueriesClient.sessionStatus(),
  );
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  const { push } = useModalStackStore();

  const handleClickSearch = () => {
    push("SEARCH", { handleCloseAll });
  };

  const handleClickName = () => {
    if (count + 1 === 10) {
      handleCloseAll();
      router.push("/auth/login");
    }
    setCount((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    overlayRef.current?.style.setProperty("--drawer-bg", getRandomLightColor());
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsVisible(true));
        });
      }, 0);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        closeModal();
      }, TRANSITION_DURATION);
    }
  }, [isOpen]);

  return createPortal(
    <div
      className={Styles.Overlay({ isVisible: isVisible })}
      style={assignInlineVars({
        [Styles.TransitionDurationVar]: `${TRANSITION_DURATION}ms`,
      })}
      onMouseDown={handleCloseAll}
    >
      <div
        ref={overlayRef}
        className={`${Styles.Layout({ isVisible: isVisible })} layout-wrapper`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <nav className={Styles.NavGrid}>
          <div className={Styles.NavColumn}>
            <button
              onClick={handleClickSearch}
              className={Styles.NavSearchButton}
            >
              <SearchSVG className={Styles.NavSearchIcon} />
            </button>
            {drawerNavItems.map(
              (item) =>
                (!item.private || sessionStatus?.role) && (
                  <CloseLink
                    key={`DRAWER_MENU_${item.label}`}
                    href={item.href}
                    className={Styles.NavLink}
                    handleClose={handleCloseAll}
                  >
                    <ArrowRightSVG className={Styles.NavArrowIcon} />
                    <p>{item.label}</p>
                  </CloseLink>
                ),
            )}

            {sessionStatus?.role && (
              <button
                className={Styles.NavLink}
                onClick={async () => {
                  handleCloseAll();
                  await fetchLogout();
                  window.location.href = "/auth/login";
                }}
                style={{
                  marginTop: "1rem",
                }}
              >
                <ArrowRightSVG className={Styles.NavArrowIcon} />
                <p>LOGOUT</p>
              </button>
            )}
          </div>
        </nav>
        <footer className={Styles.Footer}>
          <p className={Styles.FooterTitle}>
            © 2026{" "}
            <span
              onClick={handleClickName}
              style={{
                opacity: (10 - count) / 10,
                userSelect: "none",
              }}
            >
              DOKAI
            </span>
            . All Rights Reserved.
          </p>
          <nav className={Styles.SocialRow}>
            {ExternalLinks.map((link) => (
              <CloseLink
                href={link.href}
                key={`FOOTER_LINK_${link.label}`}
                className={Styles.SocialLink}
                handleClose={handleCloseAll}
              >
                {link.label}
              </CloseLink>
            ))}
          </nav>
          <CloseLink
            href="/"
            className={Styles.FooterIconButton}
            handleClose={handleCloseAll}
          >
            <Image
              src={LogoPNG}
              alt="logo"
              className={Styles.FooterIcon}
              sizes={IMAGE_SIZES}
            />
          </CloseLink>
        </footer>
      </div>
    </div>,
    document.body,
  );
};

export default DrawerMenu;
