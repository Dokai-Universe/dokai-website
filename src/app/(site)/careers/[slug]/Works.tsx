import { Work } from "./fetch";
import * as Styles from "./style.css";
import { getReadableTextColor } from "@utils/Color";
import MediaCard from "@components/ui/Media/MediaCard";

const CareerDetailWorks = ({ works }: { works: Work[] }) => {
  return (
    <div className={Styles.WorksContainer}>
      <p className={Styles.WorksTitle}>work</p>
      <div className={Styles.WorksGrid}>
        {works.map((work, idx) => (
          <button key={`WORKS_${idx}`} className={Styles.WorksItem}>
            <MediaCard media={work.media} className={Styles.WorksItemImage} />
            <div
              className={Styles.WorksItemOverlay}
              style={
                {
                  "--bg-color": work.bgColor,
                  "--fg-color": getReadableTextColor(work.bgColor),
                } as React.CSSProperties
              }
            >
              <p>{work.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CareerDetailWorks;
