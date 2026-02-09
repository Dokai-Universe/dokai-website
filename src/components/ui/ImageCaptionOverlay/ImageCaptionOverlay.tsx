"use client";

import { getReadableTextColor } from "@utils/Color";
import * as Styles from "./ImageCaptionOverlay.css";
import Image from "next/image";
import React from "react";

const ImageCaptionOverlay = ({
  className,
  caption,
  src,
  alt,
  bg,
}: {
  className?: string;
  caption: string;
  src: string;
  alt: string;
  bg: string;
}) => {
  const fg = getReadableTextColor(bg);

  return (
    <div className={`${Styles.Container} ${className}`}>
      <Image src={src} alt={alt} fill className={Styles.Image} />
      <div
        className={Styles.Overlay}
        style={
          {
            "--hover-bg-color": bg,
            "--hover-fg-color": fg,
          } as React.CSSProperties
        }
      >
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default React.memo(ImageCaptionOverlay);
