import type { Pair } from "@/lib/pairs";
import { usd } from "@/lib/format";
import type { Notify } from "../Toast";
import Visas from "../Visas";

export default function StoryTab({ pair, notify }: { pair: Pair; notify: Notify }) {
  return (
    <>
      <p className="pitch mt-0">
        AE certifies, credits and resells its own pairs: the second life stays with the brand.
      </p>

      <Visas pair={pair} />

      <div className="section">
        <h2 className="h2 section-title">From hide to today</h2>
        <ol className="tl">
          {pair.timeline.map((e) => (
            <li
              key={e.title + e.date}
              className={e.date === "Today" ? "today" : e.title.startsWith("Recrafted") ? "recraft" : ""}
            >
              <span className="tl-dot" aria-hidden />
              <div className="tl-date">{e.date}</div>
              <div className="tl-title">
                {e.title} <span className="tl-place" translate="no">· {e.place}</span>
              </div>
              <div className="tl-detail">{e.detail}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="section">
        <button className="btn btn-primary" onClick={() => notify("no booking made, nothing sent.")}>
          Book recrafting · {usd(150)}
        </button>
        <p className="small center mt-2">
          New soles and heels, refinished uppers, at <span translate="no">Port Washington</span>.
        </p>
      </div>
    </>
  );
}
