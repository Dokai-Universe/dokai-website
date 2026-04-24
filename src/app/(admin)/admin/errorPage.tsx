"use client";

import dynamic from "next/dynamic";

const StatusPage = dynamic(() => import("@components/StatusPage/StatusPage"), {
  ssr: false,
});

const ErrorsMap = {
  "401": {
    code: 401,
    title: "Unauthorized",
    description: () => `You need to login to access this page.`,
  },
  "403": {
    code: 403,
    title: "Forbidden",
    description: () => `You are not authorized to access this page.`,
  },
  "404": {
    code: 404,
    title: "Not Found",
    description: () => `Can't find the page you're looking for.`,
  },
  "500": {
    code: 500,
    title: "Server Error",
    description: (reason?: string) =>
      `Error occurred while checking permissions (${reason || "unknown"})`,
  },
};

const ErrorPage = ({ code, reason }: { code: number; reason?: string }) => {
  const error = ErrorsMap[code.toString() as keyof typeof ErrorsMap];
  return (
    <StatusPage
      code={error?.code ?? 404}
      title={error?.title ?? "Not Found"}
      description={
        error?.description(reason) ?? "Can't find the page you're looking for."
      }
    />
  );
};

export default ErrorPage;
