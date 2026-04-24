import { News } from "@domain/news";
import * as Styles from "./style.css";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import NewsExternalLink from "./ExternalLink";

const NewsBody = ({ news }: { news: News }) => {
  return (
    <div className={Styles.Body}>
      <p className={Styles.BodyTitle}>{news.title}</p>
      <div className={Styles.BodyContent}>
        {news.chapters.map((chapter) => (
          <div key={chapter.title} className={Styles.BodyChapter}>
            <p className={Styles.BodyChapterTitle}>{chapter.title}</p>
            <div className={Styles.BodyChapterContent}>
              {chapter.contents.map((content, i) =>
                content.type === "TEXT" ? (
                  <div
                    key={i}
                    className={Styles.BodyChapterContentText}
                    dangerouslySetInnerHTML={{
                      __html: content.text ?? "",
                    }}
                  />
                ) : (
                  <div
                    key={i}
                    className={Styles.BodyChapterContentMediaContainer}
                  >
                    <MediaCard
                      media={content.media}
                      className={Styles.BodyChapterContentMedia}
                    />
                    <p className={Styles.BodyChapterContentMediaCaption}>
                      {content.media?.alt}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <NewsExternalLink url={news.externalUrl} />
    </div>
  );
};

export default NewsBody;
