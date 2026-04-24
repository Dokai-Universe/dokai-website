import { useState } from "react";
import * as Styles from "./style.css";
import LoadingComponent from "@components/ui/Status/Loading";
import ErrorComponent from "@components/ui/Status/Error";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";
import { OgData } from "@controllers/og/types";
import { fetchOgData } from "@controllers/og/fetch";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";
import ModalLayout from "../ModalLayout";

type OgStep = "idle" | "loading" | "ready" | "error";

type OgState = {
  step: OgStep;
  url: string;
  og: OgData | null;
  error?: string;
};

const initialOgState: OgState = {
  step: "idle",
  url: "",
  og: null,
  error: undefined,
};

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const HyperlinkModal = ({
  onApply,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  onApply: (url: string) => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const [url, setUrl] = useState("");
  const [ogState, setOgState] = useState<OgState>(initialOgState);

  const handlePreviewUrl = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setOgState((prev) => ({
        ...prev,
        step: "idle",
      }));
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setOgState((prev) => ({
        ...prev,
        step: "error",
        error: "Invalid URL",
      }));
      return;
    }

    setOgState((prev) => ({
      ...prev,
      step: "loading",
    }));

    fetchOgData(trimmedUrl)
      .then((data) => {
        setOgState((prev) => ({
          ...prev,
          step: "ready",
          og: data,
          url: trimmedUrl,
        }));
      })
      .catch(() => {
        setOgState((prev) => ({
          ...prev,
          step: "error",
          error: "could not fetch OpenGraph data",
        }));
      });
  };

  const handleCancel = () => {
    requestCloseModal();
  };

  const handleApply = () => {
    if (ogState.step !== "ready" || ogState.url === "") {
      return;
    }
    onApply(ogState.url);
    requestCloseModal();
  };

  return (
    <ModalLayout
      title={"Hyperlink"}
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
    >
      <div className={Styles.Content}>
        <div className={Styles.URLInputContainer}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className={Styles.URLInput}
            onBlur={handlePreviewUrl}
          />
          <button onClick={handlePreviewUrl} className={Styles.URLButton}>
            Preview
          </button>
        </div>
        <div className={Styles.Wrapper}>
          {ogState.step === "ready" && ogState.og !== null ? (
            <div className={Styles.OgViewContainer}>
              <div className={Styles.OgViewImageContainer}>
                {ogState.og.image && (
                  <Image
                    src={ogState.og.image}
                    alt=""
                    fill
                    sizes={IMAGE_SIZES}
                    className={Styles.OgViewImage}
                  />
                )}
              </div>
              <div className={Styles.OgViewTextContainer}>
                <p className={Styles.OgViewTitle}>
                  {ogState.og.title ?? "제목 없음"}
                </p>
                <p className={Styles.OgViewDescription}>
                  {ogState.og.description ?? ""}
                </p>
                <p className={Styles.OgViewUrl}>{ogState.og.url ?? url}</p>
              </div>
            </div>
          ) : ogState.step === "loading" ? (
            <LoadingComponent useText="⏳ loading OpenGraph data..." />
          ) : ogState.step === "error" ? (
            <ErrorComponent
              errorText={`❌ ${ogState.error ?? "Unknown Error"}`}
            />
          ) : (
            <p>URL to preview</p>
          )}
        </div>
      </div>
      <div className={Styles.ButtonContainer}>
        <CancelButton onClick={handleCancel} />
        <ApplyButton
          onClick={handleApply}
          disabled={ogState.step !== "ready" || ogState.url === ""}
        />
      </div>
    </ModalLayout>
  );
};

export default HyperlinkModal;
