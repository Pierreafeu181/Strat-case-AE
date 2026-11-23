"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Pair } from "@/lib/pairs";
import { DEMO_YEAR } from "@/lib/pairs";
import type { Grade } from "@/lib/grade";
import { ShoeVisual } from "./ShoeArt";
import { useToast } from "./Toast";
import StoryTab from "./tabs/StoryTab";
import TradeTab from "./tabs/TradeTab";
import BuyerTab from "./tabs/BuyerTab";

const TABS = [
  { id: "story", label: "Story" },
  { id: "trade", label: "Trade in" },
  { id: "buyer", label: "Buying used?" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const isTab = (v: string): v is TabId => TABS.some((t) => t.id === v);
const isGrade = (v: string | null): v is Grade => v === "A" || v === "B" || v === "C" || v === "X";

/** "#trade?g=B" → { tab: "trade", grade: "B" }. Unknown parts fall back to story / no grade. */
function parseHash(hash: string): { tab: TabId; grade: Grade | null } {
  const [t, q = ""] = hash.replace(/^#/, "").split("?");
  const g = new URLSearchParams(q).get("g");
  return { tab: isTab(t) ? t : "story", grade: isGrade(g) ? g : null };
}

/**
 * Visibility is driven by <html data-tab="…"> (set before first paint by the
 * inline script in layout.tsx), so a deep link never flashes the wrong tab.
 * The trade-in grade lives in the hash too (#trade?g=B) so a demo is reproducible.
 */
export default function Passport({ pair }: { pair: Pair }) {
  const [tab, setTab] = useState<TabId>("story");
  const [tradeGrade, setTradeGrade] = useState<Grade | null>(null);
  const [urlGrade, setUrlGrade] = useState<Grade | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { notify, node: toast } = useToast();

  useEffect(() => {
    const root = document.documentElement;
    const fromHash = (e?: Event) => {
      const { tab: t, grade } = parseHash(location.hash);
      root.dataset.tab = t;
      if (e) root.classList.add("switched");
      setTab(t);
      setUrlGrade(grade);
    };
    fromHash();
    setHydrated(true);
    // Enable transitions only after the first frame, so initial state never animates.
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("ready")));
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  // Keep the URL in sync with the tab and the grade, without adding history entries.
  useEffect(() => {
    if (!hydrated) return;
    const next = `#${tab}${tradeGrade ? `?g=${tradeGrade}` : ""}`;
    if (location.hash !== next) history.replaceState(null, "", next);
  }, [tab, tradeGrade, hydrated]);

  const select = useCallback((t: TabId) => {
    const root = document.documentElement;
    root.classList.add("switched");
    root.dataset.tab = t;
    setTab(t);
    // If the user had scrolled past the tab bar, bring the new tab's top into view.
    const el = anchor.current;
    if (el) {
      const sticky = el.offsetTop - parseFloat(getComputedStyle(el).top || "0");
      if (window.scrollY > sticky + 1) window.scrollTo({ top: sticky, behavior: "smooth" });
    }
  }, []);

  // WAI-ARIA Tabs: arrows move between tabs (wrapping), Home/End jump to the ends.
  function onTabKey(e: React.KeyboardEvent) {
    const i = TABS.findIndex((t) => t.id === tab);
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = TABS.length - 1;
    if (n < 0) return;
    e.preventDefault();
    select(TABS[n].id);
    tabRefs.current[n]?.focus();
  }

  const years = DEMO_YEAR - pair.madeYear;

  return (
    <main className="shell">
      <header className="head">
        <div className="head-row">
          <p className="eyebrow">Digital shoe passport</p>
          <span className="serial num">No. {pair.serial}</span>
        </div>
        <h1 className="h1" translate="no">{pair.model}</h1>
        <p className="meta">
          {pair.leather} · {pair.size} · made {pair.madeYear}
        </p>
        <div className="hero">
          <ShoeVisual photo={pair.photo} leather={pair.leather} alt={`${pair.model}, ${pair.leather}`} priority />
        </div>
        <dl className="facts num">
          <div>
            <dt>hand steps</dt>
            <dd>{pair.handSteps}</dd>
          </div>
          <div>
            <dt>years in use</dt>
            <dd>{years}</dd>
          </div>
          <div>
            <dt>recrafts used</dt>
            <dd>
              {pair.recraftsUsed} <small>of ~{pair.recraftsMax}</small>
            </dd>
          </div>
        </dl>
      </header>

      <div className="tabs-wrap" ref={anchor}>
        <div className="tabs" role="tablist" aria-label="Passport sections" onKeyDown={onTabKey}>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              className="tab"
              data-id={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-controls={`panel-${t.id}`}
              aria-selected={tab === t.id}
              tabIndex={tab === t.id ? 0 : -1}
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
          <TradeTab pair={pair} notify={notify} onGrade={setTradeGrade} initialGrade={urlGrade} />
        </section>
        <section className="panel" data-id="buyer" id="panel-buyer" role="tabpanel" aria-labelledby="tab-buyer" aria-hidden={tab !== "buyer"} inert={tab !== "buyer"}>
          <BuyerTab pair={pair} notify={notify} grade={tradeGrade} />
        </section>
      </div>
      {toast}
    </main>
  );
}
