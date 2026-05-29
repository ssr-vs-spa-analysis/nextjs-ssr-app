/** Canonical site origin for metadata, sitemap, and robots. */
export const getSiteUrl = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  return "http://localhost:3000";
};
