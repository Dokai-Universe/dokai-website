"use client";

import ModalLayout from "@components/modals/ModalLayout";
import * as Styles from "./style.css";
import z from "zod";
import { useEffect, useMemo } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectContent } from "@domain/careers";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";

const schema = z
  .object({
    name: z.string().min(1, "Title is required"),
    activeType: z.enum(["TEXT", "LIST"]),
    textValue: z.string(),
    listValue: z.array(z.object({ value: z.string() })), // ✅ 객체 배열
  })
  .superRefine((v, ctx) => {
    if (v.activeType === "TEXT") {
      if (!v.textValue.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["textValue"],
          message: "Text is required",
        });
      }
    } else {
      const cleaned = v.listValue.map((x) => x.value.trim()).filter(Boolean);
      if (cleaned.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["listValue"],
          message: "Add at least one item",
        });
      }
      v.listValue.forEach((item, i) => {
        if (!item.value.trim()) {
          ctx.addIssue({
            code: "custom",
            path: ["listValue", i, "value"],
            message: "Item is required",
          });
        }
      });
    }
  });

type FormInput = z.input<typeof schema>;

function toDefaults(initial?: ProjectContent | null): FormInput {
  const base: FormInput = {
    name: "",
    activeType: "TEXT",
    textValue: "",
    listValue: [{ value: "" }],
  };

  if (!initial) return base;

  if (initial.type === "TEXT") {
    return {
      name: initial.name ?? "",
      activeType: "TEXT",
      textValue: initial.value ?? "",
      listValue: [{ value: "" }], // 유지용
    };
  }

  return {
    name: initial.name ?? "",
    activeType: "LIST",
    textValue: "",
    listValue: initial.value?.length
      ? initial.value.map((s) => ({ value: s }))
      : [{ value: "" }],
  };
}

function TextEditor() {
  const form = useFormContext<FormInput>();

  return (
    <TitleRichText
      form={form}
      name="textValue"
      className={Styles.TextContainer}
      placeholder="Write something..."
    />
  );
}

function ListEditor() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormInput>();

  // ✅ 제네릭 명시 (핵심)
  const listArray = useFieldArray<FormInput, "listValue">({
    control,
    name: "listValue",
  });

  return (
    <div className={Styles.ListContainer}>
      {listArray.fields.map((f, i) => (
        <div key={f.id} className={Styles.ListItem}>
          <label className={Styles.ListItemLabel}>
            <input
              type="text"
              {...register(`listValue.${i}.value`)}
              className={Styles.ListItemInput}
            />
            <RemoveButton
              onClick={() => listArray.remove(i)}
              className={Styles.ListItemRemoveButton}
            />
          </label>
          <ErrorText
            message={errors.listValue?.[i]?.value?.message as string}
          />
        </div>
      ))}
      <AddButton onClick={() => listArray.append({ value: "" })} />

      <ErrorText message={errors.listValue?.message as string} />
    </div>
  );
}

const EditProjectContentModal = ({
  initial,
  applyContent,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: ProjectContent;
  applyContent?: (content: ProjectContent) => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const defaultValues = useMemo(() => toDefaults(initial), [initial]);

  const form = useForm<FormInput>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues,
    shouldUnregister: false, // ✅ 탭 바꿔도 값 유지
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const activeType = useWatch({ control: form.control, name: "activeType" });

  const handleCancel = () => {
    requestCloseModal();
  };

  const handleApply = form.handleSubmit((v) => {
    const name = v.name.trim();

    if (v.activeType === "TEXT") {
      applyContent?.({
        type: "TEXT",
        name,
        value: v.textValue,
      } as ProjectContent);
    } else {
      const cleaned = v.listValue.map((x) => x.value.trim()).filter(Boolean);
      applyContent?.({ type: "LIST", name, value: cleaned } as ProjectContent);
    }

    requestCloseModal();
  });

  return (
    <ModalLayout
      title={initial ? "Edit Content" : "Add Content"}
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="24rem"
    >
      <FormProvider {...form}>
        <TitleInput
          form={form}
          name="name"
          title="Title"
          placeholder="Enter title"
          className={Styles.TitleContainer}
        />

        <div className={Styles.TabList}>
          <label className={Styles.TabItem}>
            <p className={Styles.TabItemLabel}>Text</p>
            <input
              type="radio"
              name="type"
              value="TEXT"
              checked={activeType === "TEXT"}
              onChange={() => form.setValue("activeType", "TEXT")}
              className={Styles.TabItemInput}
            />
          </label>

          <label className={Styles.TabItem}>
            <p className={Styles.TabItemLabel}>List</p>
            <input
              type="radio"
              name="type"
              value="LIST"
              checked={activeType === "LIST"}
              onChange={() => form.setValue("activeType", "LIST")}
              className={Styles.TabItemInput}
            />
          </label>

          <span className={Styles.TabIndicator} />
        </div>

        <div className={Styles.Content}>
          {activeType === "TEXT" ? <TextEditor /> : <ListEditor />}
        </div>

        <div className={Styles.ButtonContainer}>
          <button
            type="button"
            onClick={handleCancel}
            className={Styles.CancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className={Styles.ApplyButton}
          >
            Apply
          </button>
        </div>
      </FormProvider>
    </ModalLayout>
  );
};

export default EditProjectContentModal;
