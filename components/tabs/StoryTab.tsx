import type { Pair } from "@/lib/pairs";
import { DEMO_YEAR } from "@/lib/pairs";
import type { Notify } from "../Toast";

export default function StoryTab({ pair, notify }: { pair: Pair; notify: Notify }) {
  const years = DEMO_YEAR - pair.madeYear;
  return (
    <>
      <div className="badge">
        <span className="pulse" aria-hidden />
        Authentic pair · made in Port Washington, WI
      </div>
      <p className="pitch">
        AE certifies, credits and resells its own pairs: the second life stays with the brand.
      </p>

      <div className="stats section" style={{ marginTop: 16 }}>
        <div className="card stat">
          <div className="stat-v num">{pair.handSteps}</div>
          <div className="stat-l">hand steps</div>
        </div>
        <div className="card stat">
          <div className="stat-v num">{years}</div>
          <div className="stat-l">years in use</div>
        </div>
        <div className="card stat">
          <div className="stat-v num">
            {pair.recraftsUsed}
            <small> / ~{pair.recraftsMax}</small>
          </div>
          <div className="stat-l">recrafts used</div>
        </div>
      </div>

      <div className="section">
        <p className="eyebrow">Its life so far</p>
        <h2 className="h2 section-title">From hide to today</h2>
        <div className="card">
          <ol className="tl">
            {pair.timeline.map((e) => (
              <li
                key={e.title + e.date}
                className={e.date === "Today" ? "today" : e.title.startsWith("Recrafted") ? "recraft" : ""}
              >
                <span className="tl-dot" aria-hidden />
                <div className="tl-date">{e.date}</div>
                <div className="tl-title">
                  {e.title} <span className="tl-place">· {e.place}</span>
                </div>
                <div className="tl-detail">{e.detail}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="section">
        <button className="btn btn-primary" onClick={() => notify("no booking made, nothing sent.")}>
          Book recrafting · $150
        </button>
        <p className="small" style={{ textAlign: "center", margin: "8px 0 0" }}>
          New soles and heels, refinished uppers, at Port Washington.
        </p>
      </div>
    </>
  );
}
