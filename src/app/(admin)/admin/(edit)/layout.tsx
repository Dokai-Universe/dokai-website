import Footer from "@components/layout/Footer/Footer";
import Header from "@components/layout/Header/Header";
import * as Styles from "./style.css";

const AdminEditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={Styles.FakeLayout}>
        <Header />
      </div>
      <div className={Styles.Content}>{children}</div>
      <div className={Styles.FakeLayout}>
        <Footer />
      </div>
    </>
  );
};

export default AdminEditLayout;
