"use client";

import CareerExperiences from "@components/pages/careers/Experiences";
import CareerProfile from "@components/pages/careers/Profile";
import CareerProjects from "@components/pages/careers/Projects";
import EditModeToggle from "@components/ui/Edit/EditModeToggle/EditModeToggle";
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import { Profile, ProfileDetail } from "@domain/careers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  initalProfile,
  ProfileFormInput,
  profileSchema,
} from "@components/pages/careers/career";
import CareerEditInfo from "@components/pages/careers/EditInfo";
import CareerEditProfile from "@components/pages/careers/EditProfile";
import CareerEditExperiences from "@components/pages/careers/EditExperiences";
import * as Styles from "./style.css";
import { useModalStackStore } from "@stores/modalStackStore";
import {
  fetchProfileCheckEmail,
  fetchProfileDelete,
} from "@controllers/careers/fetch";
import { useRouter } from "nextjs-toploader/app";
import FloatingButton from "@components/ui/Button/FloatingButton/FloatingButton";
import { useAppMutation, useAppQuery } from "@controllers/common";
import { careersQueriesClient } from "@controllers/careers/query.client";
import { careersMutations } from "@controllers/careers/mutation";
import { encodeEmailParam } from "@utils/Email";
import useAuthUser from "@hooks/useAuthUser";

const AdminCareersPageClient = ({ email }: { email?: string }) => {
  const router = useRouter();
  const [mode, setMode] = useState<"VIEW" | "EDIT">("EDIT");
  const { data } = useAppQuery(careersQueriesClient.profileDetail(email!), {
    enabled: !!email,
  });
  const [session] = useAuthUser();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [firstLoaded, setFirstLoaded] = useState(false);

  const { mutateAsync: mutateCreateProfile } = useAppMutation(
    careersMutations.createProfile(),
    {
      onSuccess: (data) => {
        setProfileId(data.profileId);
        // queryClient.invalidateQueries({ queryKey: ["careers", "profileList"] })
      },
    },
  );
  const { mutateAsync: mutateUpdateProfile } = useAppMutation(
    careersMutations.updateProfile(profileId!),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries({ queryKey: ["careers", "profileList"] })
      },
    },
  );
  const userEmail = session?.email;

  const form = useForm<ProfileFormInput>({
    mode: "onBlur",
    resolver: zodResolver(profileSchema),
    defaultValues: initalProfile,
  });
  const { setValue, trigger, getValues, setError, clearErrors } = form;
  const { isPublished, ...rest } = useWatch({ control: form.control });
  const profile = rest as Profile;

  useEffect(() => {
    if (!email && userEmail) {
      setValue("email", userEmail);
    }
  }, [email, userEmail]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (data && !firstLoaded) {
      setProfileId(data.id);
      form.reset({
        ...initalProfile,
        ...data.data,
        isPublished: data.isPublished,
      });
      setFirstLoaded(true);
    }
  }, [data]);

  const push = useModalStackStore((s) => s.push);

  const validateAndPush = async (mode: "create" | "update") => {
    const valid = await trigger();
    if (!valid) return;

    const formValues = getValues();
    const { isPublished: nextIsPublished, ...rest } = formValues;
    const nextProfileDetail = rest as ProfileDetail;
    const nextEmail = nextProfileDetail.email;

    const shouldCheck = mode === "create" || (email && nextEmail !== email);

    if (shouldCheck) {
      try {
        const result = await fetchProfileCheckEmail(nextEmail);

        if (result.exists) {
          setError("email", {
            type: "manual",
            message: "This email is already in use",
          });
          return;
        }
      } catch {
        setError("email", {
          type: "manual",
          message: "Email check failed",
        });
      }

      clearErrors("email");
    }

    if (mode === "create") {
      push("API", {
        title: "Create New Profile",
        onFetch: async () =>
          mutateCreateProfile({
            isPublished: nextIsPublished,
            data: nextProfileDetail,
          }),
        onConfirm: () => {
          router.replace(`/careers/${encodeEmailParam(nextEmail)}`);
        },
      });
    } else {
      if (!profileId) return;

      push("API", {
        title: "Update Profile",
        onFetch: async () =>
          mutateUpdateProfile({
            isPublished: nextIsPublished,
            data: nextProfileDetail,
          }),
        onConfirm: () => {
          router.replace(`/careers/${encodeEmailParam(nextEmail)}`);
        },
      });
    }
  };

  const handleCreateProfile = async () => {
    await validateAndPush("create");
  };

  const handleUpdateProfile = async () => {
    await validateAndPush("update");
  };

  const handleDeleteProfile = async () => {
    if (!profileId) return;
    push("CONFIRM", {
      title: "Delete Profile",
      content: "Are you sure to delete this profile?",
      onConfirm: () => {
        push("API", {
          title: "Delete Profile",
          onFetch: async () => fetchProfileDelete(profileId),
          onConfirm: () => {
            router.replace(`/careers`);
          },
        });
      },
    });
  };

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <div className={Styles.HeaderContainer}>
        <EditModeToggle mode={mode} setMode={setMode} />
        <PrivateMark
          isPrivate={!isPublished}
          className={Styles.HeaderPrivateMark}
        />
      </div>
      {mode === "VIEW" ? (
        <>
          <CareerProfile profile={profile} />
          <CareerProjects
            projects={data?.data.projects ?? []}
            email={profile.email}
          />
          <CareerExperiences experiences={profile.experiences} />
        </>
      ) : (
        <FormProvider {...form}>
          <CareerEditInfo email={email} />
          <CareerEditProfile />
          <CareerProjects
            projects={data?.data.projects ?? []}
            email={data?.data.email ?? ""}
            inEditPage={true}
          />
          <CareerEditExperiences />
        </FormProvider>
      )}
      <div className={Styles.ButtonContainer}>
        {profileId ? (
          <>
            <FloatingButton
              type="SAVE"
              text="Update Profile"
              onClick={handleUpdateProfile}
            />
            <FloatingButton
              type="REMOVE"
              text="Delete Profile"
              onClick={handleDeleteProfile}
            />
          </>
        ) : (
          <FloatingButton
            type="SAVE"
            text="Create Profile"
            onClick={handleCreateProfile}
          />
        )}
      </div>
    </div>
  );
};

export default AdminCareersPageClient;
