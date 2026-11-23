import { DEMO_SERIAL } from "@/lib/pairs";

// On Vercel/local, next.config.ts redirects "/" before this page is reached.
// On GitHub Pages (static export) there are no server redirects, so this page
// forwards to the demo pair itself (meta refresh + script that keeps the #tab).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const trailing = base ? "/" : "";
const target = `${base}/p/${DEMO_SERIAL}${trailing}`;

export default function Home() {
  return (
    <main className="shell notfound">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <script
        dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(target)} + location.hash);` }}
      />
      <p className="eyebrow">Shoe passport</p>
      <h1 className="h1">Opening the demo pair…</h1>
      <a className="btn btn-primary" href={target}>
        Open demo passport
      </a>
    </main>
  );
}
