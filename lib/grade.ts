/** Each answer is 0 (best), 1 (middle) or 2 (worst). */
export type Answer = 0 | 1 | 2;
/** X = not eligible (leather damage a recraft can't fix). */
export type Grade = "A" | "B" | "C" | "X";

export const QUESTIONS = [
  { id: "uppers", label: "Uppers", options: ["Like new", "Light creasing", "Cracks or cuts"] },
  { id: "soles", label: "Soles & heels", options: ["Barely worn", "Visible wear", "Worn through"] },
  { id: "lining", label: "Lining", options: ["Clean", "Some wear", "Torn"] },
] as const;

export type Answers = (Answer | null)[];

/**
 * Cracked uppers or a torn lining → X: not certifiable, free take-back for recycling.
 * Soles worn through → C: not bought back, a $150 Recrafting rebuilds soles and heels.
 * All best answers → A. Anything else → B. A and B both earn the $75 credit.
 * Returns null until every question is answered.
 */
export function gradeOf(answers: Answers): Grade | null {
  if (answers.length !== QUESTIONS.length || answers.some((a) => a === null)) return null;
  const [uppers, soles, lining] = answers;
  if (uppers === 2 || lining === 2) return "X";
  if (soles === 2) return "C";
  if (answers.every((a) => a === 0)) return "A";
  return "B";
}

/** Resale price of a certified pair by grade (our proposal; B is the deck's ~$245). */
export const RESALE_BY_GRADE = { A: 265, B: 245 } as const;

/** Answers the "photo analysis" demo lands on: light creasing / visible wear / clean → B. */
export const PHOTO_DEMO_ANSWERS: Answer[] = [1, 1, 0];
