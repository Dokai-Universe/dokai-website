import { MediaSource } from "./fetch";
import ImageCard from "@components/ui/ImageCard";
import * as Styles from "./style.css";

const WorkDetailKeyVisuals = ({
  keyVisuals,
}: {
  keyVisuals: MediaSource[];
}) => {
  return (
    <div className={Styles.KeyVisualsContainer}>
      <p className={Styles.KeyVisualsTitle}>Key visual</p>

      {keyVisuals.map((visual, i) => (
        <ImageCard
          key={i}
          src={visual.src}
          alt={visual.alt}
          type={visual.type}
          loop={visual.type === "LOOP" ? visual.loop : undefined}
          className={Styles.KeyVisualsMediaContainer}
        />
      ))}
    </div>
  );
};

export default WorkDetailKeyVisuals;
