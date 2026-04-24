import { useController, useFormContext } from "react-hook-form";
import { AboutInput } from "./about";
import * as Styles from "./style.css";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";
import { AboutGroup } from "@domain/about";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import { useModalStackStore } from "@stores/modalStackStore";

const AboutPageEditGroup = ({ index }: { index: number }) => {
  const form = useFormContext<AboutInput>();
  const { control } = form;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name: `contents.${index}.content` });

  const content = field.value as AboutGroup[];

  const { push } = useModalStackStore();

  const handleAddGroup = () => {
    push("EDIT_ABOUT_GROUP", {
      initial: {
        name: "",
        values: [""],
      },
      applyGroup: (next) => {
        form.setValue(`contents.${index}.content`, [...content, next]);
      },
    });
  };

  const handleEditGroup = (idx: number) => {
    push("EDIT_ABOUT_GROUP", {
      initial: content[idx],
      applyGroup: (next) => {
        form.setValue(
          `contents.${index}.content`,
          content.map((item, i) => (i === idx ? next : item)),
        );
      },
      deleteGroup: () => {
        form.setValue(
          `contents.${index}.content`,
          content.filter((_, i) => i !== idx),
        );
      },
    });
  };

  return (
    <div className={Styles.ContentContainer}>
      <TitleInput
        title="Name"
        form={form}
        name={`contents.${index}.name`}
        className={Styles.ContentName()}
      />
      <TitleRichText
        title="Text"
        form={form}
        name={`contents.${index}.text`}
        className={Styles.ContentText}
        placeholder="Write text here..."
      />
      <div className={Styles.GroupContainer}>
        {content.map((item, i) => (
          <div key={`ABOUT_GROUP_${i}`} className={Styles.GroupContent}>
            <p className={Styles.GroupTitle}>{item.name}</p>
            <div className={Styles.GroupValues}>
              {item.values.map((value, j) => (
                <p key={`ABOUT_GROUP_${i}_${j}`}>{value}</p>
              ))}
            </div>
            <EditButton
              onClick={() => handleEditGroup(i)}
              className={Styles.GroupEditButton}
            />
          </div>
        ))}
        <div className={Styles.GroupAddButtonContainer}>
          <AddButton onClick={handleAddGroup} />
          <ErrorText message={error?.message} />
        </div>
      </div>
    </div>
  );
};

export default AboutPageEditGroup;
