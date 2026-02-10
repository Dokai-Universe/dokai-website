import PlusSVG from "@assets/icons/plus.svg";
import * as Styles from "./style.css";

const MoreButton = () => {
  return (
    <button className={Styles.MoreButton}>
      <p>More</p>
      <PlusSVG className={Styles.MoreButtonIcon} />
    </button>
  );
};

export default MoreButton;
