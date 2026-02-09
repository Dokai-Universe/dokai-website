import AboutPageClient from "./client";
import { fetchAbout } from "./fetch";

const AboutPage = async () => {
  const aboutInfo = await fetchAbout();

  return <AboutPageClient aboutInfo={aboutInfo} />;
};

export default AboutPage;
