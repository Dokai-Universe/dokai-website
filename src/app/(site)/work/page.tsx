import { MockWorkItems } from "@ts/mock";
import WorkPageClient from "./client";

const WorkPage = async () => {
  const workItems = await MockWorkItems();

  return <WorkPageClient workItems={workItems} />;
};

export default WorkPage;
