import { AboutContentTeam } from "@domain/about";
import * as Styles from "./style.css";
import React from "react";

type AboutPageTeamProps = {
  content: AboutContentTeam;
};

const AboutPageTeam = ({ content }: AboutPageTeamProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentName()}>{content.name}</p>
      <div
        className={`${Styles.ContentText} rich-text`}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
      <div className={Styles.TeamContainer}>
        {content.content.map((member, memberIndex) => (
          <React.Fragment key={`ABOUT_TEAM_${memberIndex}`}>
            <p className={Styles.TeamRole}>{member.role}</p>
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
      </div>
    </div>
  );
};

export default AboutPageTeam;
