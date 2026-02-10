import { Services } from "./fetch";
import * as Styles from "./style.css";

type AboutPageServicesProps = {
  services: Services;
};

const AboutPageServices = ({ services }: AboutPageServicesProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentTitle}>Services</p>
      <p className={Styles.ContentText}>{services.text}</p>
      <div className={Styles.ServicesQuadrant}>
        {services.quadrant.map((quadrant) => (
          <div
            key={`ABOUT_SERVICES_${quadrant.name}`}
            className={Styles.ServicesQuadrantItem}
          >
            <p className={Styles.ServicesQuadrantTitle}>{quadrant.name}</p>
            <ul className={Styles.ServicesQuadrantList}>
              {quadrant.values.map((value, idx) => (
                <li key={`ABOUT_SERVICES_${quadrant.name}_${idx}`}>{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPageServices;
