// src/components/modals/ModalStackRoot.tsx
"use client";

import dynamic from "next/dynamic";
import { useModalStackStore } from "@stores/modalStackStore";
import ProjectModal from "./Project/ProjectModal";
import SearchModal from "./Search/SearchModal";
import DrawerMenuModal from "./DrawerMenu/DrawerMenuModal";
import EditMetaInfoModal from "./Edit/EditMetaInfo/EditMetaInfoModal";
import EditCreditModal from "./Edit/EditCredit/EditCreditModal";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useLockBodyScroll from "@hooks/useLockBodyScroll";
import UploadImageModal from "./UploadImage/UploadImageModal";

const ApiModal = dynamic(() => import("./Api/ApiModal"), { ssr: false });
const ConfirmModal = dynamic(() => import("./Confirm/ConfirmModal"), {
  ssr: false,
});
const EditMediaListModal = dynamic(
  () => import("./Edit/EditMedia/EditMediaListModal"),
  { ssr: false },
);
const EditProjectContentModal = dynamic(
  () => import("./Edit/EditProjectContent/EditProjectContentModal"),
  { ssr: false },
);
const EditMediaSingleModal = dynamic(
  () => import("./Edit/EditMedia/EditMediaSingleModal"),
  { ssr: false },
);
const EditContactModal = dynamic(
  () => import("./Edit/EditContact/EditContactModal"),
  { ssr: false },
);
const EditExperienceModal = dynamic(
  () => import("./Edit/EditExperience/EditExperienceModal"),
  { ssr: false },
);
const EditDatePickerModal = dynamic(
  () => import("./Edit/EditDatePicker/EditDatePickerModal"),
  { ssr: false },
);

const ModalStackRoot = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stack = useModalStackStore((s) => s.stack);
  const requestCloseById = useModalStackStore((s) => s.requestCloseById);
  const finalizeCloseById = useModalStackStore((s) => s.finalizeCloseById);
  const requestCloseAll = useModalStackStore((s) => s.requestCloseAll);

  useLockBodyScroll(!!stack.length);

  useEffect(() => {
    requestCloseAll();
  }, [pathname, searchParams]);

  if (stack.length === 0) return null;

  return (
    <>
      {stack.map((m, idx) => {
        const isTop = idx === stack.length - 1;

        const common = {
          // top만 닫히게: 아래 모달들은 클릭/esc 반응 안 하게 할 때 사용
          isTop,
          // onClose: () => finalizeCloseById(m.id),
          // onRequestClose: () => requestCloseById(m.id),
          // onAfterClose: () => finalizeCloseById(m.id),
          closeModal: () => finalizeCloseById(m.id),
          requestCloseModal: () => requestCloseById(m.id),
          isOpen: m.status === "open",
          zIndex: 9999 + idx,
        };

        switch (m.type) {
          case "API":
            return <ApiModal key={m.id} {...m.props} {...common} />;
          case "CONFIRM":
            return <ConfirmModal key={m.id} {...m.props} {...common} />;
          case "DRAWER_MENU":
            return <DrawerMenuModal key={m.id} {...common} {...m.props} />;
          case "SEARCH":
            return <SearchModal key={m.id} {...common} {...m.props} />;
          case "PROJECT":
            return <ProjectModal key={m.id} {...common} {...m.props} />;
          case "EDIT_MEDIA_LIST":
            return <EditMediaListModal key={m.id} {...common} {...m.props} />;
          case "EDIT_MEDIA_SINGLE":
            return <EditMediaSingleModal key={m.id} {...common} {...m.props} />;
          case "EDIT_PROJECT_CONTENT":
            return (
              <EditProjectContentModal key={m.id} {...common} {...m.props} />
            );
          case "EDIT_CONTACT":
            return <EditContactModal key={m.id} {...common} {...m.props} />;
          case "EDIT_EXPERIENCE":
            return <EditExperienceModal key={m.id} {...common} {...m.props} />;
          case "EDIT_DATE_PICKER":
            return <EditDatePickerModal key={m.id} {...common} {...m.props} />;
          case "EDIT_META_INFO":
            return <EditMetaInfoModal key={m.id} {...common} {...m.props} />;
          case "EDIT_CREDIT":
            return <EditCreditModal key={m.id} {...common} {...m.props} />;
          case "UPLOAD_IMAGE":
            return <UploadImageModal key={m.id} {...common} {...m.props} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default ModalStackRoot;
