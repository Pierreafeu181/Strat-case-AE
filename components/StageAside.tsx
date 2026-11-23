import { DEMO_QR_PATH, DEMO_QR_SIZE, DEMO_QR_URL } from "@/lib/demoQr";

const QUIET = 4; // standard quiet zone, in modules

/**
 * Desktop / projector only (≥ 900px, hidden below by CSS): the pitch in three
 * lines next to the phone, and a QR code that opens the demo pair on a phone.
 */
export default function StageAside() {
  const box = DEMO_QR_SIZE + QUIET * 2;
  return (
    <aside className="stage-aside" aria-label="About this prototype">
      <p className="eyebrow">Concept prototype</p>
      <p className="h1">Shoe Passport</p>
      <ol className="stage-lines">
        <li><span className="step-n" aria-hidden>1</span><span>Tap the chip in the heel: the pair&apos;s passport opens.</span></li>
        <li><span className="step-n" aria-hidden>2</span><span>The owner trades it in for a credit, or books a recraft.</span></li>
        <li><span className="step-n" aria-hidden>3</span><span>The next owner buys it certified, with its whole history.</span></li>
      </ol>
      <figure className="stage-qr">
        <svg
          viewBox={`${-QUIET} ${-QUIET} ${box} ${box}`}
          role="img"
          aria-label="QR code that opens the demo passport on a phone"
          shapeRendering="crispEdges"
        >
          <rect x={-QUIET} y={-QUIET} width={box} height={box} fill="#fff" />
          <path d={DEMO_QR_PATH} fill="#111" />
        </svg>
        <figcaption>
          Scan to open it on your phone
          <span translate="no">{DEMO_QR_URL.replace(/^https:\/\//, "").replace(/\/$/, "")}</span>
        </figcaption>
      </figure>
    </aside>
  );
}
