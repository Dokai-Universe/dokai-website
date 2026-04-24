import * as Styles from "./style.css";
import TrashSVG from "@assets/icons/trash.svg";

const RemoveButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button className={`${Styles.Button} ${className}`} onClick={onClick}>
      <TrashSVG className={Styles.ButtonIcon} />
    </button>
  );
};

export default RemoveButton;
