import * as Styles from "./style.css";
import { NewsCategories } from "@ts/categories";
import ViewSVG from "@assets/icons/view.svg";
import { News } from "@domain/news";

const NewsHeader = ({ news, viewCount }: { news: News; viewCount: number }) => {
  return (
    <div className={Styles.Header}>
      <div className={Styles.HeaderCategory}>
        {NewsCategories.map((category) => (
          <p
            key={category}
            data-active={category === news.category}
            className={Styles.HeaderCategoryItem}
          >
            {category}
          </p>
        ))}
      </div>
      <div className={Styles.HeaderInfo}>
        <p className={Styles.HeaderInfoDate}>
          {new Date(news.publishedAt).toLocaleDateString()}
        </p>
        <div className={Styles.HeaderInfoView}>
          <ViewSVG className={Styles.HeaderInfoViewIcon} />
          <p>{viewCount}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsHeader;
