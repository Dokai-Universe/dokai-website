import Header from "@components/layout/Header/Header";
import * as Styles from "./style.css";
import Modals from "./Modals";
import { Suspense } from "react";

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={Styles.Layout}>
      <Suspense fallback={null}>
        <Modals />
      </Suspense>
      <Header />
      <div className={Styles.Content}>{children}</div>
    </div>
  );
};

export default HeaderLayout;
