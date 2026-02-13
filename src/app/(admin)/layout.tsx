import LogoutButton from "@components/ui/LogoutButton/LogoutButton";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LogoutButton />
      {children}
    </>
  );
};

export default AdminLayout;
