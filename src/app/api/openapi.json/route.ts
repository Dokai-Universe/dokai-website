import { NextResponse } from "next/server";
import swaggerJSDoc from "swagger-jsdoc";

function assertDev() {
  // production에서는 아예 막기
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  // 추가로 완전 확실히 끄고 싶으면 env 플래그 사용
  if (process.env.NEXT_PUBLIC_ENABLE_SWAGGER !== "true") {
    return false;
  }
  return true;
}

export async function GET() {
  if (!assertDev()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const spec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: { title: "DOKAI API (Dev)", version: "0.1.0" },
    },
    // JSDoc 주석을 스캔할 파일들
    apis: ["./src/app/api/**/route.ts"],
  });

  return NextResponse.json(spec);
}
