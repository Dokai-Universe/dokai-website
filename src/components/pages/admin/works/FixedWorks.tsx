"use client";

import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { worksQueriesClient } from "@controllers/works/query.client";
import * as Styles from "./style.css";
import {
  useAppInfiniteQuery,
  useAppMutation,
  useAppQuery,
} from "@controllers/common";
import MoreButton from "@components/ui/Button/More/MoreButton";
import { useState as useReactState } from "react";
import SearchSVG from "@assets/icons/search.svg";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { worksMutations } from "@controllers/works/mutation";
import { useModalStackStore } from "@stores/modalStackStore";
import { MediaSource } from "@domain/media";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";

type FixedWorkItem = {
  id: string;
  data: {
    title: string;
    thumbnail: MediaSource | null;
  };
};

const getOrderKey = (items: FixedWorkItem[]) =>
  items.map((item) => item.id).join("|");

const SortableFixedWorkItem = ({
  item,
  onDelete,
}: {
  item: FixedWorkItem;
  onDelete: (id: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={Styles.WorkListItem}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <button
        type="button"
        className={Styles.FixedWorkItemDragHandle}
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>

      <MediaCard
        media={item.data.thumbnail}
        className={Styles.WorkListItemMedia}
      />

      <p className={Styles.WorkListItemTitle}>{item.data.title}</p>

      <RemoveButton
        onClick={() => onDelete(item.id)}
        className={Styles.FixedWorkItemRemoveButton}
      />
    </div>
  );
};

const FixedWorksSection = () => {
  const [inputValue, setInputValue] = useReactState("");
  const [searchQuery, setSearchQuery] = useReactState("");

  const [fixedItems, setFixedItems] = useState<FixedWorkItem[]>([]);

  const {
    data: works,
    fetchNextPage,
    hasNextPage,
  } = useAppInfiniteQuery(worksQueriesClient.adminWorkSearch(searchQuery));

  const { data: adminWorks } = useAppQuery(
    worksQueriesClient.adminFixedWorks(),
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFixedItems(adminWorks?.items ?? []);
  }, [adminWorks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const isDirty =
    getOrderKey(fixedItems) !== getOrderKey(adminWorks?.items ?? []);

  const handleAddFixedWork = (work: FixedWorkItem) => {
    const alreadyExists = fixedItems.some((item) => item.id === work.id);

    if (alreadyExists) {
      alert("이미 Fixed Works에 추가된 작업물입니다.");
      return;
    }

    setFixedItems((prev) => [...prev, work]);
  };

  const handleDeleteFixedWork = (id: string) => {
    setFixedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setFixedItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const { mutateAsync: adminFixedWorksUpdate } = useAppMutation(
    worksMutations.adminFixedWorksUpdate(),
  );

  const { push } = useModalStackStore();

  const handleSave = () => {
    push("API", {
      title: "Update Fixed Works",
      onFetch: async () =>
        adminFixedWorksUpdate(fixedItems.map((item) => item.id)),
    });
  };

  return (
    <section className={Styles.Contents}>
      <div className={Styles.ContentsHeader}>
        <p className={Styles.ContentsTitle}>Fixed Works</p>

        {isDirty && (
          <div className={Styles.ContentsActions}>
            <button
              type="button"
              onClick={() => setFixedItems(adminWorks?.items ?? [])}
            >
              Reset
            </button>

            <button type="button" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fixedItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={Styles.WorkList}>
            {fixedItems.map((item, idx) => (
              <SortableFixedWorkItem
                key={`FIXED-${item.id}-${idx}`}
                item={item}
                onDelete={handleDeleteFixedWork}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <span className={Styles.Divider} />

      <label className={Styles.WorkSearch}>
        <input
          type="text"
          placeholder="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchQuery(inputValue.trim());
            }
          }}
          className={Styles.WorkSearchInput}
        />

        <button
          type="button"
          onClick={() => setSearchQuery(inputValue.trim())}
          className={Styles.WorkSearchButton}
        >
          <SearchSVG className={Styles.WorkSearchIcon} />
        </button>
      </label>

      <div className={Styles.WorkList}>
        {works?.pages
          .flatMap((page) => page.items)
          .map((item, idx) => {
            const isAlreadyFixed = fixedItems.some(
              (fixedItem) => fixedItem.id === item.id,
            );

            return (
              <button
                key={`SEARCH-${item.id}-${idx}`}
                type="button"
                className={Styles.WorkListItem}
                data-fixed={isAlreadyFixed}
                onClick={(e) => {
                  e.stopPropagation();

                  if (isAlreadyFixed) handleDeleteFixedWork(item.id);
                  else handleAddFixedWork(item);
                }}
              >
                <MediaCard
                  media={item.data.thumbnail}
                  className={Styles.WorkListItemMedia}
                  blockInteractive
                />

                <p className={Styles.WorkListItemTitle}>{item.data.title}</p>
              </button>
            );
          })}

        {hasNextPage && <MoreButton onClick={() => fetchNextPage()} />}
      </div>
    </section>
  );
};

export default FixedWorksSection;
