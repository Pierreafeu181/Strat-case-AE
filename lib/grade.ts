/** Each answer is 0 (best), 1 (middle) or 2 (worst). */
export type Answer = 0 | 1 | 2;
export type Grade = "A" | "B" | "C";

export const QUESTIONS = [
  { id: "uppers", label: "Uppers", options: ["Like new", "Light creasing", "Cracks or cuts"] },
  { id: "soles", label: "Soles & heels", options: ["Barely worn", "Visible wear", "Worn through"] },
  { id: "lining", label: "Lining", options: ["Clean", "Some wear", "Torn"] },
] as const;

export type Answers = (Answer | null)[];

/**
 * Any worst answer → C (not bought back, recraft offered).
 * All best answers → A. Anything else → B.
 * Returns null until every question is answered.
 */
export function gradeOf(answers: Answers): Grade | null {
  if (answers.length !== QUESTIONS.length || answers.some((a) => a === null)) return null;
  if (answers.some((a) => a === 2)) return "C";
  if (answers.every((a) => a === 0)) return "A";
  return "B";
}

/** Answers the "photo analysis" demo lands on: light creasing / visible wear / clean → B. */
export const PHOTO_DEMO_ANSWERS: Answer[] = [1, 1, 0];
