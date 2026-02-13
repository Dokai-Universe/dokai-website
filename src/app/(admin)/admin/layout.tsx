import StatusPage from "@components/StatusPage/StatusPage";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const guard = h.get("x-admin-guard") ?? "ok";
  const reason = h.get("x-admin-guard-reason") ?? "";

  if (guard === "unauthorized") {
    return (
      <StatusPage
        code={401}
        title="Unauthorized"
        description="로그인이 필요합니다."
      />
    );
  }

  if (guard === "forbidden") {
    return (
      <StatusPage
        code={403}
        title="Forbidden"
        description="관리자 권한이 없습니다."
      />
    );
  }

  if (guard === "error") {
    return (
      <StatusPage
        code={500}
        title="Server Error"
        description={`권한 확인 중 오류가 발생했습니다. (${reason || "unknown"})`}
      />
    );
  }

  return <>{children}</>;
}
