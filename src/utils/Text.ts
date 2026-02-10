export const toTitleCase = (text: string) =>
  text.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());

export const normalize = (s: string) => s.trim();
