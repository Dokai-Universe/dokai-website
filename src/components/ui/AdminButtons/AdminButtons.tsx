"use client";

import { useSessionStatusQuery } from "@controllers/auth/session";
import useMount from "@hooks/useMount";
import PlusSVG from "@assets/icons/plus.svg";
import * as Styles from "./style.css";
import { useRouter } from "next/navigation";
import EditSVG from "@assets/icons/edit.svg";
import SaveSVG from "@assets/icons/save.svg";
import TrashSVG from "@assets/icons/trash.svg";

type AdminButton = {
  role: "ADMIN" | "STAFF";
  type: "EDIT" | "ADD" | "REMOVE" | "SAVE";
  click:
    | {
        type: "HREF";
        href: string;
      }
    | {
        type: "FUNCTION";
        onClick: () => void;
      };
  email?: string;
};

const AdminButtons = ({
  adminButtons = [],
}: {
  adminButtons?: AdminButton[];
}) => {
  const mounted = useMount();
  const { data: session } = useSessionStatusQuery();
  const router = useRouter();

  if (!mounted || !session?.loggedIn) return null;

  return (
    <div className={Styles.ButtonsContainer}>
      {adminButtons.map((button) => {
        const { role, type, click, email } = button;
        if (role === "ADMIN" && session?.role !== "admin") return null;
        if (role === "STAFF" && email && session?.email !== email) return null;

        return (
          <button
            key={button.type}
            className={Styles.Button}
            onClick={
              click.type === "FUNCTION"
                ? click.onClick
                : () => {
                    router.push(click.href);
                  }
            }
          >
            {type === "EDIT" && <EditSVG className={Styles.ButtonIcon} />}
            {type === "ADD" && <PlusSVG className={Styles.ButtonIcon} />}
            {type === "REMOVE" && <TrashSVG className={Styles.ButtonIcon} />}
            {type === "SAVE" && <SaveSVG className={Styles.ButtonIcon} />}
          </button>
        );
      })}
    </div>
  );
};

export default AdminButtons;
