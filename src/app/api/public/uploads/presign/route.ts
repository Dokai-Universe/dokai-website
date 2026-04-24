import { NextResponse } from "next/server";
import {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!, // https://<ACCOUNT_ID>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

function safeExt(mime: string) {
  if (mime === "image/png") return "png";
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return null;
}

function isSha256Hex(s: unknown) {
  return typeof s === "string" && /^[a-f0-9]{64}$/i.test(s);
}

export async function POST(req: Request) {
  const { hash, mime, size, folder } = await req.json();

  const ext = safeExt(mime);
  if (!ext)
    return NextResponse.json({ error: "Unsupported mime" }, { status: 400 });
  if (!isSha256Hex(hash))
    return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
  if (typeof size !== "number" || size > 32 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const key = `${folder ?? "images"}/${hash}.${ext}`;
  const Bucket = process.env.R2_BUCKET!;
  const finalUrl = `${process.env.R2_BASE_URL}/${key}`;

  // 1) 이미 있으면 업로드 스킵
  try {
    await R2.send(new HeadObjectCommand({ Bucket, Key: key }));
    return NextResponse.json({ exists: true, key, finalUrl });
  } catch {
    // HeadObjectCommand는 없으면 에러가 나는데, 여기선 "없음"으로 처리
  }

  // 2) 없으면 presigned PUT 발급
  const cmd = new PutObjectCommand({
    Bucket,
    Key: key,
    ContentType: mime,
    // CacheControl: "public, max-age=31536000, immutable", // 필요하면
  });

  const uploadUrl = await getSignedUrl(R2, cmd, { expiresIn: 60 });

  return NextResponse.json({ exists: false, key, finalUrl, uploadUrl });
}
