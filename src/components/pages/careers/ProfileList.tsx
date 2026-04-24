import { ProfileListItem } from "@domain/careers";
import * as Styles from "./style.css";
import Link from "next/link";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";

const CareersPageProfileList = ({
  profiles,
}: {
  profiles: ProfileListItem[];
}) => {
  return (
    <div className={Styles.ProfileListContainer}>
      {profiles.map((profile) => (
        <Link
          href={`/careers/${encodeURIComponent(profile.email)}`}
          className={Styles.ProfileListItem}
          key={`CAREERS_${profile.email}`}
        >
          <MediaHoverOverlay
            media={profile.avatar}
            className={Styles.ProfileListItemImage}
          >
            <div className={Styles.ProfileListItemOverlay}>
              <p>{profile.role}</p>
              <p>{profile.name}</p>
            </div>
          </MediaHoverOverlay>
        </Link>
      ))}
    </div>
  );
};

export default CareersPageProfileList;
