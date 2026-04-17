import { fetchOgData } from "@controllers/og/fetch";
import { useQuery } from "@tanstack/react-query";
import * as Styles from "./style.css";

const NewsExternalLink = ({ url }: { url: string }) => {
  const { data } = useQuery({
    queryKey: ["news-detail-og", url],
    queryFn: () => fetchOgData(url),
  });

  const hostname = new URL(url).hostname;
  const iconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className={Styles.ExternalLinkContainer} onClick={handleClick}>
      <div className={Styles.ExternalLinkContent}>
        <p className={Styles.ExternalLinkContentTitle}>{data?.title}</p>
        <p className={Styles.ExternalLinkContentDescription}>
          {data?.description}
        </p>
        <div className={Styles.ExternalLinkContentFooter}>
          <img
            src={iconUrl}
            alt={data?.title}
            className={Styles.ExternalLinkContentFooterIcon}
          />
          <p className={Styles.ExternalLinkContentFooterUrl}>{url}</p>
        </div>
      </div>

      <img
        src={data?.image}
        alt={data?.title}
        className={Styles.ExternalLinkImage}
      />
    </div>
  );
};

export default NewsExternalLink;
