import { MediaSource, MediaType } from "@domain/media";
import { useEffect, useMemo, useRef, useState } from "react";
import SideBar from "./SideBar/SideBar";
import * as Styles from "./style.css";
import EmptyMedia from "./Empty/Empty";
import SelectMedia from "./Select/Select";
import EditImage from "./EditImage/EditImage";
import { uploadImage } from "@utils/uploadImage";
import EditVideo from "./EditVideo/EditVideo";
import ModalLayout from "@components/modals/ModalLayout";
import { useModalStackStore } from "@stores/modalStackStore";

const EditMediaListModal = ({
  initial,
  applyMedias,
  blockedTypes = [],
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: MediaSource[];
  applyMedias?: (medias: MediaSource[]) => void;
  blockedTypes?: MediaType[];
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [medias, setMedias] = useState<{ id: number; media: MediaSource }[]>(
    [],
  );
  const [pendingFiles, setPendingFiles] = useState<Map<number, File>>(
    () => new Map(),
  );
  const { push } = useModalStackStore();

  const nextIdRef = useRef(0);

  const ownedBlobUrlsRef = useRef<Map<number, string>>(new Map());

  const registerBlobUrl = (id: number, url: string) => {
    // 기존에 등록된 blob이 있으면 revoke 후 교체
    const prev = ownedBlobUrlsRef.current.get(id);
    if (prev) URL.revokeObjectURL(prev);
    ownedBlobUrlsRef.current.set(id, url);
  };

  const revokeBlobUrl = (id: number) => {
    const prev = ownedBlobUrlsRef.current.get(id);
    if (prev) URL.revokeObjectURL(prev);
    ownedBlobUrlsRef.current.delete(id);
  };

  const revokeAllBlobUrls = () => {
    for (const url of ownedBlobUrlsRef.current.values())
      URL.revokeObjectURL(url);
    ownedBlobUrlsRef.current.clear();
  };

  const blockedVideoType = useMemo(() => {
    if (blockedTypes.includes("VIDEO")) return "VIDEO" as const;
    if (blockedTypes.includes("LOOP")) return "LOOP" as const;
    return undefined;
  }, [blockedTypes]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!open) return;

    nextIdRef.current = 0;

    const list =
      initial?.map((media) => ({
        media,
        id: nextIdRef.current++,
      })) ?? [];

    setMedias(list);
    setSelectedIndex(null);
    setPendingFiles(new Map());

    ownedBlobUrlsRef.current.clear();
  }, [initial, open]);

  const deleteMedia = (id: number) => {
    revokeBlobUrl(id);
    setPendingFile(id)(null);
    setSelectedIndex(null);
    setMedias((prev) => prev.filter((item) => item.id !== id));
  };

  const addMedia = (type: "IMAGE" | "VIDEO" | "NONE") => {
    if (type === "NONE") {
      setSelectedIndex(null);
      return;
    }

    const media: MediaSource =
      type === "VIDEO" && blockedTypes.includes("VIDEO")
        ? {
            type: "LOOP",
            src: "",
            alt: "",
            loop: { start: undefined, end: undefined },
          }
        : { type, src: "", alt: "" };

    const newId = nextIdRef.current++;

    setMedias((prev) => {
      const next = [...prev, { media, id: newId }];
      setSelectedIndex(next.length - 1); // ✅ 항상 정확
      return next;
    });
  };

  const updateMedia =
    (id: number) => (updater: (media: MediaSource) => MediaSource) => {
      setMedias((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, media: updater(item.media) } : item,
        ),
      );
    };

  const setPendingFile = (id: number) => (file: File | null) => {
    setPendingFiles((prev) => {
      const next = new Map(prev);
      if (!file) next.delete(id);
      else next.set(id, file);
      return next;
    });
  };

  const uploadPendingImages = async (
    setProgress: (file: File | null, progress: number, count: number) => void,
  ) => {
    let i = 0;
    for (const [id, file] of pendingFiles.entries()) {
      setProgress(file, i++, pendingFiles.size);
      const { url } = await uploadImage(file);

      revokeBlobUrl(id);
      setPendingFile(id)(null);
      updateMedia(id)((prev) => ({ ...prev, src: url }));
    }
    setProgress(null, pendingFiles.size, pendingFiles.size);
  };

  const handleCommit = () => {
    applyMedias?.(medias.map((item) => item.media));
    revokeAllBlobUrls();
    requestCloseModal();
  };

  const handleCancel = () => {
    revokeAllBlobUrls();
    requestCloseModal();
  };

  const handleApply = async () => {
    if (pendingFiles.size) {
      push("UPLOAD_IMAGE", {
        uploadImages: uploadPendingImages,
      });
      return;
    }

    handleCommit();
  };
  return (
    <ModalLayout
      title={initial ? "Edit Medias" : "Add Medias"}
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.ListContainer}
      maxWidth="48rem"
    >
      <div className={Styles.ListContent}>
        {selectedIndex === null ? (
          <EmptyMedia onClick={() => setSelectedIndex(-1)} />
        ) : selectedIndex === -1 ? (
          <SelectMedia blockedTypes={blockedTypes} selectMedia={addMedia} />
        ) : medias[selectedIndex] ? (
          medias[selectedIndex].media.type === "IMAGE" ? (
            <EditImage
              key={selectedIndex}
              media={medias[selectedIndex].media}
              updateMedia={updateMedia(medias[selectedIndex].id)}
              setPendingFile={setPendingFile(medias[selectedIndex].id)}
              registerBlobUrl={(url) =>
                registerBlobUrl(medias[selectedIndex].id, url)
              }
              revokeBlobUrl={() => revokeBlobUrl(medias[selectedIndex].id)}
            />
          ) : (
            <EditVideo
              media={medias[selectedIndex].media}
              updateMedia={updateMedia(medias[selectedIndex].id)}
              blockedType={blockedVideoType}
            />
          )
        ) : null}
      </div>

      <div className={Styles.ListSideBar}>
        <SideBar
          medias={medias}
          deleteMedia={deleteMedia}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div className={Styles.ListButtonContainer}>
          <button onClick={handleCancel} className={Styles.CancelButton}>
            Cancel
          </button>
          <button onClick={handleApply} className={Styles.ApplyButton}>
            Apply
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default EditMediaListModal;
