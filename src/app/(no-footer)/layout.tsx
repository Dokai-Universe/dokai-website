import Header from "@components/layout/Header/Header";

const NoFooterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default NoFooterLayout;
