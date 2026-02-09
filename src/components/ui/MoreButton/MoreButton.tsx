import PlusSVG from "@assets/icons/plus.svg";
import { vars } from "@styles/theme.css";

const MoreButton = () => {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          display: "flex",
          border: "1.5px solid black",
          borderRadius: "999px",
          padding: "0.5rem 1rem",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: vars.fontSize.sm,
          }}
        >
          More
        </p>
        <PlusSVG
          style={{
            stroke: "black",
            width: "1.5rem",
            height: "1.5rem",
          }}
        />
      </button>
    </div>
  );
};

export default MoreButton;
