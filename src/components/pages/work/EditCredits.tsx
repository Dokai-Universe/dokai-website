import React from "react";
import * as Styles from "./style.css";
import { useFormContext } from "react-hook-form";
import { WorkInput } from "./work";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import { useModalStackStore } from "@stores/modalStackStore";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";

const WorkEditCredits = () => {
  const form = useFormContext<WorkInput>();
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const { push } = useModalStackStore();

  const credits = (watch("credits") as WorkInput["credits"]) ?? [];

  const handleEditCredit = (idx: number) => {
    push("EDIT_CREDIT", {
      initial: credits[idx],
      applyCredit: (next) => {
        setValue(
          "credits",
          credits.map((e, i) => (i === idx ? next : e)),
        );
      },
      deleteCredit: () => {
        setValue(
          "credits",
          credits.filter((_, i) => i !== idx),
        );
      },
    });
  };

  const handleAddCredit = () => {
    push("EDIT_CREDIT", {
      applyCredit: (next) => {
        setValue("credits", [...credits, next]);
      },
    });
  };

  return (
    <div className={Styles.CreditsContainer}>
      <p className={Styles.CreditsTitle}>Project Credits</p>
      <div className={Styles.CreditsContent}>
        {credits.map((credit, creditIdx) => (
          <React.Fragment key={`WORK_CREDITS_${creditIdx}`}>
            <div className={Styles.CreditsTeam}>
              {credit.team}
              <EditButton
                onClick={() => handleEditCredit(creditIdx)}
                className={Styles.EditCreditEditButton}
              />
            </div>
            {credit.members.map((member, memberIdx) => (
              <React.Fragment key={`WORK_CREDITS_${creditIdx}_${memberIdx}`}>
                <p className={Styles.CreditsRole}>{member.role}</p>
                <span className={Styles.CreditDivider} />
                <div className={Styles.CreditsNames}>
                  {member.names.map((name, nameIdx) => (
                    <p
                      key={`WORK_CREDITS_${creditIdx}_${memberIdx}_${nameIdx}`}
                    >
                      {name}
                    </p>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        <AddButton
          onClick={handleAddCredit}
          className={Styles.EditCreditAddButton}
        />
        <ErrorText message={errors.credits?.message as string} />
      </div>
    </div>
  );
};

export default WorkEditCredits;
