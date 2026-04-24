import { notFound } from "next/navigation";
import SwaggerClient from "./swagger-client";

export default function DocsPage() {
  const enabled =
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_ENABLE_SWAGGER === "true";

  if (!enabled) notFound();

  return <SwaggerClient />;
}
