"use client";

import { useEffect, useRef, useState } from "react";
import type { Pair } from "@/lib/pairs";
import { PHOTO_DEMO_ANSWERS, QUESTIONS, gradeOf, type Answer, type Answers } from "@/lib/grade";
import type { Notify } from "../Toast";
import { ShoeVisual } from "../ShoeArt";
import { IcCamera } from "../Icons";

const ANALYSIS_MS = 2000;
const STAGES = ["Checking uppers…", "Checking soles & heels…", "Checking lining…"];

type Photo = { kind: "none" } | { kind: "sample" } | { kind: "file"; url: string };

export default function TradeTab({ pair, notify }: { pair: Pair; notify: Notify }) {
  const [answers, setAnswers] = useState<Answers>([null, null, null]);
  const [photo, setPhoto] = useState<Photo>({ kind: "none" });
  const [analysing, setAnalysing] = useState(false);
  const [stage, setStage] = useState(0);
  const [analysed, setAnalysed] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const grade = gradeOf(answers);
  const prevGrade = useRef(grade);

  // Scroll the result into view the moment a grade first appears.
  useEffect(() => {
    if (grade && !prevGrade.current) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    prevGrade.current = grade;
  }, [grade]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  // The photo never leaves the device: it is only shown as a local thumbnail.
  useEffect(() => {
    return () => { if (photo.kind === "file") URL.revokeObjectURL(photo.url); };
  }, [photo]);

  function answer(q: number, v: Answer) {
    setAnalysed(false);
    setAnswers((a) => a.map((x, i) => (i === q ? v : x)));
  }

  function analyse(next: Photo) {
    timers.current.forEach(clearTimeout);
    setPhoto(next);
    setAnalysed(false);
    setAnswers([null, null, null]);
    setAnalysing(true);
    setStage(0);
    timers.current = [
      setTimeout(() => setStage(1), ANALYSIS_MS / 3),
      setTimeout(() => setStage(2), (2 * ANALYSIS_MS) / 3),
      setTimeout(() => {
        setAnalysing(false);
        setAnalysed(true);
        setAnswers([...PHOTO_DEMO_ANSWERS]);
      }, ANALYSIS_MS),
    ];
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (f) analyse({ kind: "file", url: URL.createObjectURL(f) });
  }

  const sub = analysing
    ? STAGES[stage]
    : analysed
      ? "Done · answers filled in below"
      : "Instant grade · stays on your phone";

  return (
    <>
      <p className="eyebrow">AE Certified Pre-Owned</p>
      <h2 className="h2">What is your pair worth?</h2>
      <p className="muted">Answer three questions, or let a photo do it.</p>

      <div className="card photo-card section" style={{ marginTop: 14 }}>
        <div className="thumb">
          {photo.kind === "file" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo.url} alt="Your photo" />
          ) : photo.kind === "sample" ? (
            <ShoeVisual photo={pair.photo} leather={pair.leather} alt="Sample photo" sizes="76px" />
          ) : (
            <IcCamera size={26} />
          )}
          {analysing && <span className="scan" aria-hidden />}
        </div>
        <div className="photo-body">
          <div className="photo-title">{analysing ? "Analysing…" : "Photo check"}</div>
          <div className="photo-sub" aria-live="polite">{sub}</div>
          {analysing || analysed ? (
            <div className={`progress${analysing ? " run" : ""}`} aria-hidden>
              <i style={analysed ? { transform: "scaleX(1)" } : undefined} />
            </div>
          ) : null}
          <div className="photo-actions" style={analysing || analysed ? { marginTop: 6 } : undefined}>
            <label className="btn btn-ghost btn-sm" aria-disabled={analysing}>
              Upload photo
              <input className="vh" type="file" accept="image/*" onChange={onFile} disabled={analysing} />
            </label>
            <button className="btn btn-ghost btn-sm" onClick={() => analyse({ kind: "sample" })} disabled={analysing}>
              Use sample
            </button>
          </div>
        </div>
      </div>

      {QUESTIONS.map((q, qi) => (
        <div className="q" key={q.id}>
          <div className="q-label">
            {q.label} <span>{qi + 1} / 3</span>
          </div>
          <div className="seg" role="group" aria-label={q.label}>
            {q.options.map((o, oi) => (
              <button
                key={o}
                aria-pressed={answers[qi] === oi}
                className={oi === 2 ? "worst" : undefined}
                onClick={() => answer(qi, oi as Answer)}
                disabled={analysing}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="result" ref={resultRef} aria-live="polite">
        {/* Waiting */}
        <div className={`card r r-wait${grade === null ? " on" : ""}`} aria-hidden={grade !== null}>
          <div className="r-top">
            <div className="grade wait">?</div>
            <div>
              <div className="r-kicker wait">Your grade</div>
              <div className="r-title">Answer the 3 questions</div>
            </div>
          </div>
          <p className="r-text">
            Grade A or B: we buy it back with a <b>$75 credit</b>. Grade C: we offer a recraft instead.
          </p>
        </div>

        {/* A / B */}
        <div className={`card r${grade === "A" || grade === "B" ? " on" : ""}`} aria-hidden={grade !== "A" && grade !== "B"}>
          <div className="r-top">
            <div className="grade ok">{grade === "A" ? "A" : "B"}</div>
            <div>
              <div className="r-kicker ok">Grade {grade === "A" ? "A" : "B"} · accepted</div>
              <div className="r-title">$75 credit</div>
            </div>
          </div>
          <p className="r-text">
            Usable <b>only on a new full-price pair</b>.
          </p>
          <ol className="steps">
            <li><span className="step-n">1</span><span><b>Drop off</b> at a Studio store, or ship it free.</span></li>
            <li><span className="step-n">2</span><span><b>Light refurb</b> at the Studio, checked against AE&apos;s grading standard.</span></li>
            <li><span className="step-n">3</span><span><b>Resold as Certified Pre-Owned</b> at ~$245, with its passport.</span></li>
          </ol>
          <button className="btn btn-green" onClick={() => notify("no credit issued, nothing sent.")}>
            Get my $75 credit
          </button>
        </div>

        {/* C */}
        <div className={`card r${grade === "C" ? " on" : ""}`} aria-hidden={grade !== "C"}>
          <div className="r-top">
            <div className="grade no">C</div>
            <div>
              <div className="r-kicker no">Grade C · not bought back</div>
              <div className="r-title">Give it a second life</div>
            </div>
          </div>
          <p className="r-text">
            Too worn for a light refurb, but the welt means it can be rebuilt. A <b>Recrafting</b> brings
            new soles and heels and refinished uppers, at Port Washington.
          </p>
          <ol className="steps">
            <li><span className="step-n">1</span><span><b>Ship it</b> or drop it at a Studio store.</span></li>
            <li><span className="step-n">2</span><span><b>Rebuilt</b> on its original last, then logged in this passport.</span></li>
          </ol>
          <button className="btn btn-oxblood" onClick={() => notify("no booking made, nothing sent.")}>
            Book recrafting · $150
          </button>
        </div>
      </div>
    </>
  );
}
