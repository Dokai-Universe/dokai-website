import { useEffect, useState } from "react";
import * as Styles from "./style.css";
import ModalLayout from "@components/modals/ModalLayout";

import { z } from "zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import DeleteButton from "@components/ui/Button/Delete/DeleteButton";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";
import { creditSchema } from "@components/pages/work/work";
import { WorkCredit } from "@domain/work";
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

type FormValues = z.infer<typeof creditSchema>;

const DEFAULT_MEMBER = { role: "", names: [] as string[] };

const SortableMemberItem = ({
  id,
  children,
}: {
  id: string;
  children: (args: {
    handleProps: Record<string, unknown>;
    isDragging: boolean;
  }) => React.ReactNode;
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
      style={{
        transform: CSS.Transform.toString(
          transform
            ? {
                ...transform,
                x: 0,
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

const EditCreditModal = ({
  initial,
  applyCredit,
  deleteCredit,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: WorkCredit;
  applyCredit: (next: WorkCredit) => void;
  deleteCredit?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(creditSchema),
    defaultValues: {
      team: "",
      members: [DEFAULT_MEMBER],
    },
    mode: "onBlur",
  });

  const {
    control,
    register,
    reset,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = form;

  const membersFA = useFieldArray({
    control,
    name: "members",
  });

  const members = useWatch({ control, name: "members" }) ?? [DEFAULT_MEMBER];

  const [pendingNames, setPendingNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const nextMembers = initial?.members?.length
      ? initial.members.map((m) => ({
          role: m.role ?? "",
          names: m.names ?? [],
        }))
      : [DEFAULT_MEMBER];

    reset({
      team: initial?.team ?? "",
      members: nextMembers,
    });

    membersFA.replace(nextMembers);
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

    const oldIndex = membersFA.fields.findIndex(
      (field) => field.id === active.id,
    );
    const newIndex = membersFA.fields.findIndex(
      (field) => field.id === over.id,
    );

    if (oldIndex < 0 || newIndex < 0) return;

    membersFA.move(oldIndex, newIndex);

    setPendingNames((prev) => {
      const entries = membersFA.fields.map((field) => [
        field.id,
        prev[field.id] ?? "",
      ]);
      const next = [...entries];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      return Object.fromEntries(next);
    });
  };

  const handleNameDragEnd = (memberIdx: number, event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const names = members?.[memberIdx]?.names ?? [];

    const oldIndex = names.findIndex(
      (_, nameIdx) => `member-${memberIdx}-name-${nameIdx}` === active.id,
    );
    const newIndex = names.findIndex(
      (_, nameIdx) => `member-${memberIdx}-name-${nameIdx}` === over.id,
    );

    if (oldIndex < 0 || newIndex < 0) return;

    setValue(
      `members.${memberIdx}.names`,
      arrayMove(names, oldIndex, newIndex),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
  };

  const addMember = () => {
    membersFA.append(DEFAULT_MEMBER);
  };

  const removeMember = (idx: number) => {
    const targetId = membersFA.fields[idx]?.id;

    if (membersFA.fields.length <= 1) {
      membersFA.replace([DEFAULT_MEMBER]);
      setPendingNames({});
      return;
    }

    membersFA.remove(idx);

    if (targetId) {
      setPendingNames((prev) => {
        const next = { ...prev };
        delete next[targetId];
        return next;
      });
    }
  };

  const removeName = (memberIdx: number, nameIdx: number) => {
    const current = members?.[memberIdx]?.names ?? [];
    const next = current.filter((_, i) => i !== nameIdx);

    setValue(`members.${memberIdx}.names`, next, {
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

  const appendPendingName = (memberIdx: number, fieldId: string) => {
    const raw = pendingNames[fieldId] ?? "";
    const nextName = raw.trim();
    if (!nextName) return;

    const current = members?.[memberIdx]?.names ?? [];

    setValue(`members.${memberIdx}.names`, [...current, nextName], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setPendingNames((prev) => ({
      ...prev,
      [fieldId]: "",
    }));
  };

  const handleCancel = () => {
    requestCloseModal();
  };

  const applyPendingNamesToForm = () => {
    membersFA.fields.forEach((field, memberIdx) => {
      const pendingName = (pendingNames[field.id] ?? "").trim();
      if (!pendingName) return;

      const currentNames = getValues(`members.${memberIdx}.names`) ?? [];

      setValue(`members.${memberIdx}.names`, [...currentNames, pendingName], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: false,
      });
    });
  };

  const handleApply = async () => {
    applyPendingNamesToForm();

    const isValid = await trigger();
    if (!isValid) return;

    const data = getValues();

    applyCredit({
      team: data.team.trim(),
      members: data.members.map((member, memberIdx) => ({
        role: member.role.trim(),
        names: member.names.map((n) => n.trim()).filter(Boolean),
      })),
    });

    requestCloseModal();
  };

  const handleDelete = () => {
    deleteCredit?.();
    requestCloseModal();
  };

  return (
    <ModalLayout
      title="Credit"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="32rem"
    >
      <div className={Styles.Content}>
        <TitleInput
          form={form}
          name={"team"}
          placeholder={"Team"}
          title="Team"
        />

        <div className={Styles.ValuesContainer}>
          <p className={Styles.ValuesTitle}>Members</p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={membersFA.fields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className={Styles.MembersList}>
                {membersFA.fields.map((field, memberIdx) => {
                  const names = members?.[memberIdx]?.names ?? [];
                  const pendingName = pendingNames[field.id] ?? "";

                  return (
                    <SortableMemberItem key={field.id} id={field.id}>
                      {({ handleProps }) => (
                        <div className={Styles.RoleContainer}>
                          <button
                            type="button"
                            className={Styles.MemberDragHandle}
                            {...handleProps}
                          >
                            ⋮⋮
                          </button>

                          <RemoveButton
                            onClick={() => removeMember(memberIdx)}
                            className={Styles.ValueRemoveButton}
                          />

                          <p className={Styles.ValuesTitle}>
                            Role {memberIdx + 1}
                          </p>

                          <div className={Styles.ValueRow}>
                            <label className={Styles.ValueLabel}>
                              <input
                                className={Styles.ValueInput}
                                placeholder="Role"
                                {...register(
                                  `members.${memberIdx}.role` as const,
                                )}
                              />
                            </label>
                            <ErrorText
                              message={
                                errors.members?.[memberIdx]?.role
                                  ?.message as string
                              }
                            />
                          </div>

                          <div className={Styles.ValuesContainer}>
                            <p className={Styles.ValuesTitle}>Names</p>

                            <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={(event) =>
                                handleNameDragEnd(memberIdx, event)
                              }
                            >
                              <SortableContext
                                items={names.map(
                                  (_, nameIdx) =>
                                    `member-${memberIdx}-name-${nameIdx}`,
                                )}
                                strategy={rectSortingStrategy}
                              >
                                <div className={Styles.NameList}>
                                  {names.map((name, nameIdx) => (
                                    <SortableNameItem
                                      key={`MEMBER_${memberIdx}_NAME_${nameIdx}`}
                                      id={`member-${memberIdx}-name-${nameIdx}`}
                                    >
                                      {() => (
                                        <div className={Styles.NameItem}>
                                          <p className={Styles.NameText}>
                                            {name}
                                          </p>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              removeName(memberIdx, nameIdx);
                                            }}
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
                                appendPendingName(memberIdx, field.id);
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
                                (errors.members?.[memberIdx]?.names?.message ||
                                  errors.members?.[memberIdx]?.names?.root
                                    ?.message) as string
                              }
                            />
                          </div>
                        </div>
                      )}
                    </SortableMemberItem>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>

          <AddButton onClick={addMember} />
          <ErrorText message={errors.members?.root?.message} />
        </div>
      </div>

      <div className={Styles.ButtonContainer}>
        {deleteCredit && <DeleteButton onClick={handleDelete} />}
        <CancelButton onClick={handleCancel} isRight />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
};

export default EditCreditModal;
