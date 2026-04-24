"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { NewsInput } from "./news";
import * as Styles from "./style.css";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";
import EditMediaSingle from "@components/ui/Edit/EditMediaSingle/EditMediaSingle";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import { MediaSource } from "@domain/media";
import TrashSVG from "@assets/icons/trash.svg";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  AnimateLayoutChanges,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove } from "@dnd-kit/sortable";
import { useModalStackStore } from "@stores/modalStackStore";

export const reorderChapters = (
  chapters: NewsInput["chapters"],
  activeId: string,
  overId: string,
) => {
  const oldIndex = chapters.findIndex((_, i) => `chapter-${i}` === activeId);
  const newIndex = chapters.findIndex((_, i) => `chapter-${i}` === overId);

  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return chapters;
  return arrayMove(chapters, oldIndex, newIndex);
};

export const reorderChapterContents = (
  chapters: NewsInput["chapters"],
  chapterIndex: number,
  activeId: string,
  overId: string,
) => {
  const targetChapter = chapters[chapterIndex];
  if (!targetChapter) return chapters;

  const oldIndex = targetChapter.contents.findIndex(
    (_, i) => `chapter-${chapterIndex}-content-${i}` === activeId,
  );
  const newIndex = targetChapter.contents.findIndex(
    (_, i) => `chapter-${chapterIndex}-content-${i}` === overId,
  );

  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return chapters;

  return chapters.map((chapter, i) =>
    i === chapterIndex
      ? {
          ...chapter,
          contents: arrayMove(chapter.contents, oldIndex, newIndex),
        }
      : chapter,
  );
};

export const SortableItem = ({
  id,
  children,
  handleClassName,
}: {
  id: string;
  children: (args: {
    handleProps: Record<string, unknown>;
    isDragging: boolean;
  }) => React.ReactNode;
  handleClassName?: string;
}) => {
  const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting }) => {
    if (isSorting) return true;
    return false;
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, animateLayoutChanges });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(
          transform
            ? {
                ...transform,
                scaleX: 1,
                scaleY: 1,
              }
            : null,
        ),
        transition,
        opacity: isDragging ? 0.7 : 1,
      }}
    >
      {children({
        handleProps: {
          ...attributes,
          ...listeners,
          className: handleClassName ?? Styles.DragHandle,
        },
        isDragging,
      })}
    </div>
  );
};

