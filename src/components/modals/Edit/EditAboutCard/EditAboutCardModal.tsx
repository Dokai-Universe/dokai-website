"use client";

import { useEffect, useMemo } from "react";
import * as Styles from "./style.css";
import ModalLayout from "@components/modals/ModalLayout";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import DeleteButton from "@components/ui/Button/Delete/DeleteButton";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";

import { aboutCardFormSchema } from "@components/pages/about/about";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";
import { uploadImage } from "@utils/uploadImage";
import { useModalStackStore } from "@stores/modalStackStore";
import UploadSVG from "@assets/icons/upload.svg";

type FormValues = z.infer<typeof aboutCardFormSchema>;
type AboutCard = z.output<typeof aboutCardFormSchema>; // 최종은 icon이 string이어야 함

const EditAboutCardModal = ({
  initial,
  applyCard,
  deleteCard,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: { title: string; text: string; icon: string };
  applyCard: (next: { title: string; text: string; icon: string }) => void;
  deleteCard?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(aboutCardFormSchema),
    defaultValues: {
      title: "",
      text: "",
      icon: "",
      iconFile: null,
    },
    mode: "onBlur",
  });

  const { handleSubmit, reset, control, setValue } = form;

  const iconUrl = useWatch({ control, name: "icon" }) ?? "";
  const iconFile = useWatch({ control, name: "iconFile" }) ?? null;

  const previewUrl = useMemo(() => {
    if (iconFile) return URL.createObjectURL(iconFile);
    if (iconUrl.trim()) return iconUrl.trim();
    return "";
  }, [iconFile, iconUrl]);

  useEffect(() => {
    reset({
      title: initial?.title ?? "",
      text: initial?.text ?? "",
      icon: initial?.icon ?? "",
      iconFile: null,
    });
  }, [initial, reset]);

  // objectURL cleanup
  useEffect(() => {
    if (!iconFile) return;
    const u = URL.createObjectURL(iconFile);
    return () => URL.revokeObjectURL(u);
  }, [iconFile]);

  const handlePickFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;
    setValue("iconFile", file, { shouldDirty: true, shouldValidate: true });
    if (file) setValue("icon", "", { shouldDirty: true }); // ✅ 파일 선택 시 URL 비움
  };

  const handleDelete = () => {
    deleteCard?.();
    requestCloseModal();
  };

  const handleCancel = () => requestCloseModal();

  const uploadPendingImages = async (
    setProgress: (file: File | null, progress: number, count: number) => void,
  ) => {
    setProgress(iconFile, 0, 1);
    const { url: uploadedUrl } = await uploadImage(iconFile!);

    setValue("icon", uploadedUrl, { shouldDirty: true, shouldValidate: true });
    setProgress(null, 1, 1);
  };

  const { push } = useModalStackStore();

  const handleApply = handleSubmit(async (data) => {
    const finalIcon = data.icon.trim();

    if (!finalIcon && data.iconFile) {
      push("UPLOAD_IMAGE", {
        uploadImages: uploadPendingImages,
      });
      return;
    }

    applyCard({
      title: data.title.trim(),
      text: data.text.trim(),
      icon: finalIcon,
    });

    requestCloseModal();
  });

  const isDeletable = !!deleteCard;

  return (
    <ModalLayout
      title="Card"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="28rem"
    >
      <div className={Styles.Content}>
        <TitleInput
          form={form}
          name="title"
          title="Title"
          placeholder="Title"
        />
        <TitleInput form={form} name="text" title="Text" placeholder="Text" />

        <div className={Styles.IconContainer}>
          <p className={Styles.IconTitle}>Icon</p>
          <label className={Styles.IconContent}>
            <input
              className={Styles.IconInput}
              type="file"
              accept="image/*"
              onChange={handlePickFile}
            />
            {previewUrl &&
            (previewUrl.startsWith("blob:") ||
              (previewUrl.startsWith("https://") &&
                previewUrl.trim().length > 8)) ? (
              <Image
                src={previewUrl}
                alt="icon preview"
                fill
                sizes={IMAGE_SIZES}
                className={Styles.IconPreview}
              />
            ) : (
              <div className={Styles.IconUploadButton}>
                <UploadSVG className={Styles.IconUploadButtonIcon} />
                <p className={Styles.IconUploadButtonText}>Upload file</p>
              </div>
            )}
          </label>
          <TitleInput
            form={form}
            name="icon"
            placeholder="https://..."
            onChange={(e) => {
              if (e?.target.value.trim()) {
                setValue("iconFile", null, { shouldDirty: true });
              }
              setValue("icon", e?.target.value ?? "", {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          />
        </div>
      </div>

      <div className={Styles.ButtonContainer}>
        {isDeletable && <DeleteButton onClick={handleDelete} />}
        <CancelButton onClick={handleCancel} isRight />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
};

export default EditAboutCardModal;
