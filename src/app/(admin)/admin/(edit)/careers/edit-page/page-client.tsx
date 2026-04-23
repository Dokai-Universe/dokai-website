"use client";

import EditModeToggle from "@components/ui/Edit/EditModeToggle/EditModeToggle";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import * as Styles from "./style.css";
import { careersQueriesClient } from "@controllers/careers/query.client";
import { useAppMutation, useAppQuery } from "@controllers/common";
import CareersPageProfileList from "@components/pages/careers/ProfileList";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CareersPageFormInput,
  careersPageSchema,
  initalCareersPage,
} from "@components/pages/careers/career";
import { CareerPageDetail } from "@domain/careers";
import CareersPageContent from "@components/pages/careers/Content";
import CareersPageEditContent from "@components/pages/careers/EditContent";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { careersMutations } from "@controllers/careers/mutation";
import { useModalStackStore } from "@stores/modalStackStore";
import CareersPageEditProfileList from "@components/pages/careers/EditProfileList";

const CareersPageEditPageClient = () => {
  const router = useRouter();
  const [mode, setMode] = useState<"VIEW" | "EDIT">("EDIT");

  const { data: profiles } = useAppQuery(careersQueriesClient.profileList());
  const { data: pageDetail } = useAppQuery(
    careersQueriesClient.careerPageDetail(),
  );
  const { mutateAsync: mutateUpdateCareersPage } = useAppMutation(
    careersMutations.updateCareersPage(),
  );

  const form = useForm<CareersPageFormInput>({
    mode: "onBlur",
    resolver: zodResolver(careersPageSchema),
    defaultValues: initalCareersPage,
  });
  const { reset, setValue, trigger, getValues, setError, clearErrors } = form;
  const { ...rest } = useWatch({ control: form.control });
  const careersPageDetail = rest as CareerPageDetail;

  useEffect(() => {
    if (pageDetail) {
      reset({
        ...initalCareersPage,
        contents: pageDetail.data.contents,
      });
    }
  }, [pageDetail, reset]);

  const handleAddContent = () => {
    const contents = getValues("contents") ?? [];
    setValue("contents", [
      ...contents,
      {
        type: "TEXT",
        name: "",
        text: "",
      },
    ]);
  };

  const { push } = useModalStackStore();

  const handleSave = async () => {
    const valid = await trigger();
    if (!valid) return;

    const formValues = getValues();
    const { ...rest } = formValues;
    const nextCareerPageDetail = rest as CareerPageDetail;

    push("API", {
      title: "Update Careers Page",
      onFetch: async () =>
        mutateUpdateCareersPage({
          data: nextCareerPageDetail,
        }),
      onConfirm: () => {
        router.replace(`/careers`);
      },
    });
  };

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <div className={Styles.HeaderContainer}>
          <EditModeToggle mode={mode} setMode={setMode} />
        </div>
        {mode === "VIEW" ? (
          <>
            {careersPageDetail?.contents.map((item, idx) => (
              <CareersPageContent
                key={`CAREER_CONTENT_${idx}`}
                content={item}
              />
            ))}
            <CareersPageProfileList profiles={profiles?.items ?? []} />
          </>
        ) : (
          <FormProvider {...form}>
            {careersPageDetail?.contents.map((_, idx) => (
              <CareersPageEditContent
                key={`CAREER_EDIT_CONTENT_${idx}`}
                index={idx}
              />
            ))}
            <AddButton
              onClick={handleAddContent}
              className={Styles.AddButton}
            />
            <CareersPageEditProfileList profiles={profiles?.items ?? []} />
          </FormProvider>
        )}
      </div>
      <FloatingButtonContainer>
        <FloatingButton
          type="SAVE"
          onClick={handleSave}
          text="Save Careers Page"
        />
      </FloatingButtonContainer>
    </>
  );
};

export default CareersPageEditPageClient;
