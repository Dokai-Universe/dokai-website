import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import * as Styles from "./style.css";
import ErrorText from "../ErrorText/ErrorText";

const TitleTextArea = <T extends FieldValues, K extends Path<T>>({
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
    register,
    clearErrors,
    formState: { errors },
  } = form;

  return (
    <div className={`${Styles.Container} ${className}`}>
      {title && <p className={Styles.Title}>{title}</p>}
      <textarea
        className={Styles.TextArea}
        placeholder={placeholder}
        {...register(name)}
        onChange={(e) => {
          register(name).onChange(e);
          clearErrors(name);
          onChange?.();
        }}
        disabled={disabled}
      />
      <ErrorText message={errors[name]?.message as string} />
    </div>
  );
};

export default TitleTextArea;
