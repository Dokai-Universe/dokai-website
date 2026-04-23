"use client";

import { useAppQuery } from "@controllers/common";
import { worksQueriesClient } from "@controllers/works/query.client";
import CategorySection from "./Category";
import * as Styles from "./style.css";

const WorksSection = () => {
  const { data: workCategories } = useAppQuery(
    worksQueriesClient.workCategories(),
  );

  return (
    <div className={Styles.Container}>
      <CategorySection categories={workCategories?.list ?? []} />
    </div>
  );
};

export default WorksSection;
