import { Project } from "@domain/careers";
import * as Styles from "./style.css";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";

const ProjectModalView = ({ project }: { project: Project }) => {
  return (
    <div className={Styles.Container}>
      <p className={Styles.Title}>{project?.title}</p>
      <div className={Styles.Content}>
        {project?.contents?.map((item) => (
          <div key={item.name} className={Styles.ContentItem}>
            <p className={Styles.ContentItemName}>{item.name}</p>
            {item.type === "TEXT" ? (
              <div
                className={`${Styles.ContentItemText} rich-text`}
                dangerouslySetInnerHTML={{ __html: item.value }}
              />
            ) : (
              <ul className={Styles.ContentItemList}>
                {item.value.map((value, index) => (
                  <li key={index} className={Styles.ContentItemListItem}>
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className={Styles.MediaContainer}>
        {project?.medias?.map((media, index) => (
          <MediaCard
            key={`CAREER_WORK_MEDIA_${index}`}
            media={media}
            className={Styles.Media}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectModalView;
