"use client";

import { Career } from "./fetch";
import * as Styles from "./style.css";
import Link from "next/link";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";

type CareersPageClientProps = {
  careers: Career[];
};

const careersCopy =
  "BUCK is always looking for dynamic, passionate, and talented artists to join our team.Below is a list of our current vacancies - if you don't see anything, check back again soon. If you don't see any positions that match your skills, feel free to send an email with a link to your work.";

const CareersPageClient = ({ careers }: CareersPageClientProps) => {
  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <p className={Styles.Title}>Careers</p>
      <p className={Styles.Copy}>{careersCopy}</p>
      <p className={Styles.Title}>Artists</p>
      <p className={Styles.Copy}>
        {
          "See what it's like to work at DOKAI through these Day in the Life staff profiles."
        }
      </p>
      <div className={Styles.ProfileContainer}>
        {careers.map((career, idx) => (
          <Link
            href={"/careers/" + career.profileId}
            className={Styles.ProfileItem}
            key={`CAREERS_${idx}`}
          >
            <MediaHoverOverlay
              media={career.media}
              className={Styles.ProfileItemImage}
            >
              <div className={Styles.ProfileItemOverlay}>
                <p>{career.role}</p>
                <p>{career.name}</p>
              </div>
            </MediaHoverOverlay>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CareersPageClient;
