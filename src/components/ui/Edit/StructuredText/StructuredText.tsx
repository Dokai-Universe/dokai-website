import { useState } from "react";
import StructuredTextEditor from "./StructuredTextEditor";
import { StructuredTextSpec } from "./utils";
import EditSVG from "@assets/icons/edit.svg";
import PlusSVG from "@assets/icons/plus.svg";
import * as Styles from "./style.css";

const StructuredText = <T extends Record<string, unknown> | string>({
  children,
  className,
  editable,
  data,
  spec,
  onUpdate,
  placeholder,
}: {
  children?: React.ReactNode;
  className?: string;
  editable?: boolean;
  data: T[];
  spec: StructuredTextSpec;
  onUpdate?: (nextData: T[]) => void;
  placeholder?: string;
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const onChange = (nextData: T[]) => {
    onUpdate?.(nextData);
    setIsEditMode(false);
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        minHeight: "3rem",
      }}
    >
      {!(editable && isEditMode) ? (
        <>
          {children}
          {editable &&
            (data.length > 0 ? (
              <button
                onClick={() => setIsEditMode(true)}
                className={Styles.Button}
              >
                <EditSVG className={Styles.ButtonIcon} />
              </button>
            ) : (
              <label className={Styles.EmptyContainer}>
                <button
                  className={Styles.AddButton}
                  onClick={() => setIsEditMode(true)}
                >
                  <PlusSVG className={Styles.AddButtonIcon} />
                </button>
              </label>
            ))}
        </>
      ) : (
        <StructuredTextEditor
          data={data}
          spec={spec}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default StructuredText;
