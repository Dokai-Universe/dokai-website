import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { Work } from "@domain/work";
import * as Styles from "./style.css";

const WorkHeader = ({ work }: { work: Work }) => {
  return (
    <div className={Styles.HeaderContainer}>
      <p className={Styles.HeaderTitle}>{work.title}</p>
      <div
        className={Styles.HeaderBody({
          isShortForm: work.isShortForm,
        })}
      >
        <div className={Styles.HeaderInfo}>
          <p>{work.productionDate?.text}</p>
          <p>{work.productionType}</p>
        </div>
        <div
          className={Styles.HeaderMetaList({
            isShortForm: work.isShortForm,
          })}
        >
          {work.meta.map((e, idx) => (
            <div key={`WORK_META_${idx}`} className={Styles.HeaderMetaItem}>
              <p className={Styles.HeaderMetaName}>{e.name}</p>
              <div>
                {e.values.map((v, vIdx) => (
                  <p
                    key={`WORK_META_${idx}_${vIdx}`}
                    className={Styles.HeaderMetaValue}
                  >
                    {v}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={Styles.HeaderMediaContainer({
          isShortForm: work.isShortForm,
        })}
      >
        <MediaCard
          media={work.mainMedia}
          className={Styles.HeaderMedia({
            isShortForm: work.isShortForm,
          })}
          priority
        />
      </div>
    </div>
  );
};

export default WorkHeader;
