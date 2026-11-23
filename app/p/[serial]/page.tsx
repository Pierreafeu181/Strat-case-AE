import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Passport from "@/components/Passport";
import Footer from "@/components/Footer";
import StageAside from "@/components/StageAside";
import { getPair, pairs } from "@/lib/pairs";

export const dynamicParams = false;

export function generateStaticParams() {
  return pairs.map((p) => ({ serial: p.serial }));
}

type Props = { params: Promise<{ serial: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pair = getPair((await params).serial);
  return { title: pair ? `${pair.model} · Shoe Passport (concept)` : "Shoe Passport (concept)" };
}

export default async function PassportPage({ params }: Props) {
  const pair = getPair((await params).serial);
  if (!pair) notFound();
  return (
    <div className="stage">
      <StageAside />
      <div className="stage-app">
        <Passport pair={pair} />
        <Footer />
      </div>
    </div>
  );
}
