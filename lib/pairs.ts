import pairsData from "@/data/pairs.json";

export type TimelineEntry = {
  date: string;
  title: string;
  place: string;
  detail: string;
};

export type Pair = {
  serial: string;
  model: string;
  style: string;
  leather: string;
  size: string;
  madeYear: number;
  owners: number;
  recraftsUsed: number;
  recraftsMax: number;
  handSteps: number;
  priceNew: number;
  resalePrice: number;
  /** Path under /public, e.g. "/shoes/PW-21-048172.jpg". null = silhouette. */
  photo: string | null;
  timeline: TimelineEntry[];
};

export const DEMO_SERIAL = "PW-21-048172";

// Fixed "today" so the demo never changes between rehearsal and filming.
export const DEMO_YEAR = 2026;

export const pairs = pairsData as Pair[];

export function getPair(serial: string): Pair | undefined {
  return pairs.find((p) => p.serial.toLowerCase() === serial.toLowerCase());
}
