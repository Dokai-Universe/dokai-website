"use client";

import dynamic from "next/dynamic";

const StatusPage = dynamic(() => import("@components/StatusPage/StatusPage"), {
  ssr: false,
});

export default function NotFound() {
  return (
    <StatusPage
      code={404}
      title="Not Found"
      description="Can't find the page you're looking for."
    />
  );
}
