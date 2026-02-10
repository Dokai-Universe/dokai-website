import * as Styles from "./style.css";
import CrossSVG from "@assets/icons/cross.svg";

const SearchHeader = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className={Styles.Header}>
      <p className={Styles.HeaderTitle}>Search</p>
      <button
        type="button"
        className={Styles.HeaderCloseButton}
        onClick={handleClose}
      >
        <CrossSVG className={Styles.HeaderCloseIcon} />
      </button>
    </div>
  );
};

export default SearchHeader;
