import LockSVG from "@assets/icons/lock.svg";
import * as Styles from "./style.css";

const PrivateMark = ({
  isPrivate = false,
  className,
}: {
  isPrivate?: boolean;
  className?: string;
}) => {
  if (!isPrivate) return null;
  return (
    <div className={`${Styles.Container} ${className}`}>
      <LockSVG className={Styles.Icon} />
      <p className={Styles.Text}>This content is private.</p>
    </div>
  );
};

export default PrivateMark;
