"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Pair } from "@/lib/pairs";
import { ShoeVisual } from "./ShoeArt";
import { useToast } from "./Toast";
import StoryTab from "./tabs/StoryTab";
import TradeTab from "./tabs/TradeTab";
import BuyerTab from "./tabs/BuyerTab";

const TABS = [
  { id: "story", label: "Its story" },
  { id: "trade", label: "Trade in" },
  { id: "buyer", label: "Buying used?" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const isTab = (v: string): v is TabId => TABS.some((t) => t.id === v);

/**
 * Visibility is driven by <html data-tab="…"> (set before first paint by the
 * inline script in layout.tsx), so a deep link never flashes the wrong tab.
 */
export default function Passport({ pair }: { pair: Pair }) {
  const [tab, setTab] = useState<TabId>("story");
  const anchor = useRef<HTMLDivElement>(null);
  const { notify, node: toast } = useToast();

  useEffect(() => {
    const root = document.documentElement;
    const fromHash = () => {
      const h = location.hash.slice(1);
      const t = isTab(h) ? h : "story";
      root.dataset.tab = t;
      setTab(t);
    };
    fromHash();
    // Enable transitions only after the first frame, so initial state never animates.
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("ready")));
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  const select = useCallback((t: TabId) => {
    document.documentElement.dataset.tab = t;
    setTab(t);
    history.replaceState(null, "", `#${t}`);
    // If the user had scrolled past the tab bar, bring the new tab's top into view.
    const el = anchor.current;
    if (el) {
      const sticky = el.offsetTop - parseFloat(getComputedStyle(el).top || "0");
      if (window.scrollY > sticky + 1) window.scrollTo({ top: sticky, behavior: "smooth" });
    }
  }, []);

  return (
    <main className="shell">
      <header className="head">
        <div className="head-row">
          <p className="eyebrow">Digital shoe passport</p>
          <span className="serial num">No. {pair.serial}</span>
        </div>
        <h1 className="h1">{pair.model}</h1>
        <p className="meta">
          {pair.leather} · {pair.size} · made {pair.madeYear}
        </p>
        <div className="hero">
          <ShoeVisual photo={pair.photo} leather={pair.leather} alt={`${pair.model}, ${pair.leather}`} priority />
        </div>
      </header>

      <div className="tabs-wrap" ref={anchor}>
        <div className="tabs" role="tablist" aria-label="Passport sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              className="tab"
              data-id={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-controls={`panel-${t.id}`}
              aria-selected={tab === t.id}
              onClick={() => select(t.id)}
            >
              {t.label}
            </button>
          ))}
          <span className="tab-ind" aria-hidden />
        </div>
      </div>

      <div className="panels">
        <section className="panel" data-id="story" id="panel-story" role="tabpanel" aria-labelledby="tab-story" aria-hidden={tab !== "story"} inert={tab !== "story"}>
          <StoryTab pair={pair} notify={notify} />
        </section>
        <section className="panel" data-id="trade" id="panel-trade" role="tabpanel" aria-labelledby="tab-trade" aria-hidden={tab !== "trade"} inert={tab !== "trade"}>
          <TradeTab pair={pair} notify={notify} />
        </section>
        <section className="panel" data-id="buyer" id="panel-buyer" role="tabpanel" aria-labelledby="tab-buyer" aria-hidden={tab !== "buyer"} inert={tab !== "buyer"}>
          <BuyerTab pair={pair} notify={notify} />
        </section>
      </div>
      {toast}
    </main>
  );
}
