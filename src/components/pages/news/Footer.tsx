import * as Styles from "./style.css";
import { News } from "@domain/news";

const NewsFooter = ({ news }: { news: News }) => {
  return (
    <div className={Styles.Footer}>
      <div className={Styles.FooterItem}>
        <p className={Styles.FooterItemTitle}>Project Manager</p>
        <p>{news.projectManager}</p>
      </div>
      <div className={Styles.FooterItem}>
        <p className={Styles.FooterItemTitle}>Contents No.</p>
        <p>{news.contentsNumero}</p>
      </div>
    </div>
  );
};

export default NewsFooter;
