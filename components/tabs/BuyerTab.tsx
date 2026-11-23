import type { Pair } from "@/lib/pairs";
import { RESALE_BY_GRADE, type Grade } from "@/lib/grade";
import type { Notify } from "../Toast";
import { ShoeVisual } from "../ShoeArt";
import { usd } from "@/lib/format";
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
    { icon: <IcChip />, k: "Authenticity", v: "Chip matched to its record" },
    { icon: <IcUser />, k: "Owners", v: `${pair.owners} → you'd be #${pair.owners + 1}` },
    { icon: <IcRecraft />, k: "Recrafts left", v: `~${left}` },
    { icon: <IcShield />, k: "Warranty", v: "1 year, by AE" },
    { icon: <IcPassport />, k: "Certificate of origin", v: "Transfers to you" },
    { icon: <IcFactory />, k: "Graded & refurbished", v: "By AE" },
  ];

  return (
    <>
      <h2 className="h2">Certified Pre-Owned</h2>
      <p className="muted">Once traded in and certified, this pair is listed with its certificate of origin, which transfers to you.</p>

      <div className="card card-raised listing mt-4">
        <div className="listing-hero">
          <ShoeVisual photo={pair.photo} leather={pair.leather} alt={`${pair.model}, certified pre-owned`} sizes="(max-width: 440px) 100vw, 440px" />
          <span className="tag-cpo">Certified · Grade {g}</span>
        </div>
        <div className="fw-600">
          <span translate="no">{pair.model}</span> · {pair.leather}
        </div>
        <div className="small">
          {pair.size} · made {pair.madeYear} · No. {pair.serial}
        </div>
        <div className="price-row">
          <span className="price num">{usd(price)}</span>
          <span className="was num">
            <s>{usd(pair.priceNew)}</s> new
          </span>
          <span className="save num">Save {usd(pair.priceNew - price)}</span>
        </div>
        <p className="anchor num">Uncertified on eBay: ~{usd(70)} · no history, no warranty</p>

        <ul className="checks">
          {rows.map((r) => (
            <li key={r.k}>
              <span className="ic">{r.icon}</span>
              <span className="k">{r.k}</span>
              <span className="v">{r.v}</span>
            </li>
          ))}
        </ul>

        <p className="partner">Sold on the Pre-Owned tab of <span translate="no">allenedmonds.com</span>, run with our partner Archive.</p>
        <button className="btn btn-primary" onClick={() => notify("no checkout, nothing charged.")}>
          Add to cart — {usd(price)}
        </button>
      </div>
    </>
  );
}
