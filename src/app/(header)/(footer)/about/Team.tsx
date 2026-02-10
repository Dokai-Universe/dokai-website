import { useMemo } from "react";
import { Team } from "./fetch";
import * as Styles from "./style.css";

type AboutPageTeamProps = {
  team: Team;
};

type MemberItem =
  | { type: "role"; value: string }
  | { type: "names"; value: string[] };

const CLASS_BY_TYPE: Record<MemberItem["type"], string> = {
  role: Styles.TeamRole,
  names: Styles.TeamNames,
};

const AboutPageTeam = ({ team }: AboutPageTeamProps) => {
  const members = useMemo(() => {
    const members: MemberItem[] = team.members.flatMap((member) => {
      return [
        {
          type: "role",
          value: member.role,
        },
        {
          type: "names",
          value: member.names,
        },
      ] as const;
    });

    return members;
  }, [team.members]);

  console.log(members);

  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentTitle}>Team</p>
      <p className={Styles.ContentText}>{team.text}</p>
      <div className={Styles.TeamContainer}>
        {members.map((member, idx) => (
          <div
            key={`ABOUT_TEAM_${member.type}_${idx}`}
            className={CLASS_BY_TYPE[member.type]}
          >
            {member.type === "role" ? (
              <p>{member.value}</p>
            ) : (
              member.value.map((name, idx) => (
                <p key={`ABOUT_TEAM_${member.type}_${idx}`}>{name}</p>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPageTeam;
