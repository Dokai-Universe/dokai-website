import { Profile } from "./fetch";
import * as Styles from "./style.css";
import { Fragment } from "react/jsx-runtime";
import MediaCard from "@components/ui/Media/MediaCard";
import Link from "next/link";

const CareerDetailProfile = ({ profile }: { profile: Profile }) => {
  return (
    <div className={Styles.ProfileContainer}>
      <MediaCard media={profile.media} className={Styles.ProfileImage} />

      <p className={Styles.ProfileIntroduce}>{profile.introduce}</p>

      <div className={Styles.ProfileContactGrid}>
        {profile.contact.map((contact, idx) => (
          <Fragment key={`CAREERS_DETAIL_${idx}`}>
            <span className={Styles.ProfileContactName}>{contact.name}</span>
            <Link href={contact.href} className={Styles.ProfileContactValue}>
              {contact.value}
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CareerDetailProfile;
