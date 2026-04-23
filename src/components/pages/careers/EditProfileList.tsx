"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ProfileListItem } from "@domain/careers";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import * as Styles from "./style.css";
import { useAppMutation } from "@controllers/common";
import { careersMutations } from "@controllers/careers/mutation";
import { useModalStackStore } from "@stores/modalStackStore";

type OrderChangePayload = {
  profile: ProfileListItem;
  from: number;
  to: number;
  items: ProfileListItem[];
};

type Props = {
  profiles: ProfileListItem[];
  onChangeOrder?: (payload: OrderChangePayload) => void;
};

const SortableProfileItem = ({ profile }: { profile: ProfileListItem }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: profile.email,
  });

  return (
    <div
      ref={setNodeRef}
      className={Styles.ProfileListItem}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0.6 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <MediaHoverOverlay
        media={profile.avatar}
        className={`${Styles.ProfileListItemImage} ${Styles.Draggable}`}
      >
        <div
          className={Styles.ProfileListItemOverlay}
          style={{
            cursor: "grab",
          }}
        >
          <p>{profile.role}</p>
          <p>{profile.name}</p>
        </div>
      </MediaHoverOverlay>
    </div>
  );
};

const CareersPageEditProfileList = ({ profiles, onChangeOrder }: Props) => {
  const [items, setItems] = useState(profiles);
  const { mutateAsync: mutateUpdateProfileOrder } = useAppMutation(
    careersMutations.updateProfileOrder(),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    setItems(profiles);
  }, [profiles]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.email === active.id);
      const newIndex = prev.findIndex((item) => item.email === over.id);

      const movedProfile = prev[oldIndex];

      const nextItems = arrayMove(prev, oldIndex, newIndex);

      onChangeOrder?.({
        profile: movedProfile,
        from: oldIndex,
        to: newIndex,
        items: nextItems,
      });

      return nextItems;
    });
  };

  const isDirty = items.some(
    (item, index) => item.email !== profiles[index]?.email,
  );

  const { push } = useModalStackStore();

  const handleSave = () => {
    push("API", {
      title: "Update Profile Order",
      onFetch: async () =>
        mutateUpdateProfileOrder({
          emails: items.map((profile) => profile.email),
        }),
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((profile) => profile.email)}
        strategy={rectSortingStrategy}
      >
        <div className={Styles.ProfileListContainer}>
          <div className={Styles.ProfileListSaveButtonContainer}>
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={Styles.ProfileListSaveButton}
            >
              Save
            </button>
          </div>
          {items.map((profile, idx) => (
            <SortableProfileItem
              key={`CAREERS_${profile.email}_${idx}`}
              profile={profile}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default CareersPageEditProfileList;
