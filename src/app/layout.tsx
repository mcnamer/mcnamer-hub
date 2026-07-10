import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { baseMetadata } from "@/lib/seo/metadata";
import { personSchema, websiteSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SurfaceProvider } from "@/components/motion/surface-provider";
import { PointerLight } from "@/components/motion/pointer-light";
import { NavigationShell } from "@/components/navigation/navigation-shell";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#0A1626",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="antialiased">
        {/* The knowledge graph — Person + WebSite entities, in the initial HTML. */}
        <JsonLd data={[personSchema(), websiteSchema()]} />

        {/* Skip link, styled as a first-class citizen. */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <MotionProvider>
          <SurfaceProvider>
            <PointerLight />
            <NavigationShell />
            <main id="main">{children}</main>
            <Footer />
          </SurfaceProvider>
        </MotionProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
