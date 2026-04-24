import { useFieldArray, useFormContext } from "react-hook-form";
import { AboutInput } from "./about";
import * as Styles from "./style.css";
import AboutPageEditText from "./EditText";
import AboutPageEditGroup from "./EditGroup";
import { AboutContentMedias } from "@domain/about";
import AboutPageEditMedias from "./EditMedias";
import AboutPageEditCard from "./EditCard";
import AboutPageEditTeam from "./EditTeam";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";

const SortableAboutContentItem = ({
  id,
  children,
  className,
}: {
  id: string;
  children: (args: {
    handleProps: Record<string, unknown>;
    isDragging: boolean;
  }) => React.ReactNode;
  className?: string;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 180,
      easing: "ease",
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(
          transform
            ? {
                ...transform,
                x: 0,
                scaleX: 1,
                scaleY: 1,
              }
            : null,
        ),
        transition,
        opacity: isDragging ? 0.7 : 1,
      }}
      className={className}
    >
      {children({
        handleProps: {
          ...attributes,
          ...listeners,
        },
        isDragging,
      })}
    </div>
  );
};

const AboutPageEditContent = ({ id, index }: { id: string; index: number }) => {
  const form = useFormContext<AboutInput>();
  const { watch, control } = form;

  const { remove } = useFieldArray({
    control,
    name: "contents",
  });

  const type = watch(`contents.${index}.type`);
  const content = watch(`contents.${index}`) as AboutContentMedias;

  const align = type === "MEDIAS" ? content.align : "RIGHT";
  const size = type === "MEDIAS" ? content.size : "NORMAL";

  const handleDelete = () => {
    remove(index);
  };

  return (
    <SortableAboutContentItem
      id={id}
      className={Styles.Content({
        align,
        size,
      })}
    >
      {({ handleProps }) => (
        <React.Fragment key={index}>
          {size !== "FULL" && (
            <div className={Styles.EditContentButtonContainer({ align })}>
              <button
                type="button"
                className={Styles.EditContentButton}
                {...handleProps}
              >
                ⋮⋮
              </button>
              <RemoveButton onClick={handleDelete} />
            </div>
          )}
          {type === "MEDIAS" ? (
            <AboutPageEditMedias index={index} />
          ) : type === "TEXT" ? (
            <AboutPageEditText index={index} />
          ) : type === "GROUP" ? (
            <AboutPageEditGroup index={index} />
          ) : type === "CARD" ? (
            <AboutPageEditCard index={index} />
          ) : type === "TEAM" ? (
            <AboutPageEditTeam index={index} />
          ) : null}
        </React.Fragment>
      )}
    </SortableAboutContentItem>
  );
};

export default AboutPageEditContent;
