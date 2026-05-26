export const splitCommaSeparated = (
  raw: string | null | undefined
): string[] =>
  raw
    ? raw
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    : [];
