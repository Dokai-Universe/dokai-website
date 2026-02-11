"use client";

import { AboutInfo } from "./fetch";
import AboutPageIntro from "./Intro";
import AboutPageManifesto from "./Manifesto";
import * as Styles from "./style.css";
import AboutPageServices from "./Services";
import AboutPageTeam from "./Team";
import AboutPageWorkflow from "./Workflow";
import MediaSlider from "@components/ui/Media/MediaSlider/MediaSlider";

type AboutPageClientProps = {
  aboutInfo: AboutInfo;
};

const AboutPageClient = ({ aboutInfo }: AboutPageClientProps) => {
  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <AboutPageIntro text={aboutInfo.intro} />
      <AboutPageManifesto manifesto={aboutInfo.manifesto} />
      <MediaSlider
        mediaList={[
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
        ]}
        className={Styles.ImageRight}
      />
      <AboutPageServices services={aboutInfo.services} />
      <MediaSlider
        mediaList={[
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
        ]}
        className={Styles.ImageLeft}
      />
      <AboutPageWorkflow workflow={aboutInfo.workflow} />
      <MediaSlider
        mediaList={[
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
          {
            type: "IMAGE",
            src: "/pantheon.png",
            alt: "pantheon",
          },
        ]}
        className={Styles.ImageRight}
      />
      <AboutPageTeam team={aboutInfo.team} />
    </div>
  );
};

export default AboutPageClient;
