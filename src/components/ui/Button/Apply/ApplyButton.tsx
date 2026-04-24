import * as Styles from "./style.css";

const ApplyButton = ({
  onClick,
  disabled,
  text,
}: {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}) => {
  return (
    <button
      type="button"
      className={Styles.Button}
      onClick={onClick}
      disabled={disabled}
    >
      {text ?? "Apply"}
    </button>
  );
};

export default ApplyButton;
