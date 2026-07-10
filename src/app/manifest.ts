import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.thesis}`,
    short_name: "McNamer",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A1626",
    theme_color: "#0A1626",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
