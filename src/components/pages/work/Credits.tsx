import { WorkCredit } from "@domain/work";
import React from "react";
import * as Styles from "./style.css";

const WorkCredits = ({ credits }: { credits: WorkCredit[] }) => {
  return (
    <div className={Styles.CreditsContainer}>
      <p className={Styles.CreditsTitle}>Project Credits</p>
      <div className={Styles.CreditsContent}>
        {credits.map((credit, creditIdx) => (
          <React.Fragment key={`WORK_CREDITS_${creditIdx}`}>
            <p className={Styles.CreditsTeam}>{credit.team}</p>
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
      </div>
    </div>
  );
};

export default WorkCredits;
