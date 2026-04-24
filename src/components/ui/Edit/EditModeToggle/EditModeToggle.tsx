import * as Styles from "./style.css";

interface EditModeToggleProps {
  mode: "EDIT" | "VIEW";
  setMode: (mode: "EDIT" | "VIEW") => void;
}

const EditModeToggle = ({ mode, setMode }: EditModeToggleProps) => {
  return (
    <label className={Styles.Container}>
      <p className={Styles.Title}>Edit</p>
      <input
        type="checkbox"
        checked={mode === "EDIT"}
        onChange={(e) => {
          setMode(e.target.checked ? "EDIT" : "VIEW");
        }}
        className={Styles.Input}
      />
      <span className={Styles.Toggle} />
    </label>
  );
};

export default EditModeToggle;
