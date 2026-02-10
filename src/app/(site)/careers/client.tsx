"use client";

import { Career } from "./fetch";
import ImageCard from "@components/ui/ImageCard";
import * as Styles from "./style.css";
import { getReadableTextColor } from "@utils/Color";
import Link from "next/link";

type CareersPageClientProps = {
  careers: Career[];
};

const careersCopy =
  "BUCK is always looking for dynamic, passionate, and talented artists to join our team.Below is a list of our current vacancies - if you don't see anything, check back again soon. If you don't see any positions that match your skills, feel free to send an email with a link to your work.";

const CareersPageClient = ({ careers }: CareersPageClientProps) => {
  return (
    <div className={Styles.Container}>
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
            <ImageCard
              src={career.media.src}
              alt={career.media.alt}
              type={career.media.type}
              loop={
                career.media.type === "LOOP" ? career.media.loop : undefined
              }
              className={Styles.ProfileItemImage}
            />
            <div
              className={Styles.ProfileItemOverlay}
              style={
                {
                  "--bg-color": career.bgColor,
                  "--fg-color": getReadableTextColor(career.bgColor),
                } as React.CSSProperties
              }
            >
              <p>{career.role}</p>
              <p>{career.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CareersPageClient;
