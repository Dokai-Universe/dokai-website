import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { JSX, useEffect, useMemo, useRef, useState } from "react";

export interface ModalLayoutProps {
  children?: React.ReactNode;
  isShowModal: boolean;
  modalRef: React.RefObject<HTMLDivElement | null>;
  handleClickOutSide: (e: React.MouseEvent<HTMLDivElement>) => void;
  closeModal: () => void;
  showDelay: number;
}

const useModal = <T extends string | number>({
  Layout,
  Component,
  modalKey,
  showDelay = 0,
}: {
  Layout: ({
    children,
    isShowModal,
    modalRef,
    handleClickOutSide,
    closeModal,
    showDelay,
  }: ModalLayoutProps) => JSX.Element;
  Component: ({ modalData }: { modalData: T }) => JSX.Element | null;
  modalKey: string;
  showDelay?: number;
}): {
  openModal: (modalData: T) => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState<T>();

  const modalRef = useRef<HTMLDivElement>(null);
  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openModal = (modalData: T) => {
    localStorage.setItem("scrollPosition", window.scrollY.toString());
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(modalKey, `${modalData}`);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const closeModal = () => {
    localStorage.setItem("scrollPosition", window.scrollY.toString());
    router.back();
  };

  const modalKeyData = searchParams.get(modalKey);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // ✅ 이전 타이머 정리
    if (showModalTimeoutRef.current) {
      clearTimeout(showModalTimeoutRef.current);
      showModalTimeoutRef.current = null;
    }

    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      localStorage.removeItem("scrollPosition");
    }

    const modalRaw = searchParams.get(modalKey);
    const isOpen = !!modalRaw;

    if (isOpen) {
      setIsOpenModal(true);
      setModalData(modalRaw as T);

      // ✅ 프레임 뒤에 show 켜기(더 부드럽게)
      showModalTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsShowModal(true));
        });
      }, 0);
    } else {
      setIsShowModal(false);

      showModalTimeoutRef.current = setTimeout(() => {
        setIsOpenModal(false);
        setModalData(undefined);

        // ✅ 스크롤 복원은 닫힐 때만
        const scrollPosition = localStorage.getItem("scrollPosition");
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition));
          localStorage.removeItem("scrollPosition");
        }
      }, showDelay);
    }

    return () => {
      if (showModalTimeoutRef.current) {
        clearTimeout(showModalTimeoutRef.current);
        showModalTimeoutRef.current = null;
      }
    };
  }, [pathname, modalKeyData, showDelay]);

  const handleClickOutSide = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && e.target == modalRef.current) {
      closeModal();
    }
  };

  const Modal = useMemo(() => {
    if (!isOpenModal) return null;

    return (
      <Layout
        isShowModal={isShowModal}
        closeModal={closeModal}
        modalRef={modalRef}
        handleClickOutSide={handleClickOutSide}
        showDelay={showDelay}
      >
        <Component modalData={modalData!} />
      </Layout>
    );
  }, [isShowModal, isOpenModal, modalData]);

  return {
    Modal,
    openModal,
    closeModal,
  };
};

export default useModal;
