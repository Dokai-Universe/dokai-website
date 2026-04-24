import ErrorComponent from "@components/ui/Status/Error";
import LoadingComponent from "@components/ui/Status/Loading";
import { ImageSource } from "@domain/media";
import { IMAGE_SIZES } from "@ts/image";
import Image from "next/image";
import { useEffect, useState } from "react";

const isSupportedImageSrc = (src: string) =>
  src.startsWith("/") ||
  src.startsWith("https://") ||
  src.startsWith("http://") ||
  src.startsWith("blob:");

type Props = {
  image?: ImageSource;
  useAlternative?: boolean;
  priority?: boolean;
};

const loadedImageSrcSet = new Set<string>();

const ImageCard = ({ image, useAlternative, priority }: Props) => {
  const [state, setState] = useState<{
    step: "loading" | "error" | "loaded" | "idle";
    errorText?: string;
  }>({
    step: "idle",
  });

  useEffect(() => {
    const src = image?.src;

    if (!src || !isSupportedImageSrc(src)) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setState({ step: "idle" });
      return;
    }

    setState({
      step: loadedImageSrcSet.has(src) ? "loaded" : "loading",
    });
  }, [image?.src]);

  const handleImageError = () =>
    setState({
      step: "error",
      errorText: "Invalid image",
    });

  const handleImageLoad = () => {
    if (image?.src) loadedImageSrcSet.add(image.src);
    setState({ step: "loaded" });
  };

  return (
    <>
      {state.step !== "idle" && image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={IMAGE_SIZES}
          priority={priority}
          style={{
            objectFit: "cover",
            opacity: state.step !== "loaded" ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}

      {useAlternative &&
        (state.step === "error" ? (
          <ErrorComponent errorText={state.errorText} />
        ) : state.step === "loading" ? (
          <LoadingComponent />
        ) : null)}
    </>
  );
};

export default ImageCard;
