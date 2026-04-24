export const decodeEmailParam = (email: string) =>
  decodeURIComponent(email).toLowerCase();

export const encodeEmailParam = (email: string) =>
  encodeURIComponent(email.toLowerCase());
