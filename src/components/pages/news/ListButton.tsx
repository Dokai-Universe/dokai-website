import * as Styles from "./style.css";
import { useRouter } from "nextjs-toploader/app";

const NewsListButton = () => {
  const router = useRouter();

  const handleListClick = () => {
    router.push("/news");
  };

  return (
    <div className={Styles.ListButtonContainer}>
      <button className={Styles.ListButton} onClick={handleListClick}>
        LIST
      </button>
    </div>
  );
};

export default NewsListButton;
