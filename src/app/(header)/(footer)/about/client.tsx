import { AboutInfo } from "./fetch";
import AboutPageIntro from "./Intro";
import AboutPageManifesto from "./Manifesto";
import * as Styles from "./style.css";
import AboutPageServices from "./Services";
import AboutPageTeam from "./Team";
import AboutPageWorkflow from "./Workflow";
import MediaCard from "@components/ui/Media/MediaCard";

type AboutPageClientProps = {
  aboutInfo: AboutInfo;
};

const AboutPageClient = ({ aboutInfo }: AboutPageClientProps) => {
  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <AboutPageIntro text={aboutInfo.intro} />
      <AboutPageManifesto manifesto={aboutInfo.manifesto} />
      <MediaCard
        media={{
          type: "IMAGE",
          src: "/pantheon.png",
          alt: "pantheon",
        }}
        className={Styles.ImageRight}
      />
      <AboutPageServices services={aboutInfo.services} />
      <MediaCard
        media={{
          type: "IMAGE",
          src: "/pantheon.png",
          alt: "pantheon",
        }}
        className={Styles.ImageLeft}
      />
      <AboutPageWorkflow workflow={aboutInfo.workflow} />
      <MediaCard
        media={{
          type: "IMAGE",
          src: "/pantheon.png",
          alt: "pantheon",
        }}
        className={Styles.ImageRight}
      />
      <AboutPageTeam team={aboutInfo.team} />
    </div>
  );
};

export default AboutPageClient;
