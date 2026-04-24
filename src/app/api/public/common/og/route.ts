import { NextResponse } from "next/server";
import urlMetadata from "url-metadata";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "missing url" }, { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol))
      throw new Error("bad protocol");
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const res: urlMetadata.Result = await urlMetadata(url, {
      cache: "force-cache",
      requestHeaders: {
        "User-Agent": "Googlebot",
      },
    });

    const title = res["og:title"] || res["twitter:title"] || res["title"];
    const description =
      res["og:description"] || res["twitter:description"] || res["description"];
    const image = res["og:image"] || res["twitter:image"] || res["image"];
    const canonical = res["og:url"] || res["url"] || parsed.toString();

    return NextResponse.json({
      title,
      description,
      image,
      url: canonical,
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}
