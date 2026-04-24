import PlusSVG from "@assets/icons/plus.svg";
import * as Styles from "./style.css";

const MoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={Styles.Container}>
      <button className={Styles.Button} onClick={onClick}>
        <PlusSVG className={Styles.ButtonIcon} />
        <p>More</p>
      </button>
    </div>
  );
};

export default MoreButton;
