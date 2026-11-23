import type { Pair } from "@/lib/pairs";

type Stamp = { top: string; word: string; sub: string; kind: "done" | "recraft" | "empty" };

/**
 * The passport's visa page: one stamp per milestone, then one box per possible
 * recraft (filled when used, dashed when still available).
 */
export default function Visas({ pair }: { pair: Pair }) {
  const find = (prefix: string) => pair.timeline.find((e) => e.title.startsWith(prefix));
  const leather = find("Leather");
  const welted = find("Goodyear");
  const sold = find("Sold");
  const recrafts = pair.timeline.filter((e) => e.title.startsWith("Recrafted"));

  const stamps: Stamp[] = [];
  if (leather) stamps.push({ top: leather.date, word: "Leather", sub: leather.place.replace(/^Tannery lot\s*/i, ""), kind: "done" });
  if (welted) stamps.push({ top: welted.date, word: "Welted", sub: `${pair.handSteps} steps`, kind: "done" });
  if (sold) stamps.push({ top: sold.date, word: "Sold", sub: `Owner ${pair.owners}`, kind: "done" });
  for (let i = 0; i < pair.recraftsMax; i++) {
    const r = recrafts[i];
    stamps.push(
      r
        ? { top: r.date, word: "Recraft", sub: `No. ${i + 1}`, kind: "recraft" }
        : { top: "Recraft", word: String(i + 1), sub: "available", kind: "empty" },
    );
  }

  return (
    <section className="visas" aria-labelledby="visas-title">
      <div className="visas-head">
        <h2 id="visas-title" className="visas-title">Visas</h2>
        <span className="num">
          {pair.recraftsUsed} of ~{pair.recraftsMax} recrafts used
        </span>
      </div>
      <ol className="visas-grid">
        {stamps.map((s, i) => (
          <li key={i} className={`visa visa-${s.kind}`}>
            <span className="visa-top">{s.top}</span>
            <span className="visa-word">{s.word}</span>
            <span className="visa-sub">{s.sub}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
