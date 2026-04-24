"use client";

import * as Styles from "./style.css";
import AboutPageIntro from "@components/pages/about/Intro";
import AboutPageContent from "@components/pages/about/Content";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useRouter } from "nextjs-toploader/app";
import { useAppQuery } from "@controllers/common";
import { aboutQueriesClient } from "@controllers/about/query.client";

const AboutPageClient = () => {
  const router = useRouter();
  const { data } = useAppQuery(aboutQueriesClient.aboutDetail());

  if (!data) return null;

  const aboutInfo = data.data;

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <AboutPageIntro text={aboutInfo.intro} />
        {aboutInfo.contents.map((content, index) => (
          <AboutPageContent key={`ABOUT_CONTENT_${index}`} content={content} />
        ))}
      </div>
      <FloatingButtonContainer role={["admin"]}>
        <FloatingButton
          type="EDIT"
          onClick={() => {
            router.push("/admin/about");
          }}
          text="Edit About"
        />
      </FloatingButtonContainer>
    </>
  );
};

export default AboutPageClient;
