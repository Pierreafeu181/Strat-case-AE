import Link from "next/link";
import { DEMO_SERIAL } from "@/lib/pairs";

export default function NotFound() {
  return (
    <main className="shell notfound">
      <p className="eyebrow">Shoe passport</p>
      <h1 className="h1">No passport for this serial</h1>
      <p className="muted">Check the serial on the tag, or open the demo pair.</p>
      <Link className="btn btn-primary" href={`/p/${DEMO_SERIAL}`}>
        Open demo passport
      </Link>
    </main>
  );
}
