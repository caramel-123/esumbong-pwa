import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "eSumbong — Civic Empowerment Portal",
    short_name: "eSumbong",
    description:
      "Verify if a public infrastructure project is really as complete as officially claimed.",
    start_url: "/home",
    display: "standalone",
    background_color: "#faf8ff",
    theme_color: "#013ed0",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
