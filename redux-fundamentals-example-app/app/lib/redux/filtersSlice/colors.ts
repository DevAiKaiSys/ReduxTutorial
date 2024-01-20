export const availableColors = ["green", "blue", "orange", "purple", "red"];

export const capitalize = (s: AvailableColor) =>
  s[0].toUpperCase() + s.slice(1);

/* Types */
export type AvailableColor = (typeof availableColors)[number];
