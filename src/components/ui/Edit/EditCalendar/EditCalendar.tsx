import { FieldValues, Path, UseFormReturn, useWatch } from "react-hook-form";
import * as Styles from "./style.css";
import ErrorText from "../ErrorText/ErrorText";
import EditButton from "../EditButton/EditButton";
import { useModalStackStore } from "@stores/modalStackStore";
import { toYMD } from "@utils/Date";

const EditCalendar = <T extends FieldValues, K extends Path<T>>({
  title,
  placeholder,
  form,
  name,
  className,
  disabled,
  onChange,
}: {
  title?: string;
  placeholder?: string;
  form: UseFormReturn<T>;
  name: K;
  className?: string;
  disabled?: boolean;
  onChange?: () => void;
}) => {
  const {
    control,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = form;

  const { push } = useModalStackStore();

  const date = useWatch({ control, name }) ?? null;
  const text = date ? toYMD(date) : "";

  const handleOpenModal = () => {
    const cur = getValues(name);

    push("EDIT_CALENDAR", {
      initialDate: cur,
      applyDate: (nextDate: Date) => {
        setValue(name, nextDate as T[K], {
          shouldDirty: true,
          shouldValidate: true,
        });
        clearErrors(name);
        onChange?.();
      },
    });
  };

  return (
    <div className={`${Styles.Container} ${className}`}>
      {title && <p className={Styles.Title}>{title}</p>}
      <div className={Styles.InputContainer}>
        <input
          className={Styles.Input}
          type="text"
          placeholder={placeholder}
          value={text}
          disabled={disabled}
          readOnly
        />
        <EditButton onClick={handleOpenModal} />
      </div>
      <ErrorText message={errors[name]?.message as string} />
    </div>
  );
};

export default EditCalendar;
