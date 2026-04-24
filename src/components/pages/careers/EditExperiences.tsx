import * as Styles from "./style.css";
import { useFormContext } from "react-hook-form";
import { ProfileFormInput } from "./career";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import { useModalStackStore } from "@stores/modalStackStore";

const CareerEditExperiences = () => {
  const { push } = useModalStackStore();
  const form = useFormContext<ProfileFormInput>();
  const { watch, setValue } = form;

  const experiences = watch("experiences");

  const handleAddExperience = () => {
    if (!experiences) return;
    push("EDIT_EXPERIENCE", {
      initial: "",
      applyExperience: (next: string) => {
        setValue("experiences", [...experiences, next]);
      },
    });
  };

  const handleEditExperience = (idx: number) => {
    if (!experiences) return;
    push("EDIT_EXPERIENCE", {
      initial: experiences[idx],
      applyExperience: (next: string) => {
        setValue(
          "experiences",
          experiences.map((e, i) => (i === idx ? next : e)),
        );
      },
      deleteExperience: () => {
        setValue(
          "experiences",
          experiences.filter((_, i) => i !== idx),
        );
      },
    });
  };

  return (
    <section className={Styles.ExperienceContainer}>
      <p className={Styles.ExperienceTitle}>Credentials</p>
      <div className={Styles.ExperienceContent}>
        {experiences?.map((experience, idx) => (
          <div key={`EXPERIENCE_${idx}`} className={Styles.EditExperienceItem}>
            <p>{experience}</p>
            <EditButton onClick={() => handleEditExperience(idx)} />
          </div>
        ))}
        <AddButton onClick={handleAddExperience} />
      </div>
    </section>
  );
};

export default CareerEditExperiences;
