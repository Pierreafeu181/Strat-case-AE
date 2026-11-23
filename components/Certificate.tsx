import type { Pair } from "@/lib/pairs";

/**
 * Certificate of origin: what the chip in the heel proves. Reads like a
 * watchmaker's certificate, built from the pair's own record.
 */
export default function Certificate({ pair }: { pair: Pair }) {
  const madeIn = pair.timeline.find((e) => e.title.startsWith("Goodyear"))?.place ?? "Port Washington, WI";
  const rows = [
    { k: "Made in", v: madeIn, brand: true },
    { k: "Year", v: String(pair.madeYear) },
    { k: "Construction", v: `Goodyear welt, ${pair.handSteps} steps`, brand: true },
    { k: "Recrafts", v: `${pair.recraftsUsed} of ~${pair.recraftsMax}` },
  ];

  return (
    <section className="cert" aria-labelledby="cert-title">
      <div className="cert-in">
        <h2 id="cert-title" className="cert-kicker">Certificate of origin</h2>
        <p className="cert-name" translate="no">{pair.model}</p>
        <p className="cert-sub">
          {pair.leather} {pair.style.toLowerCase()}
        </p>
        <p className="cert-rule num">Nº {pair.serial}</p>
        <dl className="cert-grid">
          {rows.map((r) => (
            <div key={r.k}>
              <dt>{r.k}</dt>
              <dd className="num" translate={r.brand ? "no" : undefined}>{r.v}</dd>
            </div>
          ))}
        </dl>
        <div className="cert-foot">
          <p className="cert-sig">
            Verified
            <small>Chip matched to this record</small>
          </p>
          <span className="cert-seal" aria-hidden>
            Made in
            <br />
            USA
          </span>
        </div>
      </div>
    </section>
  );
}
