import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import * as Styles from "./style.css";
import ErrorText from "../ErrorText/ErrorText";
import ToggleUpSVG from "@assets/icons/toggle-up.svg";

const TitleSelect = <T extends FieldValues, K extends Path<T>>({
  title,
  placeholder,
  form,
  name,
  className,
  disabled,
  onChange,
  options,
}: {
  title?: string;
  placeholder?: string;
  form: UseFormReturn<T>;
  name: K;
  className?: string;
  disabled?: boolean;
  onChange?: () => void;
  options: readonly string[] | string[];
}) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = form;

  return (
    <div className={`${Styles.Container} ${className}`}>
      {title && <p className={Styles.Title}>{title}</p>}
      <label className={Styles.Label}>
        <select
          className={Styles.Select}
          disabled={disabled}
          {...register(name)}
          onChange={(e) => {
            register(name).onChange(e);
            clearErrors(name);
            onChange?.();
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={`${name}-${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ToggleUpSVG className={Styles.SelectIcon} />
      </label>
      <ErrorText message={errors[name]?.message as string} />
    </div>
  );
};

export default TitleSelect;
