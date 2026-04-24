import { useEffect, useMemo } from "react";
import * as Styles from "./style.css";
import type { ContactLink } from "@domain/careers";
import ModalLayout from "@components/modals/ModalLayout";
import ContactIcon from "@components/pages/careers/ContactIcon";

import { z } from "zod";
import { useForm } from "react-hook-form";
import type { ContactType } from "@components/pages/careers/career";
import { zodResolver } from "@hookform/resolvers/zod";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import DeleteButton from "@components/ui/Button/Delete/DeleteButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";

type ContactMeta = {
  type: ContactType;
  title?: string;
  prefix: string;
  valuePlaceholder: string;
  allowCustomHref?: boolean; // Other만 true
  allowCustomTitle?: boolean; // Other만 true
};

const CONTACTS: readonly ContactMeta[] = [
  {
    type: "Instagram",
    title: "Instagram",
    prefix: "https://www.instagram.com/",
    valuePlaceholder: "Instagram ID",
  },
  { type: "X", title: "X", prefix: "https://x.com/", valuePlaceholder: "X ID" },
  {
    type: "Facebook",
    title: "Facebook",
    prefix: "https://www.facebook.com/",
    valuePlaceholder: "Facebook ID",
  },
  {
    type: "LinkedIn",
    title: "LinkedIn",
    prefix: "https://www.linkedin.com/in/",
    valuePlaceholder: "LinkedIn ID",
  },
  {
    type: "Behance",
    title: "Behance",
    prefix: "https://www.behance.net/",
    valuePlaceholder: "Behance ID",
  },
  {
    type: "Email",
    title: "Email",
    prefix: "mailto:",
    valuePlaceholder: "email@example.com",
  },
  {
    type: "Other",
    prefix: "",
    valuePlaceholder: "value",
    allowCustomHref: true,
    allowCustomTitle: true,
  },
] as const;

const getMetaByType = (type: ContactType) =>
  CONTACTS.find((c) => c.type === type)!;
const normalizeValue = (v: string) => v.trim();

const buildHref = (meta: ContactMeta, value: string) => {
  const v = normalizeValue(value);
  return v ? `${meta.prefix}${v}` : meta.prefix;
};

const ContactTypeSchema = z.enum([
  "Instagram",
  "X",
  "Facebook",
  "LinkedIn",
  "Behance",
  "Email",
  "Other",
] as [ContactType, ...ContactType[]]);

const FormSchema = z
  .object({
    type: ContactTypeSchema,
    value: z.string().min(1, "Value is required"),
    href: z.string().url().or(z.literal("")),
    title: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "Email") {
      const v = normalizeValue(data.value);
      if (v && !z.string().email().safeParse(v).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["value"],
          message: "Invalid email",
        });
      }
    } else if (data.type === "Other") {
      if (!data.href.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["href"],
          message: "URL is required",
        });
      }
      if (!data.title.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["title"],
          message: "Title is required",
        });
      }
    }
  });

type FormValues = z.infer<typeof FormSchema>;

export default function EditContactModal({
  initial,
  applyContact,
  deleteContact,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial: ContactLink;
  applyContact: (contact: ContactLink) => void;
  deleteContact?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "Instagram",
      value: "",
      href: "",
      title: "",
    },
    mode: "onBlur",
  });

  const { handleSubmit, watch, reset, setValue, clearErrors } = form;

  const type = watch("type");
  const value = watch("value");

  const meta = useMemo(() => getMetaByType(type), [type]);

  // ✅ value 변경 시 href 자동 반영 (Other 제외)
  useEffect(() => {
    if (type === "Other") return;
    const nextHref = buildHref(meta, value ?? "");
    setValue("href", nextHref, { shouldDirty: true, shouldValidate: true });
  }, [type, meta, value, setValue]);

  // ✅ initial -> form reset
  useEffect(() => {
    if (!initial) return;

    const name = (initial.name ?? "").trim();
    const initialType = (CONTACTS as readonly ContactMeta[]).some(
      (c) => c.type === name,
    )
      ? (name as ContactType)
      : ("Other" as const);

    const m = getMetaByType(initialType);

    reset({
      type: initialType,
      value: initial.value ?? "",
      href:
        initialType === "Other"
          ? (initial.href ?? "")
          : buildHref(m, initial.value ?? ""),
      title: initialType === "Other" ? (initial.name ?? "") : "",
    });
  }, [initial, reset]);

  const onClickIcon = (nextType: ContactType) => {
    clearErrors();
    setValue("type", nextType, { shouldDirty: true, shouldValidate: false });

    if (nextType !== type) {
      setValue("value", "", { shouldDirty: true, shouldValidate: false });
    }

    if (nextType === "Other") {
      setValue("href", "", { shouldDirty: true, shouldValidate: false });
      return;
    }

    setValue("title", "", { shouldDirty: true, shouldValidate: false });
    setValue("href", buildHref(getMetaByType(nextType), watch("value") ?? ""), {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const handleApply = handleSubmit((data) => {
    const m = getMetaByType(data.type);

    const next: ContactLink = {
      name: m.allowCustomTitle
        ? data.title.trim() || "Other"
        : (m.title ?? m.type),
      value: normalizeValue(data.value),
      href: data.type === "Other" ? data.href.trim() : buildHref(m, data.value),
    };

    applyContact(next);
    requestCloseModal();
  });

  const handleCancel = () => requestCloseModal();

  const handleDelete = () => {
    if (deleteContact) {
      deleteContact();
    }
    requestCloseModal();
  };

  const isDeletable = !!deleteContact;

  return (
    <ModalLayout
      title="Contact"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="20rem"
    >
      <div className={Styles.TabContainer}>
        {CONTACTS.map((c) => (
          <label key={`SELECT_${c.type}`} className={Styles.Tab}>
            <ContactIcon type={c.type} className={Styles.TabIcon} />
            <input
              type="radio"
              name="type"
              value={c.type}
              className={Styles.TabInput}
              checked={type === c.type}
              onChange={(e) => onClickIcon(e.target.value as ContactType)}
            />
          </label>
        ))}
      </div>

      <div className={Styles.Content}>
        {!meta.allowCustomTitle ? (
          <div className={Styles.Title}>
            <ContactIcon type={meta.type} className={Styles.TitleIcon} />
            <span>{meta.title ?? meta.type}</span>
          </div>
        ) : (
          <TitleInput
            title="Title"
            form={form}
            name={"title"}
            placeholder={"Title"}
            className={Styles.Field}
          />
        )}

        <TitleInput
          title="Value"
          form={form}
          name={"value"}
          placeholder={meta.valuePlaceholder}
          className={Styles.Field}
        />

        <TitleInput
          title="URL"
          form={form}
          name={"href"}
          placeholder={"https://example.com"}
          className={Styles.Field}
          disabled={!meta.allowCustomHref}
        />
      </div>

      <div className={Styles.ButtonContainer}>
        {isDeletable && <DeleteButton onClick={handleDelete} />}
        <CancelButton onClick={handleCancel} isRight />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
}
