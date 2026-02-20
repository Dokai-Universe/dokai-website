import PlusSVG from "@assets/icons/plus.svg";
import * as Styles from "./style.css";

const MoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={Styles.MoreButton} onClick={onClick}>
      <p>More</p>
      <PlusSVG className={Styles.MoreButtonIcon} />
    </button>
  );
};

export default MoreButton;
