import { MediaSource, MediaType } from "@domain/media";

import * as Styles from "./style.css";
import { useEffect, useMemo, useRef, useState } from "react";
import SelectMedia from "./Select/Select";
import EditImage from "./EditImage/EditImage";
import { uploadImage } from "@utils/uploadImage";
import ArrowLeftSVG from "@assets/icons/arrow-left.svg";
import EditVideo from "./EditVideo/EditVideo";
import ModalLayout from "@components/modals/ModalLayout";
import { useModalStackStore } from "@stores/modalStackStore";

const EditMediaSingleModal = ({
  initial,
  applyMedia,
  blockedTypes = [],
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: MediaSource | null;
  applyMedia?: (media: MediaSource) => void;
  blockedTypes?: MediaType[];
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const [media, setMedia] = useState<MediaSource | null>(initial ?? null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const ownedBlobUrlRef = useRef<string | null>(null);

  const registerBlobUrl = (url: string) => {
    const prev = ownedBlobUrlRef.current;
    if (prev) URL.revokeObjectURL(prev);
    ownedBlobUrlRef.current = url;
  };

  const revokeBlobUrl = () => {
    const prev = ownedBlobUrlRef.current;
    if (prev) URL.revokeObjectURL(prev);
    ownedBlobUrlRef.current = null;
  };

  const blockedVideoType = useMemo(() => {
    if (blockedTypes.includes("VIDEO")) return "VIDEO" as const;
    if (blockedTypes.includes("LOOP")) return "LOOP" as const;
    return undefined;
  }, [blockedTypes]);

  const canBack = useMemo(() => {
    const canImage = !blockedTypes?.includes("IMAGE");
    const canVideo = !blockedTypes?.includes("VIDEO");
    const canLoop = !blockedTypes?.includes("LOOP");
    const canAnyVideoLike = canVideo || canLoop;

    return canImage && canAnyVideoLike;
  }, [blockedTypes]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMedia(initial ?? null);
    setPendingFile(null);
  }, [initial]);

  const updateMedia = (updater: (curr: MediaSource) => MediaSource) => {
    setMedia((prev) => (prev ? updater(prev) : null));
  };

  const selectMedia = (type: "IMAGE" | "VIDEO" | "NONE") => {
    if (type === "NONE") {
      setMedia(null);
    } else {
      if (type === "VIDEO" && blockedTypes.includes("VIDEO")) {
        setMedia({
          type: "LOOP",
          src: "",
          alt: "",
          loop: { start: undefined, end: undefined },
        });
      } else {
        setMedia({ type, src: "", alt: "" });
      }
    }
  };

  const handleCancel = () => {
    revokeBlobUrl();
    requestCloseModal();
  };

  const { push } = useModalStackStore();

  const uploadPendingImages = async (
    setProgress: (file: File | null, progress: number, count: number) => void,
  ) => {
    setProgress(pendingFile, 0, 1);
    const { url: uploadedUrl } = await uploadImage(pendingFile!);

    revokeBlobUrl();
    setPendingFile(null);
    updateMedia((prev) => ({ ...prev, src: uploadedUrl }));
    setProgress(null, 1, 1);
  };

  const handleApply = async () => {
    if (!media) {
      requestCloseModal();
      return;
    }

    if (media.type === "IMAGE" && pendingFile) {
      push("UPLOAD_IMAGE", {
        uploadImages: uploadPendingImages,
      });
      return;
    }

    applyMedia?.(media);
    revokeBlobUrl();
    requestCloseModal();
  };

  return (
    <ModalLayout
      title={initial ? "Edit Media" : "Add Media"}
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.SingleContainer}
    >
      <div className={Styles.SingleContent}>
        {!media ? (
          <SelectMedia selectMedia={selectMedia} blockedTypes={blockedTypes} />
        ) : media.type === "IMAGE" ? (
          <EditImage
            media={media}
            updateMedia={updateMedia}
            setPendingFile={setPendingFile}
            registerBlobUrl={registerBlobUrl}
            revokeBlobUrl={revokeBlobUrl}
          />
        ) : (
          <EditVideo
            media={media}
            updateMedia={updateMedia}
            blockedType={blockedVideoType}
          />
        )}
      </div>
      {media && (
        <div className={Styles.SingleButtonContainer}>
          {canBack && (
            <button
              className={Styles.BackButton}
              onClick={() => setMedia(null)}
            >
              <ArrowLeftSVG />
            </button>
          )}
          <button onClick={handleCancel} className={Styles.CancelButton}>
            Cancel
          </button>
          <button onClick={handleApply} className={Styles.ApplyButton}>
            Apply
          </button>
        </div>
      )}
    </ModalLayout>
  );
};

export default EditMediaSingleModal;
