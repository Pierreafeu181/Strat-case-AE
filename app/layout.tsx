import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import Banner from "@/components/Banner";
import "./globals.css";

// Display serif: only the certificate of origin and the grade letters.
const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Geometric sans for everything else (close to the brand's own sans).
const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
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
