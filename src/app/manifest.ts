import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/brujula" : "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brújula",
    short_name: "Brújula",
    description: "Una frase para cada momento del día, solo para ti.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#020617",
    theme_color: "#f59e0b",
    icons: [
      { src: `${basePath}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${basePath}/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}
