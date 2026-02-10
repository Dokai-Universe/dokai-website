import { Profile } from "./fetch";
import ImageCard from "@components/ui/ImageCard";
import * as Styles from "./style.css";
import { Fragment } from "react/jsx-runtime";

const CareerDetailProfile = ({ profile }: { profile: Profile }) => {
  return (
    <div className={Styles.ProfileContainer}>
      <ImageCard
        className={Styles.ProfileImage}
        src={profile.media.src}
        alt={profile.media.alt}
        type={profile.media.type}
        loop={profile.media.type === "LOOP" ? profile.media.loop : undefined}
      />

      <p className={Styles.ProfileIntroduce}>{profile.introduce}</p>

      <div className={Styles.ProfileContactGrid}>
        {profile.contact.map((contact, idx) => (
          <Fragment key={`CAREERS_DETAIL_${idx}`}>
            <span className={Styles.ProfileContactName}>{contact.name}</span>
            <span className={Styles.ProfileContactValue}>{contact.value}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CareerDetailProfile;
