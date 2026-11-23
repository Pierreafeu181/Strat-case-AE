import type { Pair } from "./pairs";

const WIDTH = 36;
const clean = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");
const line = (s: string) => s.padEnd(WIDTH, "<").slice(0, WIDTH);

/**
 * Passport-style machine-readable zone, built from the pair's own data.
 * Decorative: everything in it is already shown elsewhere on the page.
 *   P<AE<PARKAVENUE<<BLACKCALF<<<<<<<<<<
 *   PW21048172<US105D<2021<WI<<212<<<<01
 */
export function mrz(pair: Pair): [string, string] {
  const first = `P<AE<${clean(pair.model)}<<${clean(pair.leather)}`;
  const second = [
    clean(pair.serial),
    clean(pair.size),
    String(pair.madeYear),
    "WI",
    "",
    String(pair.handSteps).padStart(3, "0"),
  ].join("<");
  return [line(first), line(second).slice(0, WIDTH - 2) + String(pair.owners).padStart(2, "0")];
}
