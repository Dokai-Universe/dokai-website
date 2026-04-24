import { useEffect } from "react";
import * as Styles from "./style.css";
import ModalLayout from "@components/modals/ModalLayout";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import DeleteButton from "@components/ui/Button/Delete/DeleteButton";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";
import { aboutGroupSchema } from "@components/pages/about/about";

type FormValues = z.infer<typeof aboutGroupSchema>;
type AboutGroup = z.output<typeof aboutGroupSchema>;

const EditAboutGroupModal = ({
  initial,
  applyGroup,
  deleteGroup,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: AboutGroup;
  applyGroup: (next: AboutGroup) => void;
  deleteGroup?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(aboutGroupSchema),
    defaultValues: {
      name: "",
      values: [""],
    },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = form;

  const values = useWatch({ control, name: "values" }) ?? [""];

  useEffect(() => {
    reset({
      name: initial?.name ?? "",
      values: initial?.values?.length ? initial.values : [""],
    });
  }, [initial, reset]);

  const handleAddItem = () => {
    setValue("values", [...values, ""], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRemoveItem = (idx: number) => {
    const next = values.filter((_, i) => i !== idx);
    setValue("values", next.length ? next : [""], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleDelete = () => {
    deleteGroup?.();
    requestCloseModal();
  };

  const handleCancel = () => requestCloseModal();

  const handleApply = handleSubmit((data) => {
    applyGroup({
      name: data.name.trim(),
      values: data.values.map((v) => v.trim()).filter(Boolean),
    });
    requestCloseModal();
  });

  const isDeletable = !!deleteGroup;

  return (
    <ModalLayout
      title="Group"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="24rem"
    >
      <div className={Styles.Content}>
        <TitleInput
          form={form}
          name={"name"}
          placeholder={"Name"}
          title="Name"
        />

        <div className={Styles.ValuesContainer}>
          <p className={Styles.ValuesTitle}>Values</p>

          <div className={Styles.ValuesList}>
            {values.map((_, idx) => (
              <div key={`EDIT_GROUP_VALUE_${idx}`} className={Styles.ValueRow}>
                <label className={Styles.ValueLabel}>
                  <input
                    className={Styles.ValueInput}
                    placeholder={`Value ${idx + 1}`}
                    {...register(`values.${idx}` as const)}
                  />
                  <RemoveButton
                    onClick={() => handleRemoveItem(idx)}
                    className={Styles.ValueRemoveButton}
                  />
                </label>

                <ErrorText message={errors.values?.[idx]?.message as string} />
              </div>
            ))}
          </div>

          <AddButton onClick={handleAddItem} />
          <ErrorText message={errors.values?.root?.message as string} />
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

export default EditAboutGroupModal;
