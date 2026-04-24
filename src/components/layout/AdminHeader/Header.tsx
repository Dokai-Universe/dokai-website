"use client";

import { useState } from "react";
import ArrowLeftSVG from "@assets/icons/arrow-left.svg";
import ToggleUpSVG from "@assets/icons/toggle-up.svg";
import Link from "next/link";
import * as Styles from "./style.css";
import useAuthUser from "@hooks/useAuthUser";

const AdminHeader = () => {
  const [isShowNav, setIsShowNav] = useState(true);
  const [session] = useAuthUser();

  return (
    <header data-is-show-nav={isShowNav} className={Styles.Container}>
      <div className={Styles.Content}>
        <Link href="/" className={Styles.BackButton}>
          <ArrowLeftSVG className={Styles.BackButtonIcon} />
        </Link>
        <p className={Styles.Email}>{session?.email}</p>

        <nav className={Styles.Nav}>
          <Link className={Styles.NavItem} href="/admin/work-list">
            Works
          </Link>
        </nav>
      </div>

      <button
        data-is-show-nav={isShowNav}
        className={Styles.ToggleButton}
        onClick={() => setIsShowNav((prev) => !prev)}
      >
        <ToggleUpSVG className={Styles.ToggleButtonIcon} />
      </button>
    </header>
  );
};

export default AdminHeader;
