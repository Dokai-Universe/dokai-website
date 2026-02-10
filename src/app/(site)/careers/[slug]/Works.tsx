import ImageCard from "@components/ui/ImageCard";
import { Work } from "./fetch";
import * as Styles from "./style.css";
import { getReadableTextColor } from "@utils/Color";

const CareerDetailWorks = ({ works }: { works: Work[] }) => {
  return (
    <div className={Styles.WorksContainer}>
      <p className={Styles.WorksTitle}>work</p>
      <div className={Styles.WorksGrid}>
        {works.map((work, idx) => (
          <button key={`WORKS_${idx}`} className={Styles.WorksItem}>
            <ImageCard
              src={work.media.src}
              alt={work.media.alt}
              type={work.media.type}
              loop={work.media.type === "LOOP" ? work.media.loop : undefined}
              className={Styles.WorksItemImage}
            />
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
