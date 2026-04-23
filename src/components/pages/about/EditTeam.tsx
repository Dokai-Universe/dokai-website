import { useController, useFormContext } from "react-hook-form";
import { AboutInput } from "./about";
import * as Styles from "./style.css";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";
import { AboutTeam } from "@domain/about";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import { useModalStackStore } from "@stores/modalStackStore";
import React from "react";

const AboutPageEditTeam = ({ index }: { index: number }) => {
  const form = useFormContext<AboutInput>();
  const { control } = form;

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: `contents.${index}.content`,
  });

  const content = (field.value ?? []) as AboutTeam[];

  const { push } = useModalStackStore();

  const handleEditTeamList = () => {
    push("EDIT_ABOUT_TEAM_LIST", {
      initial: content,
      applyTeamList: (next: AboutTeam[]) => {
        form.setValue(`contents.${index}.content`, next, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      },
    });
  };

  return (
    <div className={Styles.ContentContainer}>
      <TitleInput
        title="Name"
        form={form}
        name={`contents.${index}.name`}
        className={Styles.ContentName()}
      />

      <TitleRichText
        title="Text"
        form={form}
        name={`contents.${index}.text`}
        className={Styles.ContentText}
        placeholder="Write text here..."
      />

      <div className={Styles.TeamContainer}>
        <EditButton
          onClick={handleEditTeamList}
          className={Styles.TeamEditButton}
        />

        {content.map((member, memberIndex) => (
          <React.Fragment key={`ABOUT_TEAM_${memberIndex}`}>
            <div className={Styles.TeamRole}>{member.role}</div>
            <div className={Styles.TeamDivider} />
            <div className={Styles.TeamNames}>
              {member.names.map((name, nameIndex) => (
                <p key={`ABOUT_TEAM_NAME_${memberIndex}_${nameIndex}`}>
                  {name}
                </p>
              ))}
            </div>
          </React.Fragment>
        ))}

        <ErrorText message={error?.message} />
      </div>
    </div>
  );
};

export default AboutPageEditTeam;
