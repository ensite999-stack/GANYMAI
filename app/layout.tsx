import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Ganymai",
  title: { default: "Ganymai — Every goal has a story", template: "%s — Ganymai" },
  description: "A challenge-driven story platform. Start a goal, document the journey, and follow how it unfolds.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Ganymai" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f4ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="shell">{children}</main>
      </body>
    </html>
  );
}
