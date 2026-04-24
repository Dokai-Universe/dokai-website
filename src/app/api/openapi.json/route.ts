import { NextResponse } from "next/server";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { schemas } from "@server/schemas";

function isDevEnabled() {
  return process.env.NODE_ENV !== "production";
}

function pathDepth(p: string) {
  return p.split("?")[0].split("/").filter(Boolean).length;
}

const methodOrder: Record<string, number> = {
  get: 0,
  post: 1,
  put: 2,
  patch: 3,
  delete: 4,
  options: 5,
  head: 6,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortOpenApiPaths(spec: any) {
  if (!spec?.paths) return spec;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entries = Object.entries(spec.paths) as Array<[string, any]>;

  entries.sort(([a], [b]) => {
    const da = pathDepth(a);
    const db = pathDepth(b);
    if (da !== db) return da - db;
    return a.localeCompare(b);
  });

  const nextPaths: Record<string, unknown> = {};
  for (const [path, ops] of entries) {
    // method 순서 정렬 (GET -> POST -> PUT -> PATCH -> DELETE)
    const opEntries = Object.entries(ops) as Array<[string, unknown]>;
    opEntries.sort(
      ([ma], [mb]) => (methodOrder[ma] ?? 99) - (methodOrder[mb] ?? 99),
    );

    nextPaths[path] = Object.fromEntries(opEntries);
  }

  spec.paths = nextPaths;
  return spec;
}

export async function GET() {
  if (!isDevEnabled()) return new NextResponse("Not Found", { status: 404 });

  const spec = swaggerJSDoc({
    definition: {
      openapi: "3.0.3",
      info: { title: "DOKAI API (Dev)", version: "0.1.0" },
      servers: [{ url: "/" }],
      tags: [{ name: "Works" }, { name: "About" }, { name: "Careers" }],
      components: { schemas },
    },

    apis: [path.join(process.cwd(), "src", "app", "api", "**", "route.ts")],
  });

  return NextResponse.json(sortOpenApiPaths(spec));
}
