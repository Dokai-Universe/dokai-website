import * as Styles from "./style.css";
import EditSVG from "@assets/icons/edit.svg";

const EditButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button className={`${Styles.Button} ${className}`} onClick={onClick}>
      <EditSVG className={Styles.ButtonIcon} />
    </button>
  );
};

export default EditButton;
