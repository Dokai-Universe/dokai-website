"use client";

import Link from "next/link";
import * as Styles from "./style.css";
import { toTitleCase } from "@utils/Text";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { useAppQuery } from "@controllers/common";
import { worksQueriesClient } from "@controllers/works/query.client";
import LockSVG from "@assets/icons/lock.svg";

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
  const { data: works, isLoading } = useAppQuery(
    worksQueriesClient.mainWorks(),
  );

  if (isLoading)
    return (
      <div className={Styles.WorksContainer}>
        {Array.from({ length: 8 }).map((_, idx) => {
          const { row, width } = getLayout(idx);
          return (
            <div key={idx} className={Styles.ItemContainer({ row, width })}>
              <MediaCard className={Styles.ItemMedia} />
              <div className={Styles.ItemTextContainer({ width })}>
                <br />
                <div className={Styles.ItemTextContent}>
                  <br />
                  <p className={Styles.ItemTextSummary}>
                    <br />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );

  return (
    <div className={Styles.WorksContainer}>
      {works?.items.map((item, idx) => {
        const { row, width } = getLayout(idx);

        return (
          <Link
            key={item.slug}
            className={Styles.ItemContainer({ row, width })}
            href={`/work/${item.slug}`}
          >
            <MediaCard
              media={item.data.thumbnail!}
              className={Styles.ItemMedia}
              blockInteractive
              priority
            />
            {!item.isPublished && <LockSVG className={Styles.PrivateIcon} />}
            <div className={Styles.ItemTextContainer({ width })}>
              <p>{toTitleCase(item.data.category)}</p>

              <div className={Styles.ItemTextContent}>
                <p>{item.data.title}</p>
                <p className={Styles.ItemTextSummary}>{item.data.summary}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MainWorks;
