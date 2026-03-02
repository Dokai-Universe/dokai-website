import Header from "@components/layout/Header/Header";
import { Suspense } from "react";

const HeaderLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
    </>
  );
};

export default HeaderLayout;
