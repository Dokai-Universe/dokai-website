import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import * as Styles from "./style.css";
import ErrorText from "../ErrorText/ErrorText";
import { useState } from "react";

type CheckState = "idle" | "checking" | "ok";

const TitleInputValidate = <T extends FieldValues, K extends Path<T>>({
  title,
  placeholder,
  form,
  name,
  className,
  disabled,
  onChange,
  checkValidate,
}: {
  title?: string;
  placeholder?: string;
  form: UseFormReturn<T>;
  name: K;
  className?: string;
  disabled?: boolean;
  onChange?: () => void;
  checkValidate: (
    value: string,
  ) => Promise<{ isOk: boolean; message?: string }>;
}) => {
  const {
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = form;

  const [value, setValue] = useState<string>("");
  const [lastValue, setLastValue] = useState<string | null>(null);
  const [checkState, setCheckState] = useState<CheckState>("idle");

  const buttonText =
    checkState === "checking"
      ? "Checking..."
      : checkState === "ok"
        ? "Checked"
        : "Check";

  const handleCheckValidate = async () => {
    setCheckState("checking");
    const result = await checkValidate(value.trim());
    if (result.isOk) {
      setCheckState("ok");
    } else {
      setCheckState("idle");
      setError(name, { message: result.message || "Invalid" });
    }
    setLastValue(value.trim());
  };

  const buttonDisabled =
    disabled ||
    !value.trim() ||
    value.trim() === lastValue ||
    checkState !== "idle";

  return (
    <div className={`${Styles.Container} ${className}`}>
      {title && <p className={Styles.Title}>{title}</p>}
      <div className={Styles.InputContainer}>
        <input
          className={Styles.Input}
          type="text"
          placeholder={placeholder}
          {...register(name)}
          onChange={(e) => {
            clearErrors(name);
            setValue(e.target.value);
            setCheckState("idle");
            onChange?.();
          }}
          disabled={disabled}
        />
        {!disabled && (
          <button
            type="button"
            onClick={handleCheckValidate}
            disabled={buttonDisabled}
            className={Styles.Button}
          >
            {buttonText}
          </button>
        )}
      </div>
      <ErrorText message={errors[name]?.message as string} />
    </div>
  );
};

export default TitleInputValidate;
