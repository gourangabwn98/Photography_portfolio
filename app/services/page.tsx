"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ArrowRight } from "lucide-react";
import { pricingPackages, faqs } from "@/data";

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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} className="text-gold-400" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-warm-gray text-sm leading-relaxed font-sans pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="label-overline block mb-5">What I Offer</span>
            <h1 className="text-display-lg dark:text-white text-obsidian mb-6">
              Services &<br /><em className="text-gold-400 not-italic">Pricing</em>
            </h1>
            <p className="text-warm-gray max-w-lg font-sans text-sm leading-relaxed">
              Every service is delivered with obsessive attention to light, composition, and story. No presets. No shortcuts. Just exceptional photography.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section-pad dark:bg-charcoal bg-white">
        <div className="container-luxury">
          <Reveal>
            <span className="label-overline block mb-4 text-center">Packages</span>
            <h2 className="text-display-md dark:text-white text-obsidian text-center mb-16">
              Choose your<br /><em className="text-gold-400 not-italic">experience</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPackages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.1}>
                <div className={`relative p-8 border h-full flex flex-col transition-all duration-500 card-hover ${
                  pkg.featured
                    ? "pricing-featured border-gold-400/60 dark:bg-obsidian bg-ivory"
                    : "dark:border-white/8 border-obsidian/8 dark:bg-obsidian/50 bg-ivory/50"
                }`}>
                  {/* Package name */}
                  <div className="mb-8 pt-2">
                    <span className="label-overline text-warm-gray block mb-3">{pkg.id === "silver" ? "Essential" : pkg.id === "gold" ? "Signature" : "Ultimate"}</span>
                    <h3 className="font-display text-3xl dark:text-white text-obsidian font-light">{pkg.name}</h3>
                    <p className="text-warm-gray text-xs mt-2 font-sans">{pkg.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b dark:border-white/8 border-obsidian/8">
                    <div className="flex items-end gap-1">
                      <span className="font-display text-5xl text-gold-400 font-light">${pkg.price}</span>
                    </div>
                    <p className="text-warm-gray text-xs mt-1 font-sans">starting price · USD</p>
                  </div>

                  {/* Key specs */}
                  <div className="flex gap-6 mb-8 text-center">
                    {[
                      { n: pkg.hours, l: "Hours" },
                      { n: pkg.images, l: "Images" },
                      { n: pkg.edits, l: "Retouched" },
                    ].map(({ n, l }) => (
                      <div key={l} className="flex-1">
                        <p className="font-display text-2xl text-gold-400 font-light">{n}</p>
                        <p className="text-warm-gray text-xs font-sans uppercase tracking-wide mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Includes */}
                  <ul className="space-y-3 mb-10 flex-1">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check size={13} className="text-gold-400 mt-0.5 shrink-0" />
                        <span className="text-warm-gray text-sm font-sans">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className={pkg.featured ? "btn-primary justify-center" : "btn-ghost-dark justify-center"}
                  >
                    Book {pkg.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="text-center mt-12">
            <p className="text-warm-gray text-sm font-sans">
              Need something custom?{" "}
              <Link href="/contact" className="text-gold-400 hover:underline">Let&apos;s talk.</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-pad dark:bg-obsidian bg-ivory overflow-x-auto">
        <div className="container-luxury">
          <Reveal>
            <span className="label-overline block mb-4">Compare</span>
            <h2 className="text-display-md dark:text-white text-obsidian mb-12">What&apos;s included</h2>
          </Reveal>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b dark:border-white/10 border-obsidian/10">
                  <th className="text-left py-4 pr-8 text-warm-gray text-xs font-sans tracking-widest uppercase font-medium w-1/2">Feature</th>
                  {pricingPackages.map((pkg) => (
                    <th key={pkg.id} className={`text-center py-4 px-4 font-display text-lg font-light ${pkg.featured ? "text-gold-400" : "dark:text-white text-obsidian"}`}>
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-white/5 divide-obsidian/5">
                {[
                  ["Session hours",          "2 hrs", "8 hrs", "2 days"],
                  ["High-res digital files", "30",    "120",   "300"],
                  ["Retouched images",       "15",    "60",    "150"],
                  ["Online gallery",         "✓",     "✓",     "✓"],
                  ["USB delivery",           "—",     "✓",     "✓"],
                  ["Fine art prints",        "—",     "—",     "20×30"],
                  ["Commercial license",     "—",     "✓",     "✓"],
                  ["Second photographer",    "—",     "—",     "✓"],
                  ["Same-week preview",      "—",     "✓",     "✓"],
                  ["Engagement session",     "—",     "1 hr",  "Included"],
                  ["Locations",             "1",     "3",     "Unlimited"],
                  ["International travel",   "—",     "—",     "✓"],
                ].map(([feature, ...vals]) => (
                  <tr key={feature}>
                    <td className="py-4 pr-8 text-warm-gray text-sm font-sans">{feature}</td>
                    {vals.map((val, i) => (
                      <td key={i} className={`text-center py-4 px-4 text-sm font-sans ${val === "—" ? "text-warm-gray/30" : val === "✓" ? "text-gold-400" : "dark:text-white text-obsidian"}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad dark:bg-charcoal bg-white">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <span className="label-overline block mb-4">FAQ</span>
              <h2 className="text-display-md dark:text-white text-obsidian mb-12">
                Common questions
              </h2>
            </Reveal>

            <div>
              {faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.04}>
                  <FaqItem q={faq.q} a={faq.a} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-16 text-center">
              <p className="text-warm-gray font-sans text-sm mb-6">Still have questions?</p>
              <Link href="/contact" className="btn-ghost-dark">
                Get in Touch <ArrowRight size={13} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
