import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import * as Styles from "./style.css";

const EditPublished = <T extends FieldValues, K extends Path<T>>({
  form,
  name,
  className,
}: {
  form: UseFormReturn<T>;
  name: K;
  className?: string;
}) => {
  const { register } = form;

  return (
    <label className={`${Styles.Container} ${className}`}>
      <div className={Styles.TextContainer}>
        <p className={Styles.Title}>Public</p>
        <p className={Styles.Desc}>Publish this page so anyone can view it.</p>
      </div>

      <input type="checkbox" {...register(name)} className={Styles.Input} />
      <span className={Styles.Toggle} />
    </label>
  );
};

export default EditPublished;
