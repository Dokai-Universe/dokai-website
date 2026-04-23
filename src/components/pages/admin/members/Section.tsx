"use client";

import { useEffect, useMemo } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Styles from "./style.css";
import { adminMembersSchema, type AdminMembersInput } from "./schema";
import { AdminMemberItem } from "./types";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";
import PinSVG from "@assets/icons/pin.svg";
import PinCrossSVG from "@assets/icons/pin_cross.svg";
import { useAppMutation, useAppQuery } from "@controllers/common";
import { careersQueriesClient } from "@controllers/careers/query.client";
import { careersMutations } from "@controllers/careers/mutation";
import { useModalStackStore } from "@stores/modalStackStore";

const SortableFixedMemberItem = ({
  id,
  children,
}: {
  id: string;
  children: (args: { handleProps: Record<string, unknown> }) => React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
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
          transform ? { ...transform, scaleX: 1, scaleY: 1 } : null,
        ),
        transition,
      }}
    >
      {children({
        handleProps: {
          ...attributes,
          ...listeners,
        },
      })}
    </div>
  );
};

const makeTempId = () =>
  `member_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const normalizeFixedOrder = (members: AdminMemberItem[]) => {
  const fixed = members.filter((member) => member.isFixed);
  const notFixed = members.filter((member) => !member.isFixed);

  const normalizedFixed = fixed.map((member, index) => ({
    ...member,
    fixedOrder: index,
  }));

  const normalizedNotFixed = notFixed.map((member) => ({
    ...member,
    fixedOrder: null,
  }));

  return [...normalizedFixed, ...normalizedNotFixed];
};

const reorderFixedMembers = (
  members: AdminMemberItem[],
  activeId: string,
  overId: string,
) => {
  const fixed = members.filter((member) => member.isFixed);
  const notFixed = members.filter((member) => !member.isFixed);

  const oldIndex = fixed.findIndex((member) => member.memberId === activeId);
  const newIndex = fixed.findIndex((member) => member.memberId === overId);

  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return members;

  const nextFixed = [...fixed];
  const [moved] = nextFixed.splice(oldIndex, 1);
  nextFixed.splice(newIndex, 0, moved);

  return normalizeFixedOrder([...nextFixed, ...notFixed]);
};

const MembersSection = () => {
  const { data: memberListData } = useAppQuery(
    careersQueriesClient.memberList(),
  );
  const { mutateAsync: updateMemberList } = useAppMutation(
    careersMutations.updateMemberList(),
  );

  const form = useForm<AdminMembersInput>({
    resolver: zodResolver(adminMembersSchema),
    mode: "onBlur",
    defaultValues: {
      members: [],
    },
  });

  const {
    control,
    register,
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { isDirty, errors, isSubmitting },
  } = form;

  const { append } = useFieldArray({
    control,
    name: "members",
  });

  const members = useWatch({ control, name: "members" }) ?? [];

  // TODO: 실제 query로 교체
  useEffect(() => {
    const tmp = memberListData?.items?.map((item) => {
      return {
        memberId: makeTempId(),
        email: item.email,
        role: item.role,
        isFixed: item.fixedOrder !== null,
        fixedOrder: item.fixedOrder,
      };
    });

    reset({
      members: normalizeFixedOrder(tmp ?? []),
    });
  }, [reset, memberListData]);

  const fixedMembers = useMemo(
    () =>
      members
        .filter((member) => member.isFixed)
        .sort((a, b) => b.fixedOrder! - a.fixedOrder!),
    [members],
  );

  const nonFixedMembers = useMemo(
    () => members.filter((member) => !member.isFixed),
    [members],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const handleAddMember = () => {
    append({
      memberId: makeTempId(),
      email: "",
      role: "staff",
      isFixed: false,
      fixedOrder: null,
    });
  };

  const handleToggleFixed = (targetId: string, checked: boolean) => {
    const next = (getValues("members") ?? []).map((member) =>
      member.memberId === targetId
        ? {
            ...member,
            isFixed: checked,
            fixedOrder: checked ? fixedMembers.length : null,
          }
        : member,
    );

    setValue("members", normalizeFixedOrder(next as AdminMemberItem[]), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleFixedDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const next = reorderFixedMembers(
      (getValues("members") ?? []) as AdminMemberItem[],
      String(active.id),
      String(over.id),
    );

    setValue("members", next, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const { push } = useModalStackStore();

  const handleSave = handleSubmit(async (data) => {
    const nextMembers = normalizeFixedOrder(
      data.members.map((member) => ({
        ...member,
        email: member.email.trim().toLowerCase(),
      })) as AdminMemberItem[],
    );

    const membersForUpdate = nextMembers.map((member) => ({
      email: member.email,
      fixedOrder: member.fixedOrder,
      role: member.role,
    }));

    push("API", {
      title: "Update Members",
      onFetch: async () => updateMemberList({ items: membersForUpdate }),
    });

    reset({ members: nextMembers });
  });

  return (
    <FormProvider {...form}>
      <div className={Styles.Section}>
        <div className={Styles.SectionHeader}>
          <div>
            <p className={Styles.SectionTitle}>Members</p>
            <p className={Styles.SectionSub}>
              Add, delete, update roles, and reorder fixed members.
            </p>
          </div>

          <div className={Styles.SectionActions}>
            <button
              type="button"
              className={Styles.SecondaryButton}
              onClick={handleAddMember}
            >
              Add member
            </button>
            <button
              type="button"
              className={Styles.PrimaryButton}
              onClick={handleSave}
              disabled={!isDirty || isSubmitting}
            >
              Save
            </button>
          </div>
        </div>

        <div className={Styles.MemberBlock}>
          <p className={Styles.BlockTitle}>Fixed Members</p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleFixedDragEnd}
          >
            <SortableContext
              items={fixedMembers.map((member) => member.memberId)}
              strategy={verticalListSortingStrategy}
            >
              <div className={Styles.MemberList}>
                {fixedMembers.map((member) => {
                  const index = members.findIndex(
                    (m) => m.memberId === member.memberId,
                  );
                  if (index < 0) return null;

                  return (
                    <SortableFixedMemberItem
                      key={member.memberId}
                      id={member.memberId}
                    >
                      {({ handleProps }) => (
                        <div className={Styles.MemberRow}>
                          <button
                            type="button"
                            className={Styles.DragHandle}
                            {...handleProps}
                          >
                            ⋮⋮
                          </button>

                          <input
                            className={Styles.MemberInput}
                            placeholder="Email"
                            {...register(`members.${index}.email` as const)}
                          />

                          <select
                            className={Styles.MemberSelect}
                            {...register(`members.${index}.role` as const)}
                          >
                            <option value="staff">staff</option>
                            <option value="admin">admin</option>
                          </select>

                          <label className={Styles.FixedToggle}>
                            <input
                              type="checkbox"
                              checked={!!member.isFixed}
                              onChange={(e) =>
                                handleToggleFixed(
                                  member.memberId,
                                  e.target.checked,
                                )
                              }
                              style={{ display: "none" }}
                            />
                            <PinCrossSVG className={Styles.FixedIcon} />
                          </label>

                          <RemoveButton
                            onClick={() => {
                              reset({
                                members: getValues("members")?.filter(
                                  (m) => m.memberId !== member.memberId,
                                ),
                              });
                            }}
                            className={Styles.DeleteButton}
                          />
                        </div>
                      )}
                    </SortableFixedMemberItem>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className={Styles.MemberBlock}>
          <p className={Styles.BlockTitle}>Normal Members</p>

          <div className={Styles.MemberList}>
            {nonFixedMembers.map((member) => {
              const index = members.findIndex(
                (m) => m.memberId === member.memberId,
              );
              if (index < 0) return null;

              return (
                <div key={member.memberId} className={Styles.MemberRow}>
                  <div className={Styles.DragHandlePlaceholder} />

                  <input
                    className={Styles.MemberInput}
                    placeholder="Email"
                    {...register(`members.${index}.email` as const)}
                  />

                  <select
                    className={Styles.MemberSelect}
                    {...register(`members.${index}.role` as const)}
                  >
                    <option value="staff">staff</option>
                    <option value="admin">admin</option>
                  </select>

                  <label className={Styles.FixedToggle}>
                    <input
                      type="checkbox"
                      checked={!!member.isFixed}
                      onChange={(e) =>
                        handleToggleFixed(member.memberId, e.target.checked)
                      }
                      style={{ display: "none" }}
                    />
                    <PinSVG className={Styles.FixedIcon} />
                  </label>

                  <RemoveButton
                    onClick={() => {
                      reset({
                        members: getValues("members")?.filter(
                          (m) => m.memberId !== member.memberId,
                        ),
                      });
                    }}
                    className={Styles.DeleteButton}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {!!errors.members?.message && (
          <p className={Styles.ErrorText}>{errors.members.message}</p>
        )}
      </div>
    </FormProvider>
  );
};

export default MembersSection;
