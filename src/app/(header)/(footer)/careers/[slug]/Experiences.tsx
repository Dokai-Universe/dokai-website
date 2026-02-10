import * as Styles from "./style.css";

const CareerDetailExperiences = ({
  experiences,
}: {
  experiences: string[];
}) => {
  return (
    <div className={Styles.ExperiencesContainer}>
      <p className={Styles.ExperiencesTitle}>
        Experience <wbr />
        Credentials <wbr />
        Profile
      </p>
      <div className={Styles.ExperiencesList}>
        {experiences.map((experience, idx) => (
          <p key={`EXPERIENCES_${idx}`}>{experience}</p>
        ))}
      </div>
    </div>
  );
};

export default CareerDetailExperiences;
