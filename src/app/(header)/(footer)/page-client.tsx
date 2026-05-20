"use client";

import * as Styles from "./style.css";
import MainWorks from "./MainWorks";
import MoreButton from "@components/ui/Button/More/MoreButton";
import { useRouter } from "nextjs-toploader/app";

const MainPageClient = () => {
  const router = useRouter();

  const handleMoreClick = () => {
    router.push("/work");
  };

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <p className={Styles.Title}>
        DOKAI is the only high-end studio delivering major commercial projects
        end-to-end—from AI planning to global distribution.
      </p>
      <MainWorks />
      <MoreButton onClick={handleMoreClick} />
    </div>
  );
};

export default MainPageClient;
