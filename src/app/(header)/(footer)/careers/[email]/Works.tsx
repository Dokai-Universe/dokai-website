import { Work } from "./fetch";
import * as Styles from "./style.css";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import useCareerWorkModal from "@components/modal/CareerWork/useCareerWork";

const CareerDetailWorks = ({ works }: { works: Work[] }) => {
  const { openModal } = useCareerWorkModal();

  return (
    <div className={Styles.WorksContainer}>
      <p className={Styles.WorksTitle}>work</p>
      <div className={Styles.WorksGrid}>
        {works.map((work, idx) => (
          <button
            key={`WORKS_${idx}`}
            className={Styles.WorksItem}
            onClick={() => openModal(work.title)}
          >
            <MediaHoverOverlay
              media={work.media}
              className={Styles.WorksItemImage}
            >
              <div className={Styles.WorksItemOverlay}>
                <p>{work.title}</p>
              </div>
            </MediaHoverOverlay>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CareerDetailWorks;
