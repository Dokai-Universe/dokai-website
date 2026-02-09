"use client";

import categories, { Category } from "@ts/categories";
import { toTitleCase } from "@utils/Text";
import ImageCaptionOverlay from "@components/ui/ImageCaptionOverlay/ImageCaptionOverlay";
import Link from "next/link";
import * as Styles from "./style.css";
import { useEffect, useMemo, useState } from "react";
import { WorkItem } from "@ts/work_item";
import MoreButton from "@components/ui/MoreButton/MoreButton";

const WorkPageClient = ({ workItems }: { workItems: WorkItem[] }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("EVERYTHING");

  const categoryGroups = useMemo(
    () =>
      Array.from({ length: Math.ceil(categories.length / 4) }, (_, i) =>
        categories.slice(i * 4, i * 4 + 4),
      ),
    [],
  );

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={Styles.Container}>
      <div className={Styles.CategoryContainer}>
        {categoryGroups.map((group, idx) => (
          <div
            key={`WORK_CATEGORY_GROUP_${idx}`}
            className={Styles.CategoryGroup}
          >
            {group.map((category) => (
              <label
                key={`WORK_CATEGORY_${category}`}
                className={Styles.Category}
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  className={Styles.CategoryInput}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
                <p>{toTitleCase(category)}</p>
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className={Styles.WorkItemsContainer}>
        {workItems.map((item) => (
          <Link
            key={`WORK_ITEM_${item.id}`}
            className={Styles.WorkItem}
            href={item.href}
          >
            <ImageCaptionOverlay
              className={Styles.WorkItemImageContainer}
              src={item.imageSrc}
              alt={item.title}
              caption={item.summary}
              bg={item.bgColor}
            />
            <p className={Styles.WorkItemText}>{item.title}</p>
          </Link>
        ))}
      </div>
      <MoreButton />
    </div>
  );
};

export default WorkPageClient;
