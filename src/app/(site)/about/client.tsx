import ImageCard from "@components/ui/ImageCard";
import { AboutInfo } from "./fetch";
import AboutPageIntro from "./Intro";
import AboutPageManifesto from "./Manifesto";
import * as Styles from "./style.css";
import AboutPageServices from "./Services";
import AboutPageTeam from "./Team";
import AboutPageWorkflow from "./Workflow";

type AboutPageClientProps = {
  aboutInfo: AboutInfo;
};

const AboutPageClient = ({ aboutInfo }: AboutPageClientProps) => {
  return (
    <div className={Styles.Container}>
      <AboutPageIntro text={aboutInfo.intro} />
      <AboutPageManifesto manifesto={aboutInfo.manifesto} />
      <ImageCard
        className={Styles.ImageRight}
        src="/pantheon.png"
        alt="pantheon"
        type="IMAGE"
      />
      <AboutPageServices services={aboutInfo.services} />
      <ImageCard
        className={Styles.ImageLeft}
        src="/pantheon.png"
        alt="pantheon"
        type="IMAGE"
      />
      <AboutPageWorkflow workflow={aboutInfo.workflow} />
      <ImageCard
        className={Styles.ImageRight}
        src="/pantheon.png"
        alt="pantheon"
        type="IMAGE"
      />
      <AboutPageTeam team={aboutInfo.team} />
    </div>
  );
};

export default AboutPageClient;
