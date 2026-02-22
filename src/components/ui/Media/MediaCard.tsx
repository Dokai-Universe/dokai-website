"use client";

import Image from "next/image";
import VimeoPlayer from "./VimeoPlayer";
import { MediaSource } from "./types";
import { IMAGE_SIZES } from "@ts/image";
import React, { useEffect, useMemo, useState } from "react";
import LoadingPNG from "@assets/Loading.png";
import ErrorPNG from "@assets/Error.png";
import UnknownPNG from "@assets/Unknown.png";
import { validateImage } from "@utils/Image";
import * as Styles from "./styles.css";
import { LoopConfig } from "@domain/media";

type ImageStep = "idle" | "loading" | "ready" | "error";

type ImageState = {
  step: ImageStep;
  url: string | null;
  errorText: string | null;
};

const initialImageState: ImageState = {
  step: "idle",
  url: null,
  errorText: null,
};

const isSupportedSrc = (src: string) =>
  src.startsWith("/") ||
  src.startsWith("https://") ||
  src.startsWith("http://") ||
  src.startsWith("blob:");

const ImageCard = ({
  src,
  alt,
  useAlternative,
}: {
  src: string;
  alt: string;
  useAlternative?: boolean;
}) => {
  const [state, setState] = useState<ImageState>(initialImageState);

  const supported = useMemo(() => isSupportedSrc(src), [src]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let cancelled = false;

    if (!supported) {
      setState(initialImageState);
      return () => {
        cancelled = true;
      };
    }

    setState((prev) => ({ ...prev, step: "loading" }));

    (async () => {
      try {
        await validateImage(src);
        if (cancelled) return;
        setState((prev) => ({ ...prev, step: "ready", url: src }));
      } catch {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          step: "error",
          errorText: "Invalid image",
        }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src, supported]);

  const handleImageError = () =>
    setState((prev) => ({
      ...prev,
      step: "error",
      errorText: "Invalid image",
    }));

  if (state.step === "ready") {
    return (
      <Image
        src={state.url!}
        alt={alt}
        fill
        sizes={IMAGE_SIZES}
        style={{ objectFit: "cover" }}
        onError={handleImageError}
      />
    );
  }

  if (!useAlternative) return null;

  return (
    <div className={Styles.ImageWrapper}>
      {state.step === "loading" ? (
        <div
          style={{
            width: "50%",
            height: "50%",
            position: "relative",
          }}
        >
          <Image
            src={LoadingPNG}
            alt="Loading"
            fill
            sizes={IMAGE_SIZES}
            style={{ objectFit: "contain" }}
            className={Styles.LoadingIcon}
          />
        </div>
      ) : state.step === "error" ? (
        <>
          <div
            style={{
              width: "50%",
              height: "50%",
              position: "relative",
            }}
          >
            <Image
              src={ErrorPNG}
              alt="Error"
              fill
              sizes={IMAGE_SIZES}
              style={{ objectFit: "contain" }}
            />
          </div>

          <p
            style={{
              color: "black",
            }}
          >
            {state.errorText}
          </p>
        </>
      ) : (
        <div
          style={{
            width: "50%",
            height: "50%",
            position: "relative",
          }}
        >
          <Image
            src={UnknownPNG}
            alt="Unknown"
            fill
            sizes={IMAGE_SIZES}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};

type VideoStep = "idle" | "loading" | "ready" | "error";

type VideoState = {
  step: VideoStep;
  errorText: string | null;
};

const initialVideoState: VideoState = {
  step: "idle",
  errorText: null,
};

const VideoCard = ({
  media,
  useAlternative,
  className,
  pointerEvents,
}: {
  media: MediaSource;
  useAlternative?: boolean;
  className?: string;
  pointerEvents?: "auto" | "none";
}) => {
  const { type, src } = media ?? {};
  const [state, setState] = useState<VideoState>(initialVideoState);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    setState({ step: "loading", errorText: null });
  }, [src]);

  // vimeoId 파싱 안정화
  const videoId = useMemo(() => {
    const last = src?.split("/").at(-1) ?? "";
    // 혹시 query가 붙어있으면 제거
    const pure = last.split("?")[0].split("#")[0];
    const n = Number(pure);
    return Number.isFinite(n) ? n : NaN;
  }, [src]);

  if (!Number.isFinite(videoId)) {
    if (!useAlternative) return null;
    return (
      <div className={`${className} ${Styles.ImageWrapper}`}>
        <div
          style={{
            width: "50%",
            height: "50%",
            position: "relative",
          }}
        >
          <Image
            src={UnknownPNG}
            alt="Unknown"
            fill
            sizes={IMAGE_SIZES}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    );
  }

  if (useAlternative) {
    return state.step === "ready" || state.step === "loading" ? (
      <VimeoPlayer
        videoId={videoId}
        className={className}
        loop={media?.type == "LOOP" ? media?.loop : undefined}
        // pointerEvents={pointerEvents}
        onLoad={() => setState({ step: "ready", errorText: null })}
        onError={(msg) =>
          setState({ step: "error", errorText: msg || "Invalid video" })
        }
      />
    ) : (
      <div className={`${className} ${Styles.ImageWrapper}`}>
        {state.step === "error" ? (
          <>
            <div
              style={{
                width: "50%",
                height: "50%",
                position: "relative",
              }}
            >
              <Image
                src={ErrorPNG}
                alt="Error"
                fill
                sizes={IMAGE_SIZES}
                style={{ objectFit: "contain" }}
              />
            </div>

            <p
              style={{
                color: "black",
              }}
            >
              {state.errorText}
            </p>
          </>
        ) : (
          <div
            style={{
              width: "50%",
              height: "50%",
              position: "relative",
            }}
          >
            <Image
              src={UnknownPNG}
              alt="Unknown"
              fill
              sizes={IMAGE_SIZES}
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <VimeoPlayer
      videoId={videoId}
      className={className}
      loop={media?.type == "LOOP" ? media?.loop : undefined}
      pointerEvents={pointerEvents}
      onLoad={() => setState({ step: "ready", errorText: null })}
      onError={(msg) =>
        setState({ step: "error", errorText: msg || "Invalid video" })
      }
    />
  );
};

const MediaCard = ({
  className,
  media,
  pointerEvents,
  useAlternative,
}: {
  className?: string;
  media: MediaSource;
  pointerEvents?: "auto" | "none";
  useAlternative?: boolean;
}) => {
  const { type, src, alt } = media ?? {};

  if (type == "IMAGE") {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          background: "#eee",
        }}
      >
        <ImageCard
          src={src}
          alt={alt}
          useAlternative={useAlternative}
          key={`MEDIA_${type}_${src}`}
        />
      </div>
    );
  }

  return (
    <VideoCard
      media={media}
      useAlternative={useAlternative}
      className={className}
      pointerEvents={pointerEvents}
      key={`MEDIA_${type}_${src}${media?.type === "LOOP" ? `-${media?.loop?.start}-${media?.loop?.end}` : ""}`}
    />
  );
};

export default React.memo(MediaCard);
