import { useController, useFormContext } from "react-hook-form";
import { AboutInput } from "./about";
import * as Styles from "./style.css";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import TitleRichText from "@components/ui/Edit/TitleRichText/TitleRichText";
import { AboutCard } from "@domain/about";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import { useModalStackStore } from "@stores/modalStackStore";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";

const AboutPageEditCard = ({ index }: { index: number }) => {
  const form = useFormContext<AboutInput>();
  const { control } = form;
  const {
    field,
    fieldState: { error },
  } = useController({ control, name: `contents.${index}.content` });

  const content = field.value as AboutCard[];

  const { push } = useModalStackStore();

  const handleAddCard = () => {
    push("EDIT_ABOUT_CARD", {
      initial: {
        icon: "",
        title: "",
        text: "",
      },
      applyCard: (next) => {
        form.setValue(`contents.${index}.content`, [...content, next]);
      },
    });
  };

  const handleEditCard = (idx: number) => {
    push("EDIT_ABOUT_CARD", {
      initial: content[idx],
      applyCard: (next) => {
        form.setValue(
          `contents.${index}.content`,
          content.map((item, i) => (i === idx ? next : item)),
        );
      },
      deleteCard: () => {
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
      <div className={Styles.CardContainer}>
        {content.map((item, i) => (
          <div key={`ABOUT_CARD_${i}`} className={Styles.CardContent}>
            <div className={Styles.CardIconContainer}>
              <Image
                src={item.icon}
                alt={item.title}
                fill
                sizes={IMAGE_SIZES}
                className={Styles.CardIcon}
              />
            </div>
            <div className={Styles.CardTextContainer}>
              <p className={Styles.CardTitle}>{item.title}</p>
              <p className={Styles.CardText}>{item.text}</p>
              <EditButton
                onClick={() => handleEditCard(i)}
                className={Styles.GroupEditButton}
              />
            </div>
          </div>
        ))}
        <div className={Styles.GroupAddButtonContainer}>
          <AddButton onClick={handleAddCard} />
          <ErrorText message={error?.message} />
        </div>
      </div>
    </div>
  );
};

export default AboutPageEditCard;
