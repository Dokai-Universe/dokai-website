import { useMemo } from "react";
import { Credit } from "./fetch";
import * as Styles from "./style.css";

type CreditItem =
  | { type: "team"; value: string }
  | { type: "role"; value: string }
  | { type: "name"; value: string[] }
  | { type: "divider"; value: true };

const CLASS_BY_TYPE: Record<CreditItem["type"], string> = {
  team: Styles.CreditsTeamCell,
  role: Styles.CreditsRoleCell,
  name: Styles.CreditsNameCell,
  divider: Styles.CreditsDivider,
};

const WorkDetailCredits = ({ credits }: { credits: Credit[] }) => {
  const creditItems = useMemo(() => {
    return credits
      .flatMap((credit, idx, arr) => {
        const rows: (CreditItem | { type: "divider"; value: boolean })[] = [
          { type: "team", value: credit.team },
          ...credit.members.flatMap((member) => {
            return [
              { type: "role", value: member.role },
              { type: "name", value: member.names },
            ] as const;
          }),
          { type: "divider", value: idx < arr.length - 1 },
        ];

        return rows;
      })
      .filter(
        (item): item is CreditItem =>
          item.type !== "divider" || item.value === true,
      );
  }, [credits]);

  return (
    <div className={Styles.CreditsContainer}>
      <p className={Styles.CreditsTitle}>ProjectCredits</p>
      {creditItems.map((item, idx) => (
        <div key={`WORK_CREDITS_${idx}`} className={CLASS_BY_TYPE[item.type]}>
          {item.type === "team" || item.type === "role" ? (
            <p>{item.value}</p>
          ) : item.type === "name" ? (
            item.value.map((name, idx2) => (
              <p key={`WORK_CREDITS_NAME_${idx}_${idx2}`}>{name}</p>
            ))
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default WorkDetailCredits;
