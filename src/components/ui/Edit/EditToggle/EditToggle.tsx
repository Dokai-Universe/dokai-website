import * as Styles from "./style.css";

interface EditToggleProps {
  title?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const EditToggle = ({ title, checked, onChange }: EditToggleProps) => {
  return (
    <label className={Styles.Container}>
      {title && <p className={Styles.Title}>{title}</p>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange?.(e.target.checked);
        }}
        className={Styles.Input}
      />
      <span className={Styles.Toggle} />
    </label>
  );
};

export default EditToggle;
