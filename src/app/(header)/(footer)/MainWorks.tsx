"use client";

import Link from "next/link";
import { useMemo } from "react";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { useAppQuery } from "@controllers/common";
import { worksQueriesClient } from "@controllers/works/query.client";
import { toTitleCase } from "@utils/Text";
import * as Styles from "./style.css";
import { WorkListItem } from "@domain/work";

type LayoutWidth = "wide" | "middle" | "narrow";
type LayoutSide = "left" | "right";

type LayoutItem<T> = {
  item: T;
  gridColumn: string;
  gridRow: string;
  width: LayoutWidth;
  isShortForm: boolean;
};

type LayoutSource = {
  data: {
    isShortForm: boolean;
  };
};

const GRID_COLUMN_MAP: Record<LayoutWidth, Record<LayoutSide, string>> = {
  wide: {
    left: "1 / span 5",
    right: "4 / span 5",
  },
  narrow: {
    left: "1 / span 3",
    right: "6 / span 3",
  },
  middle: {
    left: "1 / span 4",
    right: "5 / span 4",
  },
};

const getGridColumn = (width: LayoutWidth, side: LayoutSide) =>
  GRID_COLUMN_MAP[width][side];

const getLayout = <T extends LayoutSource>(items: T[]): LayoutItem<T>[] => {
  const result: LayoutItem<T>[] = [];

  let i = 0;
  let row = 1;
  let line = 0;

  const push = (
    item: T | undefined,
    row: number,
    span: number,
    width: LayoutWidth,
    side: LayoutSide,
  ) => {
    if (!item) return;

    result.push({
      item,
      width,
      isShortForm: item.data.isShortForm,
      gridColumn: getGridColumn(width, side),
      gridRow: `${row} / span ${span}`,
    });
  };

  while (i < items.length) {
    const a = items[i];
    const b = items[i + 1];
    const c = items[i + 2];

    const aShort = !!a?.data.isShortForm;
    const bShort = !!b?.data.isShortForm;
    const cShort = !!c?.data.isShortForm;

    if (aShort && bShort) {
      push(a, row, 1, "middle", "left");
      push(b, row, 1, "middle", "right");
      i += 2;
      row += 1;
      line += 1;
      continue;
    }

    const bigLeft = line % 2 === 1;

    if (bigLeft) {
      push(a, row, aShort ? 2 : 1, "wide", "left");
      push(b, row, 1, "narrow", "right");
      if (aShort) push(c, row + 1, 1, "narrow", "right");

      i += aShort ? 3 : 2;
      row += aShort ? 2 : 1;
    } else {
      if (cShort) {
        push(a, row, 1, "narrow", "left");
        push(b, row + 1, 1, "narrow", "left");
        push(c, row, 2, "wide", "right");
        i += 3;
        row += 2;
      } else {
        push(a, row, 1, "narrow", "left");
        push(b, row, 1, "wide", "right");
        i += 2;
        row += 1;
      }
    }

    line += 1;
  }

  return result;
};

const EMPTY_ITEMS = getLayout([
  { data: { isShortForm: false } },
  { data: { isShortForm: false } },
  { data: { isShortForm: false } },
  { data: { isShortForm: false } },
  { data: { isShortForm: true } },
  { data: { isShortForm: false } },
  { data: { isShortForm: false } },
  { data: { isShortForm: true } },
  { data: { isShortForm: false } },
  { data: { isShortForm: true } },
  { data: { isShortForm: true } },
  { data: { isShortForm: true } },
  { data: { isShortForm: false } },
  { data: { isShortForm: false } },
  { data: { isShortForm: true } },
  { data: { isShortForm: true } },
]);

const MainWorks = () => {
  const { data: works, isLoading } = useAppQuery(
    worksQueriesClient.mainWorks(),
  );

  const worksItems = useMemo(
    () => getLayout(works?.items ?? []),
    [works?.items],
  );

  const renderItem = (
    layoutItem: (typeof worksItems)[number] | (typeof EMPTY_ITEMS)[number],
    key: string | number,
    data?: WorkListItem,
  ) => {
    const body = (
      <>
        <MediaCard
          media={data?.thumbnail}
          className={Styles.ItemMedia({
            isShortForm: layoutItem.isShortForm,
          })}
          blockInteractive={!!data}
          priority={!!data}
        />
        <div className={Styles.ItemTextContainer({ width: layoutItem.width })}>
          {data ? (
            <>
              <p>{data.category}</p>
              <div className={Styles.ItemTextContent}>
                <p>{data.title}</p>
                <p className={Styles.ItemTextSummary}>{data.summary}</p>
              </div>
            </>
          ) : (
            <>
              <br />
              <div className={Styles.ItemTextContent}>
                <br />
                <p className={Styles.ItemTextSummary}>
                  <br />
                </p>
              </div>
            </>
          )}
        </div>
      </>
    );

    const style = {
      gridColumn: layoutItem.gridColumn,
      gridRow: layoutItem.gridRow,
    };

    if (!data) {
      return (
        <div key={key} className={Styles.ItemContainer} style={style}>
          {body}
        </div>
      );
    }

    return (
      <Link
        key={key}
        href={`/work/${encodeURIComponent(key)}`}
        className={Styles.ItemContainer}
        style={style}
      >
        {body}
      </Link>
    );
  };

  if (isLoading) {
    return (
      <div className={Styles.WorksContainer}>
        {EMPTY_ITEMS.map((item, idx) => renderItem(item, idx))}
      </div>
    );
  }

  return (
    <div className={Styles.WorksContainer}>
      {worksItems.map((item) =>
        renderItem(item, item.item.slug, item.item.data),
      )}
    </div>
  );
};

export default MainWorks;
