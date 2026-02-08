import Footer from "@components/layout/Footer/Footer";
import Header from "@components/layout/Header/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout;
