import { fetchOgData } from "@controllers/og/fetch";
import { useQuery } from "@tanstack/react-query";
import * as Styles from "./style.css";
import Image from "next/image";
import { useMemo } from "react";

const NewsExternalLink = ({ url }: { url?: string }) => {
  const { data } = useQuery({
    queryKey: ["news-detail-og", url],
    queryFn: () => fetchOgData(url!),
    enabled: !!url,
  });

  const iconUrl = useMemo(() => {
    if (!url) return "";

    const hostname = new URL(url).hostname;
    const iconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    return iconUrl;
  }, [url]);

  const handleClick = () => {
    window.open(url, "_blank");
  };

  if (!url) return null;

  return (
    <div className={Styles.ExternalLinkContainer} onClick={handleClick}>
      <div className={Styles.ExternalLinkContent}>
        <p className={Styles.ExternalLinkContentTitle}>{data?.title}</p>
        <p className={Styles.ExternalLinkContentDescription}>
          {data?.description}
        </p>
        <div className={Styles.ExternalLinkContentFooter}>
          <div className={Styles.ExternalLinkContentFooterIconContainer}>
            {iconUrl && (
              <Image
                src={iconUrl}
                alt={data?.title || "icon"}
                className={Styles.ExternalLinkContentFooterIcon}
                fill
              />
            )}
          </div>

          <p className={Styles.ExternalLinkContentFooterUrl}>{url}</p>
        </div>
      </div>

      <div className={Styles.ExternalLinkImageContainer}>
        {data?.image && (
          <Image
            src={data.image}
            alt={data?.title || "image"}
            className={Styles.ExternalLinkImage}
            fill
          />
        )}
      </div>
    </div>
  );
};

export default NewsExternalLink;
