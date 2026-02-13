import * as Styles from "./style.css";
import { AboutTeam } from "@domain/about";
import React from "react";

type AboutPageTeamProps = {
  name: string;
  text: string;
  content: AboutTeam[];
};

const AboutPageTeamSection = ({ name, text, content }: AboutPageTeamProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentTitle}>{name}</p>
      <p className={Styles.ContentText}>{text}</p>
      <div className={Styles.TeamContainer}>
        {content.map((member, idx) => (
          <React.Fragment key={`ABOUT_TEAM_${idx}`}>
            <p className={Styles.TeamRole}>{member.role}</p>
            <div className={Styles.TeamNames}>
              {member.names.map((name, idx) => (
                <p key={`ABOUT_TEAM_${member.role}_${idx}`}>{name}</p>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AboutPageTeamSection;
