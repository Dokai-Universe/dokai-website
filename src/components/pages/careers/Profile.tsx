import MediaCard from "@components/ui/Media/MediaCard/MediaCard";

import Link from "next/link";
import * as Styles from "./style.css";
import { Profile } from "@domain/careers";
import ContactIcon from "./ContactIcon";

const CareerProfile = ({ profile }: { profile: Profile }) => {
  return (
    <div className={Styles.ProfileContainer}>
      <MediaCard
        media={profile.avatar!}
        className={Styles.ProfileMedia}
        priority
      />
      <div
        dangerouslySetInnerHTML={{ __html: profile.bio }}
        className={`${Styles.ProfileBio} rich-text`}
      />
      <div className={Styles.ProfileContactContainer}>
        {profile.contacts.map((contact) => (
          <div
            key={`CONTACT_${contact.name}`}
            className={Styles.ProfileContactItem}
          >
            <div className={Styles.ProfileContactLabelContainer}>
              <ContactIcon
                type={contact.name}
                className={Styles.ProfileContactLabelIcon}
              />
              <p className={Styles.ProfileContactLabel}>{contact.name}</p>
            </div>
            <Link href={contact.href} className={Styles.ProfileContactValue}>
              {contact.value}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerProfile;
