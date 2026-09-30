import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { AppDataProvider } from "@/lib/useAppData";
import { NotificationScheduler } from "@/components/NotificationScheduler";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { TopNavLinks, BottomNavLinks } from "@/components/nav/NavLinks";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/brujula" : "";

export const metadata: Metadata = {
  title: "Brújula",
  description: "Una frase para cada momento del día: Biblia, estoicos, mafia y cine.",
  icons: {
    icon: `${basePath}/icon-192.png`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f59e0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 pb-20 text-white antialiased sm:pb-0">
        <AppDataProvider>
          <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
            <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <span>🧭</span> Brújula
              </Link>
              <TopNavLinks />
            </div>
          </header>

          <div className="mx-auto max-w-3xl px-4 py-6">{children}</div>

          <BottomNavLinks />
          <NotificationScheduler />
          <ServiceWorkerRegister />
        </AppDataProvider>
      </body>
    </html>
  );
}
