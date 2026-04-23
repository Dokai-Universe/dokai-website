"use client";

import { useEffect, useState } from "react";
import * as Styles from "./style.css";
import ModalLayout from "@components/modals/ModalLayout";

import { z } from "zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";
import CrossSVG from "@assets/icons/cross.svg";

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
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const aboutTeamItemSchema = z.object({
  role: z.string().trim().min(1, "Role is required"),
  names: z
    .array(z.string().trim().min(1, "Name is required"))
    .min(1, "At least one name is required"),
});

const aboutTeamListSchema = z.object({
  items: z.array(aboutTeamItemSchema).min(1, "At least one team is required"),
});

type FormValues = z.infer<typeof aboutTeamListSchema>;

const DEFAULT_TEAM = {
  role: "",
  names: [] as string[],
};

const SortableTeamItem = ({
  id,
  children,
}: {
  id: string;
  children: (args: {
    handleProps: Record<string, unknown>;
    isDragging: boolean;
  }) => React.ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 180,
      easing: "ease",
    },
  });

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
        },
        isDragging,
      })}
    </div>
  );
};

const SortableNameItem = ({
  id,
  children,
}: {
  id: string;
  children: (args: { isDragging: boolean }) => React.ReactNode;
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
  } = useSortable({
    id,
    animateLayoutChanges,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
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
        cursor: "grab",
      }}
    >
      {children({ isDragging })}
    </div>
  );
};

