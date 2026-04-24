"use client";

import { useEffect } from "react";
import ModalLayout from "@components/modals/ModalLayout";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import * as Styles from "./style.css";
import { WorkMetaField } from "@domain/work";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
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
  AnimateLayoutChanges,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const editMetaListSchema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Name is required"),
        values: z
          .array(z.string().trim().min(1, "Value is required"))
          .min(1, "At least one value is required"),
      }),
    )
    .min(1, "At least one meta is required"),
});

type FormValues = z.infer<typeof editMetaListSchema>;

const SortableMetaItem = ({
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

const EditMetaInfoListModal = ({
  initial,
  applyMetaList,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: WorkMetaField[];
  applyMetaList: (next: WorkMetaField[]) => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(editMetaListSchema),
    defaultValues: {
      items: initial?.length
        ? initial
        : [
            { name: "CLIENT", values: [""] },
            { name: "AGENCY", values: [""] },
          ],
    },
    mode: "onBlur",
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = useWatch({ control, name: "items" }) ?? [];

  useEffect(() => {
    reset({
      items: initial?.length
        ? initial
        : [
            { name: "CLIENT", values: [""] },
            { name: "AGENCY", values: [""] },
          ],
    });
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

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);

    if (oldIndex < 0 || newIndex < 0) return;
    move(oldIndex, newIndex);
  };

  const handleAddMeta = () => {
    append({
      name: "",
      values: [""],
    });
  };

  const handleAddValue = (metaIndex: number) => {
    const currentValues = getValues(`items.${metaIndex}.values`) ?? [];
    setValue(`items.${metaIndex}.values`, [...currentValues, ""], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleRemoveValue = (metaIndex: number, valueIndex: number) => {
    const currentValues = getValues(`items.${metaIndex}.values`) ?? [];
    const nextValues = currentValues.filter((_, i) => i !== valueIndex);

    setValue(
      `items.${metaIndex}.values`,
      nextValues.length ? nextValues : [""],
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );
  };

  const handleApply = handleSubmit((data) => {
    applyMetaList(
      data.items.map((item) => ({
        name: item.name.trim(),
        values: item.values.map((value) => value.trim()).filter(Boolean),
      })),
    );
    requestCloseModal();
  });

  return (
    <ModalLayout
      title="Edit Meta"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="40rem"
    >
      <div className={Styles.Content}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((field) => field.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className={Styles.MetaList}>
              {fields.map((field, index) => {
                const values = watchedItems[index]?.values ?? [""];

                return (
                  <SortableMetaItem key={field.id} id={field.id}>
                    {({ handleProps }) => (
                      <div className={Styles.MetaCard}>
                        <button
                          type="button"
                          className={Styles.MetaDragHandle}
                          {...handleProps}
                        >
                          ⋮⋮
                        </button>

                        <div className={Styles.MetaCardBody}>
                          <TitleInput
                            form={form}
                            name={`items.${index}.name`}
                            placeholder="Name"
                            title="Name"
                          />

                          <div className={Styles.ValuesContainer}>
                            <p className={Styles.ValuesTitle}>Values</p>

                            <div className={Styles.ValuesList}>
                              {values.map((_, valueIndex) => (
                                <div
                                  key={`META_${index}_VALUE_${valueIndex}`}
                                  className={Styles.ValueRow}
                                >
                                  <label className={Styles.ValueLabel}>
                                    <input
                                      className={Styles.ValueInput}
                                      placeholder={`Value ${valueIndex + 1}`}
                                      {...register(
                                        `items.${index}.values.${valueIndex}` as const,
                                      )}
                                    />
                                    <RemoveButton
                                      onClick={() =>
                                        handleRemoveValue(index, valueIndex)
                                      }
                                      className={Styles.ValueRemoveButton}
                                    />
                                  </label>
                                  <ErrorText
                                    message={
                                      errors.items?.[index]?.values?.[
                                        valueIndex
                                      ]?.message as string
                                    }
                                  />
                                </div>
                              ))}
                            </div>

                            <AddButton
                              onClick={() => handleAddValue(index)}
                              className={Styles.AddValueButton}
                            />
                            <ErrorText
                              message={
                                errors.items?.[index]?.values?.message as string
                              }
                            />
                          </div>
                        </div>

                        <RemoveButton
                          onClick={() => remove(index)}
                          className={Styles.MetaRemoveButton}
                        />
                      </div>
                    )}
                  </SortableMetaItem>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>

        <div className={Styles.MetaAddButtonContainer}>
          <AddButton onClick={handleAddMeta} />
          <ErrorText message={errors.items?.message as string} />
        </div>
      </div>

      <div className={Styles.ButtonContainer}>
        <CancelButton onClick={requestCloseModal} isRight />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
};

export default EditMetaInfoListModal;