const NewsEditChapter = () => {
  const form = useFormContext<NewsInput>();
  const { getValues, control, setValue } = form;

  const watched = useWatch({ control });
  const chapters = (watched.chapters ?? []) as NewsInput["chapters"];

  const {
    formState: { errors },
  } = form;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const { push } = useModalStackStore();

  const handleAddChapter = () => {
    const nextContents = [...chapters, { title: "", contents: [] }];
    setValue("chapters", nextContents, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleAddContent = (chapterIndex: number) => {
    const currentContents = chapters?.[chapterIndex]?.contents ?? [];

    push("ADD_NEWS_CONTENT", {
      addNewsContent: (content) => {
        const nextContents = [...currentContents, content];
        setValue(`chapters.${chapterIndex}.contents`, nextContents, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      },
    });
  };

  const handleApplyMedia = (
    media: MediaSource,
    chapterIndex: number,
    contentIndex: number,
  ) => {
    setValue(`chapters.${chapterIndex}.contents.${contentIndex}.media`, media, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleDelete = (index: number) => {
    setValue(
      "chapters",
      getValues().chapters?.filter((_, i) => i !== index) ?? [],
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
  };

  const handleDeleteContent = (index: number, contentIndex: number) => {
    setValue(
      "chapters",
      (getValues().chapters ?? []).map((chapter, i) =>
        i === index
          ? {
              ...chapter,
              contents: chapter.contents?.filter((_, j) => j !== contentIndex),
            }
          : chapter,
      ),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
  };

  const handleChapterDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const next = reorderChapters(chapters, String(active.id), String(over.id));

    setValue("chapters", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleContentDragEnd = (chapterIndex: number, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const next = reorderChapterContents(
      chapters,
      chapterIndex,
      String(active.id),
      String(over.id),
    );

    setValue("chapters", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div className={Styles.BodyContent}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleChapterDragEnd}
      >
        <SortableContext
          items={chapters.map((_, index) => `chapter-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          {chapters.map((chapter, index) => (
            <SortableItem key={`EDIT_CHAPTER_${index}`} id={`chapter-${index}`}>
              {({ handleProps }) => (
                <div
                  className={Styles.BodyChapter}
                  style={{ position: "relative" }}
                >
                  <button
                    type="button"
                    {...handleProps}
                    className={Styles.DragHandle}
                  >
                    ⋮⋮
                  </button>

                  <TitleInput
                    placeholder="Chapter Title"
                    title="Title"
                    form={form}
                    name={`chapters.${index}.title`}
                    className={Styles.BodyChapterTitle}
                  />

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => handleContentDragEnd(index, event)}
                  >
                    <div className={Styles.BodyChapterContent}>
                      <SortableContext
                        items={
                          chapter.contents?.map(
                            (_, contentIndex) =>
                              `chapter-${index}-content-${contentIndex}`,
                          ) ?? []
                        }
                        strategy={verticalListSortingStrategy}
                      >
                        {chapter.contents?.map((content, contentIndex) => (
                          <SortableItem
                            key={`EDIT_CHAPTER_CONTENT_${index}_${contentIndex}`}
                            id={`chapter-${index}-content-${contentIndex}`}
                          >
                            {({ handleProps }) => (
                              <div
                                style={{ position: "relative" }}
                                className={Styles.BodyChapterContent}
                              >
                                <button
                                  type="button"
                                  {...handleProps}
                                  className={Styles.DragHandle}
                                >
                                  ⋮⋮
                                </button>

                                {content.type === "TEXT" && (
                                  <TitleRichText
                                    title="Text"
                                    form={form}
                                    name={`chapters.${index}.contents.${contentIndex}.text`}
                                    className={Styles.BodyChapterContentText}
                                    placeholder="Write text here..."
                                  />
                                )}

                                {content.type === "MEDIA" && (
                                  <div
                                    className={
                                      Styles.BodyChapterContentMediaContainer
                                    }
                                  >
                                    <EditMediaSingle
                                      media={content.media as MediaSource}
                                      applyMedia={(media) =>
                                        handleApplyMedia(
                                          media,
                                          index,
                                          contentIndex,
                                        )
                                      }
                                      className={Styles.BodyChapterContentMedia}
                                      cardClassName={
                                        Styles.EditBodyChapterContentMedia
                                      }
                                      blockedTypes={["VIDEO"]}
                                    />
                                    <ErrorText
                                      message={
                                        errors.chapters?.[index]?.contents?.[
                                          contentIndex
                                        ]?.message
                                      }
                                    />
                                    <p
                                      className={
                                        Styles.BodyChapterContentMediaCaption
                                      }
                                    >
                                      {(content.media as MediaSource)?.alt}
                                    </p>
                                  </div>
                                )}

                                <button
                                  type="button"
                                  className={Styles.EditContentButton}
                                  onClick={() =>
                                    handleDeleteContent(index, contentIndex)
                                  }
                                >
                                  <TrashSVG
                                    className={Styles.EditContentButtonIcon}
                                  />
                                </button>
                              </div>
                            )}
                          </SortableItem>
                        ))}
                      </SortableContext>
                    </div>
                  </DndContext>

                  <button
                    type="button"
                    className={Styles.EditContentButton}
                    onClick={() => handleDelete(index)}
                  >
                    <TrashSVG className={Styles.EditChapterButtonIcon} />
                  </button>
                  <AddButton onClick={() => handleAddContent(index)} />
                </div>
              )}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <AddButton onClick={handleAddChapter} />
    </div>
  );
};

export default NewsEditChapter;
