import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { MediaSource } from "@domain/media";
import * as Styles from "./style.css";
import TrashSVG from "@assets/icons/trash.svg";
import PlusSVG from "@assets/icons/plus.svg";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type MediaItem = { id: number; media: MediaSource };

const SortableMediaItem = ({
  item,
  index,
  selectedIndex,
  setSelectedIndex,
  deleteMedia,
}: {
  item: MediaItem;
  index: number;
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  deleteMedia: (id: number) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={Styles.MediaContainer}
      onClick={() => setSelectedIndex(index)}
      data-selected={selectedIndex === index}
      {...attributes}
      {...listeners}
    >
      <MediaCard
        media={item.media}
        className={Styles.Media}
        blockInteractive
        useAlternative
      />
      <button
        type="button"
        className={Styles.DeleteButton}
        onClick={(e) => {
          e.stopPropagation();
          deleteMedia(item.id);
        }}
      >
        <TrashSVG className={Styles.DeleteButtonIcon} />
      </button>
    </div>
  );
};
const SideBar = ({
  medias,
  deleteMedia,
  selectedIndex,
  setSelectedIndex,
  reorderMedias,
}: {
  medias: MediaItem[];
  deleteMedia: (id: number) => void;
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  reorderMedias: (next: MediaItem[]) => void;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = medias.findIndex((item) => item.id === active.id);
    const newIndex = medias.findIndex((item) => item.id === over.id);

    if (oldIndex < 0 || newIndex < 0) return;

    const next = arrayMove(medias, oldIndex, newIndex);
    reorderMedias(next);

    if (selectedIndex === oldIndex) {
      setSelectedIndex(newIndex);
    } else if (
      selectedIndex !== null &&
      selectedIndex > oldIndex &&
      selectedIndex <= newIndex
    ) {
      setSelectedIndex(selectedIndex - 1);
    } else if (
      selectedIndex !== null &&
      selectedIndex < oldIndex &&
      selectedIndex >= newIndex
    ) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className={Styles.Scroll}>
        <SortableContext
          items={medias.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {medias.map((item, i) => (
            <SortableMediaItem
              key={`${item.id}-${i}`}
              item={item}
              index={i}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              deleteMedia={deleteMedia}
            />
          ))}
        </SortableContext>

        <label className={Styles.AddButonContainer}>
          <button
            type="button"
            onClick={() => setSelectedIndex(-1)}
            className={Styles.AddButton}
          >
            <PlusSVG className={Styles.AddButtonIcon} />
          </button>
        </label>
      </div>
    </DndContext>
  );
};

export default SideBar;
