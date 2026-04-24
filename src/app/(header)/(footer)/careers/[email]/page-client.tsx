"use client";

import CareerProfile from "@components/pages/careers/Profile";
import CareerProjects from "@components/pages/careers/Projects";
import CareerExperiences from "@components/pages/careers/Experiences";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import * as Styles from "./style.css";
import { useAppQuery } from "@controllers/common";
import { careersQueriesClient } from "@controllers/careers/query.client";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useRouter } from "nextjs-toploader/app";
import { encodeEmailParam } from "@utils/Email";

const CareersDetailPageClient = ({ email }: { email: string }) => {
  const router = useRouter();
  const { data } = useAppQuery(careersQueriesClient.profileDetail(email));
  if (!data) return null;

  const { data: profileDetail, isPublished } = data;

  const handleEditProfile = () => {
    router.push(
      `/admin/careers?email=${encodeEmailParam(profileDetail.email)}`,
    );
  };

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <PrivateMark
          isPrivate={!isPublished}
          className={Styles.HeaderPrivateMark}
        />
        <CareerProfile profile={profileDetail} />
        <CareerProjects
          projects={profileDetail.projects}
          email={profileDetail.email}
        />
        <CareerExperiences experiences={profileDetail.experiences} />
      </div>
      <FloatingButtonContainer email={email}>
        <FloatingButton
          type="EDIT"
          onClick={handleEditProfile}
          text="Edit Profile"
        />
      </FloatingButtonContainer>
    </>
  );
};

export default CareersDetailPageClient;
