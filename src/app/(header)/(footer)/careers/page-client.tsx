"use client";

import * as Styles from "./style.css";
import { useAppQuery } from "@controllers/common";
import { careersQueriesClient } from "@controllers/careers/query.client";
import { useRouter } from "nextjs-toploader/app";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import CareersPageContent from "@components/pages/careers/Content";
import CareersPageProfileList from "@components/pages/careers/ProfileList";
import useAuthUser from "@hooks/useAuthUser";

const CareersPageClient = () => {
  const router = useRouter();
  const { data: pageDetail } = useAppQuery(
    careersQueriesClient.careerPageDetail(),
  );
  const { data } = useAppQuery(careersQueriesClient.profileList());
  const [session] = useAuthUser();
  const careersPageDetail = pageDetail?.data;

  const handleAddProfile = () => {
    router.push(`/admin/careers`);
  };

  const handleEditProfile = () => {
    if (!session?.email || !session.hasProfile) return;
    router.push(`/admin/careers?email=${encodeURIComponent(session.email)}`);
  };

  const handleEditCareersPage = () => {
    router.push(`/admin/careers/edit-page`);
  };

  if (!data) return null;

  const profiles = data.items;

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        {careersPageDetail?.contents.map((item, idx) => (
          <CareersPageContent key={`CAREER_CONTENT_${idx}`} content={item} />
        ))}
        <CareersPageProfileList profiles={profiles} />
      </div>
      <FloatingButtonContainer>
        {session?.role === "admin" ? (
          <>
            <FloatingButton
              type="EDIT"
              onClick={handleEditCareersPage}
              text="Edit Careers Page"
            />
            {session?.hasProfile && (
              <FloatingButton
                type="EDIT"
                onClick={handleEditProfile}
                text="Edit My Profile"
              />
            )}
            <FloatingButton
              type="ADD"
              onClick={handleAddProfile}
              text="Add Profile"
            />
          </>
        ) : session?.hasProfile ? (
          <FloatingButton
            type="EDIT"
            onClick={handleEditProfile}
            text="Edit My Profile"
          />
        ) : (
          <FloatingButton
            type="ADD"
            onClick={handleAddProfile}
            text="Add Profile"
          />
        )}
      </FloatingButtonContainer>
    </>
  );
};

export default CareersPageClient;
