import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google";
import Banner from "@/components/Banner";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Fixed-width only for the serial and the passport's coded line.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shoe Passport · concept prototype",
  description:
    "Concept prototype by ESSEC Team 4. Not an Allen Edmonds service. No data collected.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1f1a17",
};

// Runs before first paint: picks the tab from the URL hash so a deep link
// (#trade, #buyer) never flashes the story tab first.
const tabFromHash = `(function(){try{var h=location.hash.slice(1).split('?')[0];document.documentElement.dataset.tab=['story','trade','buyer'].indexOf(h)>-1?h:'story'}catch(e){document.documentElement.dataset.tab='story'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: tabFromHash }} />
      </head>
      <body>
        <Banner />
        {children}
      </body>
    </html>
  );
}
