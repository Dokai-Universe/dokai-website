import { CareersDetail } from "./fetch";
import CareerDetailProfile from "./Profile";
import * as Styles from "./style.css";
import CareerDetailWorks from "./Works";
import CareerDetailExperiences from "./Experiences";

const CareersDetailPageClient = ({
  careersDetailInfo,
}: {
  careersDetailInfo: CareersDetail;
}) => {
  return (
    <div className={Styles.Container}>
      <CareerDetailProfile profile={careersDetailInfo.profile} />
      <CareerDetailWorks works={careersDetailInfo.works} />
      <CareerDetailExperiences experiences={careersDetailInfo.experiences} />
    </div>
  );
};

export default CareersDetailPageClient;
