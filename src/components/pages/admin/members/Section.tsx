"use client";

import { useEffect, useMemo, useRef } from "react";
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
import { AdminMemberItem } from "./types";
import { AdminMembersInput, adminMembersSchema } from "./schema";
import {
  createTempMemberId,
  diffMembers,
  normalizeMembers,
  reorderFixedMembers,
} from "./util";
import { useAppMutation, useAppQuery } from "@controllers/common";
import { careersQueriesClient } from "@controllers/careers/query.client";
import { careersMutations } from "@controllers/careers/mutation";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";
import PinSVG from "@assets/icons/pin.svg";
import PinCrossSVG from "@assets/icons/pin_cross.svg";
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

const MembersSection = () => {
  const { data: memberList } = useAppQuery(careersQueriesClient.memberList());
  const initialItems = useMemo(() => memberList?.items ?? [], [memberList]);
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
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = form;

  const initialMembersRef = useRef<AdminMemberItem[]>([]);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "members",
  });

  const members = useWatch({ control, name: "members" }) ?? [];

  useEffect(() => {
    const nextMembers = normalizeMembers(
      initialItems.map((item) => ({
        memberId: createTempMemberId(),
        email: item.email,
        role: item.role,
        isFixed: item.fixedOrder !== null,
        fixedOrder: item.fixedOrder,
      })),
    );

    initialMembersRef.current = nextMembers;
    reset({ members: nextMembers });
    replace(nextMembers);
  }, [initialItems, reset, replace]);

  const fixedMembers = useMemo(
    () => members.filter((member) => member.isFixed),
    [members],
  );

  const normalMembers = useMemo(
    () => members.filter((member) => !member.isFixed),
    [members],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const getFieldIndexByMemberId = (memberId: string) =>
    fields.findIndex((field) => field.memberId === memberId);

  const handleAddMember = () => {
    append({
      memberId: createTempMemberId(),
      email: "",
      role: "staff",
      isFixed: false,
      fixedOrder: null,
    });
  };

  const handleDeleteMember = (memberId: string) => {
    const index = getFieldIndexByMemberId(memberId);
    if (index >= 0) remove(index);
  };

  const handleToggleFixed = (memberId: string, checked: boolean) => {
    const next = normalizeMembers(
      (getValues("members") ?? []).map((member) =>
        member.memberId === memberId
          ? {
              ...member,
              isFixed: checked,
              fixedOrder: checked ? 0 : null,
            }
          : member,
      ) as AdminMemberItem[],
    );

    reset(
      { members: next },
      {
        keepDirty: true,
        keepTouched: true,
      },
    );
    replace(next);
  };

  const handleFixedDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const next = reorderFixedMembers(
      (getValues("members") ?? []) as AdminMemberItem[],
      String(active.id),
      String(over.id),
    );

    reset(
      { members: next },
      {
        keepDirty: true,
        keepTouched: true,
      },
    );
    replace(next);
  };

  const { push } = useModalStackStore();

  const onSubmitMembers = async (formValues: AdminMembersInput) => {
    const normalizedCurrent = normalizeMembers(
      formValues.members.map((member) => ({
        memberId: member.memberId,
        email: member.email,
        role: member.role ?? null,
        isFixed: member.isFixed ?? false,
        fixedOrder: member.fixedOrder ?? null,
      })),
    );

    const initialMembers = initialMembersRef.current;
    const payload = diffMembers(initialMembers, normalizedCurrent);

    console.log(payload);

    if (
      payload.created.length === 0 &&
      payload.updated.length === 0 &&
      payload.deleted.length === 0
    ) {
      return;
    }

    push("API", {
      title: "Update Members",
      onFetch: async () => updateMemberList(payload),
    });

    initialMembersRef.current = normalizedCurrent;
    reset({ members: normalizedCurrent });
    replace(normalizedCurrent);
  };

  const handleSave = async () => {
    await handleSubmit(onSubmitMembers)();
  };

  return (
    <FormProvider {...form}>
      <div className={Styles.Section}>
        <div className={Styles.SectionHeader}>
          <div>
            <p className={Styles.SectionTitle}>Members</p>
            <p className={Styles.SectionSub}>
              Add, remove, update role, and reorder fixed members.
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
              // disabled={!isDirty || isSubmitting}
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
                  const index = getFieldIndexByMemberId(member.memberId);
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
                            <option value="">none</option>
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
                            className={Styles.DeleteButton}
                            onClick={() => handleDeleteMember(member.memberId)}
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
          <p className={Styles.BlockTitle}>Members</p>

          <div className={Styles.MemberList}>
            {normalMembers.map((member) => {
              const index = getFieldIndexByMemberId(member.memberId);
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
                    <option value="">none</option>
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
                    className={Styles.DeleteButton}
                    onClick={() => handleDeleteMember(member.memberId)}
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
