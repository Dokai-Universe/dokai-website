import { NextResponse } from "next/server";

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is alive
 */
export async function GET() {
  return NextResponse.json({ ok: true, ts: Date.now() });
}
