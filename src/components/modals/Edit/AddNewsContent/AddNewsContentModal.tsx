import { useState } from "react";
import ImageSVG from "@assets/icons/image.svg";
import * as Styles from "./style.css";
import EditSVG from "@assets/icons/edit.svg";
import ModalLayout from "@components/modals/ModalLayout";
import { NewsChapterContent } from "@domain/news";
import AddButton from "@components/ui/Edit/AddButton/AddButton";

const AddNewsContentModal = ({
  addNewsContent,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  addNewsContent: (content: NewsChapterContent) => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const [selectedType, setSelectedType] = useState<"TEXT" | "MEDIA" | null>(
    null,
  );

  const handleAddNewsContent = () => {
    if (!selectedType) return;
    addNewsContent(
      selectedType === "TEXT"
        ? {
            type: "TEXT",
            text: "",
          }
        : {
            type: "MEDIA",
            media: null,
          },
    );
    requestCloseModal();
  };

  return (
    <ModalLayout
      title={"Add Section"}
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
    >
      <div className={Styles.Content}>
        <button
          type="button"
          onClick={() => setSelectedType("TEXT")}
          className={Styles.SelectMediaButton}
          data-selected={selectedType === "TEXT"}
        >
          <EditSVG className={Styles.SelectMediaButtonIcon} />
          <p className={Styles.SelectMediaButtonText}>Text</p>
        </button>
        <button
          type="button"
          onClick={() => setSelectedType("MEDIA")}
          className={Styles.SelectMediaButton}
          data-selected={selectedType === "MEDIA"}
        >
          <ImageSVG className={Styles.SelectMediaButtonIcon} />
          <p className={Styles.SelectMediaButtonText}>Image</p>
        </button>
      </div>
      <AddButton
        onClick={handleAddNewsContent}
        disabled={selectedType === null}
      />
    </ModalLayout>
  );
};

export default AddNewsContentModal;
