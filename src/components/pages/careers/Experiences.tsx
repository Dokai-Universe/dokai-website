import * as Styles from "./style.css";

const CareerExperiences = ({ experiences }: { experiences: string[] }) => {
  if (!experiences.length) return null;

  return (
    <div className={Styles.ExperienceContainer}>
      <p className={Styles.ExperienceTitle}>Credentials</p>
      <div className={Styles.ExperienceContent}>
        {experiences.map((experience, idx) => (
          <p key={`EXPERIENCE_${idx}`} className={Styles.ExperienceItem}>
            {experience}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CareerExperiences;
