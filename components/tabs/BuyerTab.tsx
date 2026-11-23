import type { Pair } from "@/lib/pairs";
import type { Notify } from "../Toast";
import { ShoeVisual } from "../ShoeArt";
import { IcChip, IcFactory, IcPassport, IcRecraft, IcShield, IcUser } from "../Icons";

export default function BuyerTab({ pair, notify }: { pair: Pair; notify: Notify }) {
  const left = pair.recraftsMax - pair.recraftsUsed;
  const rows = [
    { icon: <IcChip />, k: "Authenticity", v: "Verified by chip" },
    { icon: <IcUser />, k: "Owners", v: String(pair.owners) },
    { icon: <IcRecraft />, k: "Recrafts left", v: `~${left}` },
    { icon: <IcShield />, k: "Warranty", v: "1 year" },
    { icon: <IcPassport />, k: "Passport", v: "Transfers to you" },
    { icon: <IcFactory />, k: "Refurbished", v: "By AE, not a third party" },
  ];

  return (
    <>
      <p className="eyebrow">Buying used?</p>
      <h2 className="h2">Certified Pre-Owned</h2>
      <p className="muted">Graded, refurbished and certified by the people who made it.</p>

      <div className="card section" style={{ marginTop: 14, overflow: "hidden" }}>
        <div className="listing-hero">
          <ShoeVisual photo={pair.photo} leather={pair.leather} alt={`${pair.model}, certified pre-owned`} sizes="(max-width: 440px) 100vw, 440px" />
          <span className="tag-cpo">Certified · Grade B</span>
        </div>
        <div style={{ fontWeight: 600 }}>
          {pair.model} · {pair.leather}
        </div>
        <div className="small" style={{ marginTop: 2 }}>
          {pair.size} · made {pair.madeYear} · No. {pair.serial}
        </div>
        <div className="price-row">
          <span className="price num">${pair.resalePrice}</span>
          <span className="was num">
            <s>${pair.priceNew}</s> new
          </span>
          <span className="save num">Save ${pair.priceNew - pair.resalePrice}</span>
        </div>

        <ul className="checks">
          {rows.map((r) => (
            <li key={r.k}>
              <span className="ic">{r.icon}</span>
              <span className="k">{r.k}</span>
              <span className="v">{r.v}</span>
            </li>
          ))}
        </ul>

        <p className="partner">Sold in the Pre-Owned tab, run with our resale partner (Archive or Trove).</p>
        <button className="btn btn-primary" onClick={() => notify("no checkout, nothing charged.")}>
          Add to cart · ${pair.resalePrice}
        </button>
      </div>
    </>
  );
}
