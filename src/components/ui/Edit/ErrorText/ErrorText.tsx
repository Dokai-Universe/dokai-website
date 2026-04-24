import * as Styles from "./style.css";

const ErrorText = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className={Styles.Error}>{message}</p>;
};

export default ErrorText;
