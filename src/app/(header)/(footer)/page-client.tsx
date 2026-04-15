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
        DOKAI was founded by professionals from the commercial film industry as
        an AI-driven creative group.
      </p>
      <MainWorks />
      <MoreButton onClick={handleMoreClick} />
    </div>
  );
};

export default MainPageClient;
