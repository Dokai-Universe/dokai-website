"use client";

import * as Styles from "./style.css";

import WorkDetailHeader from "./Header";
import { WorkDetail } from "./fetch";
import WorkDetailKeyVisuals from "./KeyVisuals";
import WorkDetailCredits from "./Credits";

const WorkDetailPageClient = ({ workInfo }: { workInfo: WorkDetail }) => {
  return (
    <div className={Styles.Container}>
      <WorkDetailHeader
        title={workInfo.title}
        date={workInfo.date}
        productionType={workInfo.productionType}
        extraInfo={workInfo.extraInfo}
        mainImage={workInfo.mainImage}
      />
      <WorkDetailKeyVisuals keyVisuals={workInfo.keyVisuals} />
      <WorkDetailCredits credits={workInfo.credits} />
    </div>
  );
};

export default WorkDetailPageClient;
