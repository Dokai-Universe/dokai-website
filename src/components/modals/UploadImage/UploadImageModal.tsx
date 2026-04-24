import { useEffect, useState } from "react";
import * as Styles from "./style.css";
import ModalLayout from "../ModalLayout";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";

const UploadImageModal = ({
  uploadImages,
  handleCommit,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  uploadImages: (
    setProgress: (file: File | null, progress: number, count: number) => void,
  ) => void;
  handleCommit?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [percent, setPercent] = useState(0);

  const setProgress = (file: File | null, progress: number, count: number) => {
    setFile(file);
    setPercent((progress / count) * 100);
  };

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      await uploadImages(setProgress);
    })();
  }, [isOpen, uploadImages]);

  const handleCancel = () => {
    requestCloseModal();
  };

  const handleSave = () => {
    handleCommit?.();
    requestCloseModal();
  };

  const circumference = 2 * Math.PI * 10;
  const dashoffset = circumference * (1 - percent / 100);

  return (
    <ModalLayout
      title={percent === 100 ? "Upload Complete" : "Uploading..."}
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="24rem"
    >
      <div className={Styles.Content}>
        <div className={Styles.Donut}>
          <svg
            className={Styles.DonutSvg}
            viewBox="0 0 24 24"
            aria-label={`progress ${percent}%`}
          >
            <circle className={Styles.DonutTrack} />
            <circle
              className={Styles.DonutProgress}
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
            />
          </svg>
          <p className={Styles.DonutLabel}>{percent.toFixed(1)}%</p>
        </div>
        <p className={Styles.Title}>{file?.name ?? "Upload Complete"}</p>
      </div>

      <div className={Styles.ButtonContainer}>
        <CancelButton onClick={handleCancel} />
        <ApplyButton
          onClick={handleSave}
          disabled={percent !== 100}
          text={percent === 100 ? "Save" : "Uploading..."}
        />
      </div>
    </ModalLayout>
  );
};

export default UploadImageModal;
