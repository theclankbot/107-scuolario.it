import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Scuolario | Trova scuole in Italia per città, provincia e tipologia",
    template: "%s | Scuolario",
  },
  description:
    "Trova e confronta scuole in Italia per città, provincia e tipologia con dati ufficiali da Scuola in Chiaro / MIM. Nessuna classifica inventata.",
  metadataBase: new URL("https://scuolario.it"),
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Scuolario",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it-IT" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-bg text-text`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
