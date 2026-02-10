import * as Styles from "./style.css";
import MainWorks from "./MainWorks";

export default function Home() {
  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <p className={Styles.Title}>
        DOKAI was founded by professionals from the commercial film industry as
        an AI-driven creative group.
      </p>
      <MainWorks />
    </div>
  );
}
