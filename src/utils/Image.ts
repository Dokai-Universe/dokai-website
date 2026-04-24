export const validateImage = (url: string, timeoutMs = 6000) => {
  return new Promise<void>((resolve, reject) => {
    if (!url) return reject(new Error("empty url"));

    const img = new window.Image();
    const cleanup = () => {
      clearTimeout(timer);
      img.onload = null;
      img.onerror = null;
    };

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, timeoutMs);

    img.onload = () => {
      cleanup();
      resolve();
    };
    img.onerror = () => {
      cleanup();
      reject(new Error("load failed"));
    };

    const isHttp = /^https?:\/\//i.test(url);
    const src = isHttp
      ? `${url}${url.includes("?") ? "&" : "?"}__t=${Date.now()}`
      : url;

    img.src = src;
  });
};
