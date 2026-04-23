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
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import * as Styles from "./style.css";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";

import SaveSVG from "@assets/icons/save.svg";
import CrossSVG from "@assets/icons/cross.svg";
import { worksMutations } from "@controllers/works/mutation";
import { useAppMutation } from "@controllers/common";
import { useModalStackStore } from "@stores/modalStackStore";

type Props = {
  categories?: string[];
};

const SortableCategoryItem = ({
  category,
  onDelete,
  onUpdate,
}: {
  category: string;
  onDelete: (category: string) => void;
  onUpdate: (prevCategory: string, nextCategory: string) => boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(category);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category,
    disabled: isEditing,
  });

  const handleCancel = () => {
    setDraftValue(category);
    setIsEditing(false);
  };

  const handleSave = () => {
    const success = onUpdate(category, draftValue);

    if (success) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setDraftValue(category);
  }, [category]);

  return (
    <div
      ref={setNodeRef}
      className={Styles.CategoryItem}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <button
        type="button"
        className={Styles.CategoryDragHandle}
        disabled={isEditing}
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>

      {isEditing ? (
        <label className={Styles.CategoryEditLabel}>
          <input
            className={Styles.CategoryEditInput}
            value={draftValue}
            autoFocus
            onChange={(e) => setDraftValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />

          <button
            type="button"
            onClick={handleSave}
            className={Styles.CategoryItemButton}
          >
            <SaveSVG className={Styles.CategoryItemButtonIcon} />
          </button>
        </label>
      ) : (
        <span
          className={Styles.CategoryName}
          onClick={() => setIsEditing(true)}
        >
          {category}
        </span>
      )}

      {isEditing ? (
        <>
          <button
            type="button"
            onClick={handleCancel}
            className={Styles.CategoryItemButton}
          >
            <CrossSVG className={Styles.CategoryItemButtonIcon} />
          </button>
        </>
      ) : (
        <>
          <EditButton
            onClick={() => setIsEditing(true)}
            className={Styles.CategoryItemButton}
          />
          <RemoveButton
            onClick={() => onDelete(category)}
            className={Styles.CategoryItemButton}
          />
        </>
      )}
    </div>
  );
};

const CategorySection = ({ categories = [] }: Props) => {
  const { mutateAsync: categoriesUpdate } = useAppMutation(
    worksMutations.categoriesUpdate(),
  );
  const [items, setItems] = useState<string[]>(categories);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const isDirty = items.join("|") !== categories.join("|");

  const handleAddCategory = () => {
    const nextCategory = inputValue.trim();
    if (!nextCategory) return;

    const alreadyExists = items.some(
      (item) => item.toLowerCase() === nextCategory.toLowerCase(),
    );

    if (alreadyExists) {
      alert("이미 존재하는 카테고리입니다.");
      return;
    }

    setItems((prev) => [...prev, nextCategory]);
    setInputValue("");
  };

  const handleUpdateCategory = (prevCategory: string, nextCategory: string) => {
    const trimmed = nextCategory.trim();

    if (!trimmed) {
      alert("카테고리를 비워둘 수 없습니다.");
      return false;
    }

    const alreadyExists = items.some(
      (item) =>
        item !== prevCategory && item.toLowerCase() === trimmed.toLowerCase(),
    );

    if (alreadyExists) {
      alert("이미 존재하는 카테고리입니다.");
      return false;
    }

    setItems((prev) =>
      prev.map((item) => (item === prevCategory ? trimmed : item)),
    );

    return true;
  };

  const handleDeleteCategory = (category: string) => {
    setItems((prev) => prev.filter((item) => item !== category));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => item === active.id);
      const newIndex = prev.findIndex((item) => item === over.id);

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const { push } = useModalStackStore();

  const handleSave = () => {
    push("API", {
      title: "Update Categories",
      onFetch: async () => categoriesUpdate(items),
    });
  };

  return (
    <section className={Styles.Contents}>
      <div className={Styles.ContentsHeader}>
        <p className={Styles.ContentsTitle}> Category</p>

        {isDirty && (
          <div className={Styles.ContentsActions}>
            <button type="button" onClick={() => setItems(categories)}>
              Reset
            </button>

            <button type="button" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>

      <label className={Styles.CategoryAddForm}>
        <input
          className={Styles.CategoryInput}
          value={inputValue}
          placeholder="Category Name"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCategory();
            }
          }}
        />

        <AddButton
          className={Styles.CategoryAddButton}
          onClick={handleAddCategory}
        />
      </label>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className={Styles.CategoryList}>
            {items.map((category) => (
              <SortableCategoryItem
                key={category}
                category={category}
                onDelete={handleDeleteCategory}
                onUpdate={handleUpdateCategory}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
};

export default CategorySection;
