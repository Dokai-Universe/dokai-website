import Footer from "@components/layout/Footer/Footer";

const FooterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default FooterLayout;
