import { ProfileDetail } from "@domain/careers";
import * as Styles from "./style.css";

const CareerDetailInfo = ({
  profile,
  setProfile,
  emailEditable,
  isPublic,
  togglePublic,
}: {
  profile: ProfileDetail;
  setProfile: (profile: ProfileDetail) => void;
  emailEditable: boolean;
  isPublic: boolean;
  togglePublic: () => void;
}) => {
  return (
    <div
      style={{
        gridColumn: "2 / span 3",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div className={Styles.InputContainer}>
        <label htmlFor="email" className={Styles.InputTitle}>
          Email
        </label>
        <input
          type="text"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          disabled={!emailEditable}
          className={Styles.Input}
        />
      </div>
      <div className={Styles.InputContainer}>
        <label htmlFor="name" className={Styles.InputTitle}>
          Name
        </label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className={Styles.Input}
        />
      </div>
      <div className={Styles.InputContainer}>
        <label htmlFor="role" className={Styles.InputTitle}>
          Role
        </label>
        <input
          type="text"
          value={profile.role}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          className={Styles.Input}
        />
      </div>
      <label className={Styles.ToggleRow}>
        <div className={Styles.ToggleText}>
          <p className={Styles.ToggleTitle}>Public</p>
          <p className={Styles.ToggleDesc}>
            Publish this page so anyone can view it.
          </p>
        </div>

        <div className={Styles.ToggleWrapper} data-on={isPublic}>
          <button
            type="button"
            className={Styles.Toggle}
            aria-pressed={isPublic}
            onClick={togglePublic}
          >
            <span className={Styles.Knob} />
          </button>
        </div>
      </label>
    </div>
  );
};

export default CareerDetailInfo;
