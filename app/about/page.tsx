"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { photographer, clientLogos } from "@/data";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

const timeline = [
  { year: "2012", event: "First camera — Leica M6, borrowed from father. First roll: Kodak Portra 400 in Marrakech. Everything changed." },
  { year: "2014", event: "Began assisting top commercial photographer in Paris. Shot first editorial for a French fashion weekly." },
  { year: "2016", event: "First solo gallery exhibition — 'Threshold' — 32 large-format portraits. Sold out opening night." },
  { year: "2017", event: "Sony World Photography Awards nomination. First destination wedding, Lake Como. Second photographer never needed." },
  { year: "2019", event: "Relocated to Los Angeles. Expanded into commercial and brand work. First campaign for a global luxury brand." },
  { year: "2021", event: "International Photography Awards — Gold, Portrait Category. Published in Vogue, The New York Times, PDN." },
  { year: "2023", event: "Fearless Photographers Hall of Fame. 500th shoot milestone. Studio expansion to 3,000 sq ft." },
  { year: "2025", event: "Ongoing. Always seeking the moment just before the mask comes off." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=90"
          alt="RK photography photographing"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="relative z-10 container-luxury pb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span className="label-overline block mb-4">The Photographer</span>
            <h1 className="text-display-lg text-white">
              {photographer.name.split(" ")[0]}<br />
              <em className="text-gold-400 not-italic">{photographer.name.split(" ")[1]}</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-pad dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal>
              <span className="label-overline block mb-6">Who I Am</span>
              <p className="font-display text-2xl md:text-3xl font-light dark:text-white text-obsidian leading-relaxed mb-6">
                {photographer.bio}
              </p>
              <div className="divider-gold my-8" />
              <p className="text-warm-gray text-sm leading-loose font-sans">
                {photographer.story}
              </p>
              <Link href="/booking" className="btn-ghost-dark mt-10 inline-flex">
                Work with me <ArrowRight size={13} />
              </Link>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={0.15}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=85"
                    alt="RK photography portrait"
                    fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
              {/* Stats */}
              <Reveal delay={0.25}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: photographer.stats.shoots,  l: "Shoots Completed" },
                    { n: photographer.stats.clients, l: "Happy Clients" },
                    { n: photographer.stats.years,   l: "Years of Practice" },
                    { n: photographer.stats.awards,  l: "Awards & Nominations" },
                  ].map(({ n, l }) => (
                    <div key={l} className="p-5 border dark:border-white/6 border-obsidian/8 dark:bg-charcoal bg-white">
                      <p className="stat-number">{n}</p>
                      <p className="text-warm-gray text-xs mt-2 font-sans tracking-wide uppercase">{l}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad dark:bg-charcoal bg-white">
        <div className="container-luxury">
          <Reveal>
            <span className="label-overline block mb-4">Career</span>
            <h2 className="text-display-md dark:text-white text-obsidian mb-16">
              Twelve years,<br />
              <em className="text-gold-400 not-italic">one obsession.</em>
            </h2>
          </Reveal>

          <div className="relative max-w-3xl">
            <div className="timeline-line" />
            <div className="pl-10 space-y-12">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.06}>
                  <div className="relative">
                    <div className="absolute -left-10 top-1 w-3 h-3 border border-gold-400 bg-obsidian rotate-45" />
                    <p className="label-overline text-gold-400 mb-2">{item.year}</p>
                    <p className="dark:text-white/70 text-obsidian/70 text-sm leading-relaxed font-sans">{item.event}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section-pad dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <Reveal>
            <span className="label-overline block mb-4">The Kit</span>
            <h2 className="text-display-md dark:text-white text-obsidian mb-12">
              Equipment
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {photographer.equipment.map((eq, i) => (
              <Reveal key={eq.name} delay={i * 0.08}>
                <div className="p-6 border dark:border-white/6 border-obsidian/8 dark:bg-charcoal bg-white group hover:border-gold-400/40 transition-all duration-300">
                  <div className="w-8 h-px bg-gold-400 mb-6 group-hover:w-12 transition-all duration-300" />
                  <h3 className="font-display text-xl dark:text-white text-obsidian font-light mb-2">{eq.name}</h3>
                  <p className="text-warm-gray text-xs tracking-widest uppercase font-sans">{eq.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="py-16 dark:bg-charcoal bg-white border-y dark:border-white/5 border-obsidian/5">
        <div className="container-luxury">
          <Reveal>
            <span className="label-overline text-center block mb-10">Trusted By</span>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {clientLogos.map((logo, i) => (
              <Reveal key={logo} delay={i * 0.05}>
                <p className="font-display text-lg dark:text-white/25 text-obsidian/25 hover:dark:text-gold-400 hover:text-gold-400 transition-colors duration-300 tracking-widest">
                  {logo}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
