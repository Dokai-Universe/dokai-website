import { MockMainItems } from "@ts/mock";
import Link from "next/link";
import * as Styles from "./style.css";
import { toTitleCase } from "@utils/Text";
import MediaCard from "@components/ui/Media/MediaCard";

const getLayout = (idx: number) => {
  const isEvenColumn = idx % 4 >= 2;
  const row = idx % 2 === 0 ? "odd" : "even";
  const width =
    (row === "odd" && isEvenColumn) || (row === "even" && !isEvenColumn)
      ? "wide"
      : "narrow";

  return { row, width } as const;
};

const MainWorks = () => {
  return (
    <div className={Styles.WorksContainer}>
      {MockMainItems.map((item, idx) => {
        const { row, width } = getLayout(idx);

        return (
          <Link
            key={item.id}
            className={Styles.ItemContainer({ row, width })}
            href={item.url}
          >
            <MediaCard media={item.media} className={Styles.ItemMedia} />
            <div className={Styles.ItemTextContainer({ width })}>
              <p>{toTitleCase(item.type)}</p>

              <div className={Styles.ItemTextContent}>
                <p>{item.title}</p>
                <p className={Styles.ItemTextSummary}>{item.summary}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MainWorks;
