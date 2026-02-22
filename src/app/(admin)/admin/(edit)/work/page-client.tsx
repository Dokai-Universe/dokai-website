"use client";

import * as WorkStyles from "@app/(header)/(footer)/work/[slug]/style.css";
import { useEffect, useState } from "react";
import { Work } from "@domain/work";
import WorkDetailHeader from "@components/pages/work/Header/Header";
import WorkDetailKeyVisuals from "@components/pages/work/KeyVisuals/KeyVisuals";
import WorkDetailCredits from "@components/pages/work/Credits/Credits";
import {
  fetchWorkCreate,
  fetchWorkDelete,
  fetchWorkUpdate,
  WorkDetailResponse,
} from "@controllers/work/fetch";
import WorkDetailInfo from "@components/pages/work/Info/Info";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";
import { useRouter } from "nextjs-toploader/app";

const initalWork: Work = {
  title: "",
  category: "ANIMATE",
  summary: "",
  thumbnail: null,
  mainMedia: null,
  publishedAt: "",
  productionType: "",
  meta: [],
  keyVisuals: [],
  credits: [],
};

const AdminWorkPageClient = ({
  workDetail,
}: {
  workDetail?: WorkDetailResponse;
}) => {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [slugChecked, setSlugChecked] = useState<"OK" | "FAIL" | "NEED_CHECK">(
    "NEED_CHECK",
  );
  const [work, setWork] = useState<Work>(initalWork);
  const [isPublic, setIsPublic] = useState(false);

  const updateWork = (updater: (work: Work) => Work) => {
    setWork((prev) => updater(prev));
  };

  const togglePublic = () => setIsPublic((prev) => !prev);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (workDetail) {
      setWork(workDetail.data);
      setSlug(workDetail.slug);
      setIsPublic(workDetail.isPublished);
    }
  }, [workDetail]);

  return (
    <div className={`${WorkStyles.Container} page-wrapper layout-wrapper`}>
      <WorkDetailInfo
        slug={slug}
        work={work}
        isPublic={isPublic}
        slugChecked={slugChecked}
        setSlug={setSlug}
        updateWork={updateWork}
        togglePublic={togglePublic}
        setSlugChecked={setSlugChecked}
      />
      <WorkDetailHeader work={work} editable updateWork={updateWork} />
      <WorkDetailKeyVisuals work={work} editable updateWork={updateWork} />
      <WorkDetailCredits work={work} editable updateWork={updateWork} />

      <AdminButtons
        adminButtons={
          !workDetail
            ? [
                {
                  role: "ADMIN",
                  type: "ADD",
                  click: {
                    type: "FUNCTION",
                    onClick: async () => {
                      console.log(work);
                      await fetchWorkCreate(slug, isPublic, work);
                      router.push(`/work/${slug}`);
                    },
                  },
                },
              ]
            : [
                {
                  role: "ADMIN",
                  type: "SAVE",
                  click: {
                    type: "FUNCTION",
                    onClick: async () => {
                      console.log(work);
                      await fetchWorkUpdate(
                        workDetail.id,
                        slug,
                        isPublic,
                        work,
                      );
                      router.push(`/work/${slug}`);
                    },
                  },
                },
                {
                  role: "ADMIN",
                  type: "REMOVE",
                  click: {
                    type: "FUNCTION",
                    onClick: async () => {
                      console.log(work);
                      await fetchWorkDelete(workDetail.id);
                      router.push(`/work`);
                    },
                  },
                },
              ]
        }
      />
    </div>
  );
};

export default AdminWorkPageClient;
