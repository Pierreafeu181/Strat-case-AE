import { redirect } from "next/navigation";
import { DEMO_SERIAL } from "@/lib/pairs";

// next.config.ts already redirects "/" at the edge; this is the fallback.
export default function Home() {
  redirect(`/p/${DEMO_SERIAL}`);
}
