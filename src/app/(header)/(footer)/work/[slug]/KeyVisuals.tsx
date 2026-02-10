import * as Styles from "./style.css";
import MediaCard from "@components/ui/Media/MediaCard";
import { MediaSource } from "@components/ui/Media/types";

const WorkDetailKeyVisuals = ({
  keyVisuals,
}: {
  keyVisuals: MediaSource[];
}) => {
  return (
    <div className={Styles.KeyVisualsContainer}>
      <p className={Styles.KeyVisualsTitle}>Key visual</p>

      {keyVisuals.map((visual, i) => (
        <MediaCard
          key={i}
          media={visual}
          className={Styles.KeyVisualsMediaContainer}
        />
      ))}
    </div>
  );
};

export default WorkDetailKeyVisuals;
