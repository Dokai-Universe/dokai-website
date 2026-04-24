import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import * as Styles from "./style.css";
import { MediaSource } from "@domain/media";

const WorkKeyVisuals = ({ keyVisuals }: { keyVisuals: MediaSource[] }) => {
  return (
    <div className={Styles.KeyVisualsContainer}>
      <p className={Styles.KeyVisualsTitle}>Key visual</p>
      <div className={Styles.KeyVisualsMediaContainer}>
        {keyVisuals.map((media, idx) => (
          <MediaCard
            key={`WORK_KEY_VISUAL_${idx}`}
            media={media}
            className={Styles.KeyVisualsMedia}
            priority
          />
        ))}
      </div>
    </div>
  );
};

export default WorkKeyVisuals;
