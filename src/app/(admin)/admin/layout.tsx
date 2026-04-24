import { headers } from "next/headers";
import ErrorPage from "./errorPage";
import AdminHeader from "@components/layout/AdminHeader/Header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const guard = h.get("x-admin-guard") ?? "ok";
  const reason = h.get("x-admin-guard-reason") ?? "";

  if (guard === "unauthorized") {
    return <ErrorPage code={401} reason={reason} />;
  }

  if (guard === "forbidden") {
    return <ErrorPage code={403} reason={reason} />;
  }

  if (guard === "error") {
    return <ErrorPage code={500} reason={reason} />;
  }

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
