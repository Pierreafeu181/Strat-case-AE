"use client";

import { useEffect, useState } from "react";

/**
 * Desktop / projector only (≥ 900px, hidden below by CSS): the pitch in three
 * lines next to the phone, plus the address to open it on a real phone.
 */
export default function StageAside() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(location.host + location.pathname.replace(/\/$/, "")), []);
  return (
    <aside className="stage-aside" aria-label="About this prototype">
      <p className="eyebrow">Concept prototype</p>
      <p className="h1">Shoe Passport</p>
      <ol className="stage-lines">
        <li><span className="step-n" aria-hidden>1</span><span>Tap the chip in the heel: the pair&apos;s passport opens.</span></li>
        <li><span className="step-n" aria-hidden>2</span><span>The owner trades it in for a credit, or books a recraft.</span></li>
        <li><span className="step-n" aria-hidden>3</span><span>The next owner buys it certified, with its whole history.</span></li>
      </ol>
      {url && (
        <p className="stage-url">
          Open it on your phone
          <b translate="no">{url}</b>
        </p>
      )}
    </aside>
  );
}
