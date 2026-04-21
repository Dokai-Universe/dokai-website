"use client";

import { useAppQuery } from "@controllers/common";
import { worksQueriesClient } from "@controllers/works/query.client";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useRouter } from "nextjs-toploader/app";
import WorkKeyVisuals from "@components/pages/work/KeyVisuals";
import WorkCredits from "@components/pages/work/Credits";
import WorkHeader from "@components/pages/work/Header";
import * as Styles from "./style.css";

const WorkDetailPageClient = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { data } = useAppQuery(worksQueriesClient.workDetail(slug));

  if (!data) return null;

  const { data: work, isPublished } = data;

  const handleEditWork = () => {
    router.push(`/admin/work?slug=${encodeURIComponent(slug)}`);
  };

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <PrivateMark
          isPrivate={!isPublished}
          className={Styles.HeaderPrivateMark}
        />
        <WorkHeader work={work} />
        <WorkKeyVisuals keyVisuals={work.keyVisuals} />
        <WorkCredits credits={work.credits} />
      </div>
      <FloatingButtonContainer role={["admin"]}>
        <FloatingButton type="EDIT" onClick={handleEditWork} text="Edit Work" />
      </FloatingButtonContainer>
    </>
  );
};

export default WorkDetailPageClient;
