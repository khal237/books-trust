export const ORDER = [
  "/",
  "/letter",
  "/affirmations",
  "/messages",
  "/italy",
  "/favorites",
  "/promise",
  "/final",
] as const;

export type PourPath = (typeof ORDER)[number];

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function nextPath(current: string): PourPath {
  const i = ORDER.indexOf(current as PourPath);
  if (i === -1 || i === ORDER.length - 1) return ORDER[0];
  return ORDER[i + 1];
}

export function indexOf(current: string): number {
  const i = ORDER.indexOf(current as PourPath);
  return i === -1 ? 0 : i;
}
