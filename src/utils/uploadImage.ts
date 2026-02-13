async function sha256Hex(file: File) {
  const buf = await file.arrayBuffer();
  const hashBuf = await crypto.subtle.digest("SHA-256", buf);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const uploadImage = async (file: File) => {
  const hash = await sha256Hex(file);

  const res = await fetch("/api/public/uploads/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hash,
      mime: file.type,
      size: file.size,
      folder: "images/asd/asd",
    }),
  });

  const presign = await res.json();

  if (presign.error) throw new Error(presign.error);

  if (presign.exists) {
    return {
      key: presign.key as string,
      url: presign.finalUrl as string,
      deduped: true,
    };
  }

  const putRes = await fetch(presign.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!putRes.ok) throw new Error("Upload failed");

  return {
    key: presign.key as string,
    url: presign.finalUrl as string,
    deduped: false,
  };
};
