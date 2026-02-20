"use client";

import { MockMainItems } from "@ts/mock";
import Link from "next/link";
import * as Styles from "./style.css";
import { toTitleCase } from "@utils/Text";
import MediaCard from "@components/ui/Media/MediaCard";
import { useWorksInfiniteQuery } from "@controllers/work/query";

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
  const { data: works } = useWorksInfiniteQuery({
    mode: "main",
    category: "EVERYTHING",
  });

  return (
    <div className={Styles.WorksContainer}>
      {works?.pages
        .flatMap((page) => page.items)
        .map((item, idx) => {
          const { row, width } = getLayout(idx);

          return (
            <Link
              key={item.slug}
              className={Styles.ItemContainer({ row, width })}
              href={`/work/${item.slug}`}
            >
              <MediaCard media={item.thumbnail!} className={Styles.ItemMedia} />
              <div className={Styles.ItemTextContainer({ width })}>
                <p>{toTitleCase(item.category)}</p>

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
