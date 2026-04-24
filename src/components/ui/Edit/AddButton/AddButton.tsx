import * as Styles from "./style.css";
import PlusSVG from "@assets/icons/plus.svg";

const AddButton = ({
  onClick,
  className,
  type = "button",
  disabled,
}: {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  return (
    <button
      className={`${Styles.Button} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <PlusSVG className={Styles.ButtonIcon} />
    </button>
  );
};

export default AddButton;
