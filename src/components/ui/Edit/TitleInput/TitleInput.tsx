import {
  FieldValues,
  Path,
  useController,
  UseFormReturn,
} from "react-hook-form";
import * as Styles from "./style.css";
import ErrorText from "../ErrorText/ErrorText";

const TitleInput = <T extends FieldValues, K extends Path<T>>({
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
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { register, clearErrors, control } = form;

  const {
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div className={`${Styles.Container} ${className}`}>
      {title && <p className={Styles.Title}>{title}</p>}
      <input
        className={Styles.Input}
        type="text"
        placeholder={placeholder}
        {...register(name)}
        onChange={(e) => {
          register(name).onChange(e);
          clearErrors(name);
          onChange?.(e);
        }}
        disabled={disabled}
      />
      <ErrorText message={error?.message} />
    </div>
  );
};

export default TitleInput;
