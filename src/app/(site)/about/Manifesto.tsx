import * as Styles from "./style.css";
import { Manifesto } from "./fetch";

type AboutPageManifestoProps = {
  manifesto: Manifesto;
};

const AboutPageManifesto = ({ manifesto }: AboutPageManifestoProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentTitle}>Manifesto</p>
      <p className={Styles.ContentText}>{manifesto.text}</p>
    </div>
  );
};

export default AboutPageManifesto;
