import * as Styles from "./style.css";

const CancelButton = ({
  onClick,
  isRight,
  text,
}: {
  onClick: () => void;
  isRight?: boolean;
  text?: string;
}) => {
  return (
    <button
      type="button"
      className={Styles.Button({ isRight })}
      onClick={onClick}
    >
      {text ?? "Cancel"}
    </button>
  );
};

export default CancelButton;