const EditAboutTeamListModal = ({
  initial,
  applyTeamList,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: { role: string; names: string[] }[];
  applyTeamList: (next: { role: string; names: string[] }[]) => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(aboutTeamListSchema),
    defaultValues: {
      items: initial?.length ? initial : [DEFAULT_TEAM],
    },
    mode: "onBlur",
  });

  const {
    control,
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    trigger,
  } = form;

  const teamsFA = useFieldArray({
    control,
    name: "items",
  });

  const items = useWatch({ control, name: "items" }) ?? [DEFAULT_TEAM];

  const [pendingNames, setPendingNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const nextItems = initial?.length
      ? initial.map((item) => ({
          role: item.role ?? "",
          names: item.names ?? [],
        }))
      : [DEFAULT_TEAM];

    reset({
      items: nextItems,
    });

    teamsFA.replace(nextItems);
    setPendingNames({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial, reset]);

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

    const oldIndex = teamsFA.fields.findIndex(
      (field) => field.id === active.id,
    );
    const newIndex = teamsFA.fields.findIndex((field) => field.id === over.id);

    if (oldIndex < 0 || newIndex < 0) return;

    teamsFA.move(oldIndex, newIndex);

    setPendingNames((prev) => {
      const entries = teamsFA.fields.map((field) => [
        field.id,
        prev[field.id] ?? "",
      ]);
      const next = [...entries];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      return Object.fromEntries(next);
    });
  };

  const handleNameDragEnd = (teamIdx: number, event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const names = items?.[teamIdx]?.names ?? [];

    const oldIndex = names.findIndex(
      (_, nameIdx) => `team-${teamIdx}-name-${nameIdx}` === active.id,
    );
    const newIndex = names.findIndex(
      (_, nameIdx) => `team-${teamIdx}-name-${nameIdx}` === over.id,
    );

    if (oldIndex < 0 || newIndex < 0) return;

    setValue(`items.${teamIdx}.names`, arrayMove(names, oldIndex, newIndex), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleAddTeam = () => {
    teamsFA.append(DEFAULT_TEAM);
  };

  const handleRemoveTeam = (idx: number) => {
    const targetId = teamsFA.fields[idx]?.id;

    if (teamsFA.fields.length <= 1) {
      teamsFA.replace([DEFAULT_TEAM]);
      setPendingNames({});
      return;
    }

    teamsFA.remove(idx);

    if (targetId) {
      setPendingNames((prev) => {
        const next = { ...prev };
        delete next[targetId];
        return next;
      });
    }
  };

  const handleRemoveName = (teamIdx: number, nameIdx: number) => {
    const current = items?.[teamIdx]?.names ?? [];
    const next = current.filter((_, i) => i !== nameIdx);

    setValue(`items.${teamIdx}.names`, next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleChangePendingName = (fieldId: string, value: string) => {
    setPendingNames((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const appendPendingName = (teamIdx: number, fieldId: string) => {
    const raw = pendingNames[fieldId] ?? "";
    const nextName = raw.trim();
    if (!nextName) return;

    const current = items?.[teamIdx]?.names ?? [];

    setValue(`items.${teamIdx}.names`, [...current, nextName], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setPendingNames((prev) => ({
      ...prev,
      [fieldId]: "",
    }));
  };

  const applyPendingNamesToForm = () => {
    teamsFA.fields.forEach((field, teamIdx) => {
      const pendingName = (pendingNames[field.id] ?? "").trim();
      if (!pendingName) return;

      const currentNames = getValues(`items.${teamIdx}.names`) ?? [];

      setValue(`items.${teamIdx}.names`, [...currentNames, pendingName], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      });
    });
  };

  const handleCancel = () => {
    requestCloseModal();
  };

  const handleApply = async () => {
    applyPendingNamesToForm();

    const isValid = await trigger();
    if (!isValid) return;

    const data = getValues();

    applyTeamList(
      data.items.map((item) => ({
        role: item.role.trim(),
        names: item.names.map((name) => name.trim()).filter(Boolean),
      })),
    );

    requestCloseModal();
  };

  return (
    <ModalLayout
      title="Team"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="32rem"
    >
      <div className={Styles.Content}>
        <div className={Styles.ValuesContainer}>
          <p className={Styles.ValuesTitle}>Team List</p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={teamsFA.fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className={Styles.MembersList}>
                {teamsFA.fields.map((field, teamIdx) => {
                  const names = items?.[teamIdx]?.names ?? [];
                  const pendingName = pendingNames[field.id] ?? "";

                  return (
                    <SortableTeamItem key={field.id} id={field.id}>
                      {({ handleProps }) => (
                        <div className={Styles.RoleContainer}>
                          <button
                            type="button"
                            className={Styles.MemberDragHandle}
                            {...handleProps}
                          >
                            ⋮⋮
                          </button>

                          <p className={Styles.ValuesTitle}>
                            Team {teamIdx + 1}
                          </p>

                          <div className={Styles.ValueRow}>
                            <label className={Styles.ValueLabel}>
                              <input
                                className={Styles.ValueInput}
                                placeholder="Role"
                                {...register(`items.${teamIdx}.role` as const)}
                              />
                              <RemoveButton
                                onClick={() => handleRemoveTeam(teamIdx)}
                                className={Styles.ValueRemoveButton}
                              />
                            </label>
                            <ErrorText
                              message={
                                errors.items?.[teamIdx]?.role?.message as string
                              }
                            />
                          </div>

                          <div className={Styles.ValuesContainer}>
                            <p className={Styles.ValuesTitle}>Names</p>

                            <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={(event) =>
                                handleNameDragEnd(teamIdx, event)
                              }
                            >
                              <SortableContext
                                items={names.map(
                                  (_, nameIdx) =>
                                    `team-${teamIdx}-name-${nameIdx}`,
                                )}
                                strategy={rectSortingStrategy}
                              >
                                <div className={Styles.NameList}>
                                  {names.map((name, nameIdx) => (
                                    <SortableNameItem
                                      key={`TEAM_${teamIdx}_NAME_${nameIdx}`}
                                      id={`team-${teamIdx}-name-${nameIdx}`}
                                    >
                                      {() => (
                                        <div className={Styles.NameItem}>
                                          <p className={Styles.NameText}>
                                            {name}
                                          </p>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleRemoveName(teamIdx, nameIdx)
                                            }
                                            className={Styles.NameRemoveButton}
                                          >
                                            <CrossSVG
                                              className={
                                                Styles.NameRemoveButtonIcon
                                              }
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </SortableNameItem>
                                  ))}
                                </div>
                              </SortableContext>
                            </DndContext>

                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                appendPendingName(teamIdx, field.id);
                              }}
                              className={Styles.MemberAddForm}
                            >
                              <input
                                type="text"
                                name="name"
                                value={pendingName}
                                onChange={(e) =>
                                  handleChangePendingName(
                                    field.id,
                                    e.target.value,
                                  )
                                }
                                className={Styles.MemberInput}
                              />
                              <AddButton
                                type="submit"
                                className={Styles.MemberAddButton}
                              />
                            </form>

                            <ErrorText
                              message={
                                (errors.items?.[teamIdx]?.names
                                  ?.message as string) ||
                                (errors.items?.[teamIdx]?.names?.root
                                  ?.message as string)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </SortableTeamItem>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>

          <AddButton onClick={handleAddTeam} />
          <ErrorText message={errors.items?.root?.message as string} />
        </div>
      </div>

      <div className={Styles.ButtonContainer}>
        <CancelButton onClick={handleCancel} isRight />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
};

export default EditAboutTeamListModal;
