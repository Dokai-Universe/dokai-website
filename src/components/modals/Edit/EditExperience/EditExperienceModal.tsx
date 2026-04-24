import { useEffect } from "react";
import * as Styles from "./style.css";
import ModalLayout from "@components/modals/ModalLayout";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import DeleteButton from "@components/ui/Button/Delete/DeleteButton";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";

const FormSchema = z.object({
  value: z.string().trim().min(1, "Experience is required"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function EditExperienceModal({
  initial,
  applyExperience,
  deleteExperience,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial: string;
  applyExperience: (next: string) => void;
  deleteExperience?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { value: "" },
    mode: "onBlur",
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    reset({ value: initial ?? "" });
  }, [initial, reset]);

  const handleApply = handleSubmit((data) => {
    applyExperience(data.value.trim());
    requestCloseModal();
  });

  const handleDelete = () => {
    deleteExperience?.();
    requestCloseModal();
  };

  const handleCancel = () => requestCloseModal();

  const isDeletable = !!deleteExperience;

  return (
    <ModalLayout
      title="Experience"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="20rem"
    >
      <TitleInput
        form={form}
        name={"value"}
        placeholder={"e.g. 2020.10.12 [Project Name] ~"}
      />

      <div className={Styles.ButtonContainer}>
        {isDeletable && <DeleteButton onClick={handleDelete} />}

        <CancelButton onClick={handleCancel} isRight />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
}
