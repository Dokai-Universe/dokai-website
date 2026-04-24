import Footer from "@components/layout/Footer/Footer";

const FooterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default FooterLayout;
