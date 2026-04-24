import * as Styles from "./style.css";

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" className={Styles.Button} onClick={onClick}>
      Delete
    </button>
  );
};

export default DeleteButton;
