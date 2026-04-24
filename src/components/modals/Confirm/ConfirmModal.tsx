// src/components/modals/ConfirmModal.tsx
"use client";

import { useState } from "react";
import ModalLayout from "../ModalLayout";
import * as Styles from "./style.css";

type Props = {
  title: string;
  content: string;
  onConfirm?: () => void | Promise<void>;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
};

export default function ConfirmModal({
  title = "확인",
  content,
  onConfirm,
  isOpen,
  closeModal,
  requestCloseModal,
}: Props) {
  const handleConfirm = async () => {
    await onConfirm?.();
    requestCloseModal();
  };

  const handleCancel = () => {
    requestCloseModal();
  };

  return (
    <ModalLayout
      title={title}
      onClose={closeModal}
      isOpen={isOpen}
      className={Styles.Container}
      maxWidth="24rem"
    >
      <div className={Styles.Content}>{content}</div>

      <div className={Styles.ButtonContainer}>
        <button className={Styles.CancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button className={Styles.ConfirmButton} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </ModalLayout>
  );
}
