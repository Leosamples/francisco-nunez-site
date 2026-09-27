import type { Metadata } from "next";
import { archivo, fraunces } from "@/lib/fonts";
import { site } from "@/content/site";
import { MotionProvider } from "@/components/site/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${fraunces.variable} antialiased`}>
      <body className="min-h-svh bg-ink text-paper">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
