"use client";

import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

function isDevEnabled() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_ENABLE_SWAGGER === "true"
  );
}

export default function DocsPage() {
  if (!isDevEnabled()) {
    return <div style={{ padding: 16 }}>Not Found</div>;
  }

  return <SwaggerUI url="/api/openapi.json" />;
}
