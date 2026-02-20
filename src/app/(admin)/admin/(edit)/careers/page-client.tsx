"use client";

import * as CareersStyles from "@app/(header)/(footer)/careers/[email]/style.css";
import CareerDetailProfile from "@components/pages/careers/Profile/Profile";
import { useEffect, useState } from "react";
import { ProfileDetail } from "@domain/careers";
import CareerDetailProjects from "@components/pages/careers/Projects/Projects";
import CareerDetailExperiences from "@components/pages/careers/Experiences/Experiences";
import AdminButtons from "@components/ui/AdminButtons/AdminButtons";
import { useSession } from "@lib/auth/useSession";
import {
  fetchProfileCreate,
  fetchProfileDelete,
  fetchProfileUpdate,
} from "@controllers/careers/fetch";
import CareerDetailInfo from "@components/pages/careers/Info/Info";
import { useRouter } from "next/navigation";

const initalProfile: ProfileDetail = {
  email: "",
  name: "",
  role: "",
  bio: "",
  contacts: [],
  avatar: null,
  experiences: [],
  projects: [],
};

const AdminCareersPageClient = ({
  profileDetail,
}: {
  profileDetail?: ProfileDetail;
}) => {
  const router = useRouter();
  const session = useSession();
  const [profile, setProfile] = useState<ProfileDetail>(initalProfile);
  const emailEditable = !!(session.me && session.me.role === "admin");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (profileDetail) {
      setProfile(profileDetail);
      return;
    }
  }, [profileDetail]);

  useEffect(() => {
    if (!profileDetail && session.me) {
      setProfile({
        ...initalProfile,
        email: session.me.email,
      });
    }
  }, [profileDetail, session.me]);

  return (
    <div className={`${CareersStyles.Container} page-wrapper layout-wrapper`}>
      <CareerDetailInfo
        profile={profile}
        setProfile={setProfile}
        emailEditable={emailEditable}
        isPublic={isPublic}
        togglePublic={() => setIsPublic(!isPublic)}
      />
      <CareerDetailProfile
        profile={profile}
        editable
        updateProfile={setProfile}
      />
      <CareerDetailProjects
        email={profile.email}
        projects={profile.projects}
        editable
      />
      <CareerDetailExperiences
        experiences={profile.experiences}
        editable
        updateProfile={setProfile}
      />
      <AdminButtons
        adminButtons={
          !profileDetail
            ? [
                {
                  role: "STAFF",
                  type: "SAVE",
                  click: {
                    type: "FUNCTION",
                    onClick: async () => {
                      await fetchProfileCreate({
                        isPublished: isPublic,
                        data: profile,
                      });
                      router.replace(
                        `/careers/${encodeURIComponent(profile.email)}`,
                      );
                    },
                  },
                  email: profile.email,
                },
              ]
            : [
                {
                  role: "STAFF",
                  type: "SAVE",
                  click: {
                    type: "FUNCTION",
                    onClick: async () => {
                      await fetchProfileUpdate({
                        email: profile.email,
                        isPublished: isPublic,
                        data: profile,
                      });
                      router.replace(
                        `/careers/${encodeURIComponent(profile.email)}`,
                      );
                    },
                  },
                  email: profile.email,
                },
                {
                  role: "STAFF",
                  type: "REMOVE",
                  click: {
                    type: "FUNCTION",
                    onClick: async () => {
                      await fetchProfileDelete(profile.email);
                      router.replace("/careers");
                    },
                  },
                  email: profile.email,
                },
              ]
        }
      />
    </div>
  );
};

export default AdminCareersPageClient;
