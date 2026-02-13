"use client";

import dynamic from "next/dynamic";
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerClient() {
  return (
    <SwaggerUI
      url="/api/openapi.json"
      docExpansion="list"
      defaultModelsExpandDepth={64}
      defaultModelExpandDepth={64}
    />
  );
}
