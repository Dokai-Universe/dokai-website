import ImageCard from "@components/ui/ImageCard";
import { ExtraInfo, MediaSource } from "./fetch";
import * as Styles from "./style.css";

const WorkDetailHeader = ({
  title,
  date,
  productionType,
  extraInfo,
  mainImage,
}: {
  title: string;
  date: Date;
  productionType: string;
  extraInfo: ExtraInfo[];
  mainImage: MediaSource;
}) => {
  return (
    <div className={Styles.HeaderGrid}>
      <p className={Styles.HeaderTitle}>{title}</p>

      <div className={Styles.HeaderMetaColumn}>
        <div className={Styles.HeaderPrimaryMeta}>
          <p>{date.getFullYear()}</p>
          <p>{productionType}</p>
          <span className={Styles.HeaderDivider} />
        </div>

        <div className={Styles.HeaderExtraInfoList}>
          {extraInfo.map((info) => (
            <div key={info.title} className={Styles.HeaderExtraInfoItem}>
              <p className={Styles.HeaderExtraInfoTitle}>{info.title}</p>
              <p className={Styles.HeaderExtraInfoContent}>{info.content}</p>
            </div>
          ))}
        </div>
      </div>

      <ImageCard
        src={mainImage.src}
        alt={mainImage.alt}
        type={mainImage.type}
        className={Styles.HeaderMediaContainer}
      />
    </div>
  );
};

export default WorkDetailHeader;
