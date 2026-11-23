import type { Pair } from "@/lib/pairs";
import { RESALE_BY_GRADE, type Grade } from "@/lib/grade";
import type { Notify } from "../Toast";
import { ShoeVisual } from "../ShoeArt";
import { IcChip, IcFactory, IcPassport, IcRecraft, IcShield, IcUser } from "../Icons";

/**
 * Preview of the listing this pair gets once traded in and certified:
 * what the next owner sees. Follows the trade-in grade when it is A or B.
 */
export default function BuyerTab({ pair, notify, grade }: { pair: Pair; notify: Notify; grade: Grade | null }) {
  const g: "A" | "B" = grade === "A" ? "A" : "B";
  const price = RESALE_BY_GRADE[g];
  const left = pair.recraftsMax - pair.recraftsUsed;
  const rows = [
    { icon: <IcChip />, k: "Authenticity", v: "Chip matched to passport" },
    { icon: <IcUser />, k: "Owners", v: `${pair.owners} → you'd be #${pair.owners + 1}` },
    { icon: <IcRecraft />, k: "Recrafts left", v: `~${left}` },
    { icon: <IcShield />, k: "Warranty", v: "1 year, by AE" },
    { icon: <IcPassport />, k: "Passport", v: "Transfers to you" },
    { icon: <IcFactory />, k: "Graded & refurbished", v: "By AE" },
  ];

  return (
    <>
      <p className="eyebrow">Buying used? · the next owner</p>
      <h2 className="h2">Certified Pre-Owned</h2>
      <p className="muted">Once traded in and certified, this pair is listed like this.</p>

      <div className="card section" style={{ marginTop: 14, overflow: "hidden" }}>
        <div className="listing-hero">
          <ShoeVisual photo={pair.photo} leather={pair.leather} alt={`${pair.model}, certified pre-owned`} sizes="(max-width: 440px) 100vw, 440px" />
          <span className="tag-cpo">Certified · Grade {g}</span>
        </div>
        <div style={{ fontWeight: 600 }}>
          {pair.model} · {pair.leather}
        </div>
        <div className="small" style={{ marginTop: 2 }}>
          {pair.size} · made {pair.madeYear} · No. {pair.serial}
        </div>
        <div className="price-row">
          <span className="price num">${price}</span>
          <span className="was num">
            <s>${pair.priceNew}</s> new
          </span>
          <span className="save num">Save ${pair.priceNew - price}</span>
        </div>
        <p className="anchor num">Uncertified on eBay: ~$70 · no history, no warranty</p>

        <ul className="checks">
          {rows.map((r) => (
            <li key={r.k}>
              <span className="ic">{r.icon}</span>
              <span className="k">{r.k}</span>
              <span className="v">{r.v}</span>
            </li>
          ))}
        </ul>

        <p className="partner">Sold on the Pre-Owned tab of allenedmonds.com, run with our partner Archive.</p>
        <button className="btn btn-primary" onClick={() => notify("no checkout, nothing charged.")}>
          Add to cart · ${price}
        </button>
      </div>
    </>
  );
}
