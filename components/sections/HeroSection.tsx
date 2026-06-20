"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { heroSlides, photographer } from "@/data";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [loaded,  setLoaded]  = useState<boolean[]>(new Array(heroSlides.length).fill(false));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const markLoaded = (i: number) =>
    setLoaded((prev) => { const n = [...prev]; n[i] = true; return n; });

  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden" aria-label="Hero">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className={`object-cover ${i === current ? "ken-burns" : ""}`}
              onLoad={() => markLoaded(i)}
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}

        {/* Multi-layer vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-transparent" />
      </div>

      {/* Slide indicators */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-px transition-all duration-500 ${i === current ? "h-10 bg-gold-400" : "h-4 bg-white/30 hover:bg-white/60"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury pb-20 md:pb-28">
        {/* Overline */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="gold-line" />
          <span className="label-overline text-gold-400 tracking-[0.3em]">
            Los Angeles · Worldwide
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-display-hero text-white mb-6 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {photographer.name.split(" ")[0]}
          <br />
          <em className="text-gold-400 not-italic">{photographer.name.split(" ")[1]}</em>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-display text-xl md:text-2xl text-white/60 italic font-light mb-12 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {photographer.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <Link href="/portfolio" className="btn-primary">
            View Portfolio
            <ArrowRight size={14} />
          </Link>
          <Link href="/booking" className="btn-ghost">
            Book a Session
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex gap-10 mt-16 pt-10 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {[
            { n: photographer.stats.shoots,  l: "Shoots" },
            { n: photographer.stats.clients, l: "Clients" },
            { n: photographer.stats.years,   l: "Years" },
            { n: photographer.stats.awards,  l: "Awards" },
          ].map(({ n, l }) => (
            <div key={l} className="hidden sm:block">
              <p className="font-display text-2xl font-light text-gold-400">{n}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase mt-1">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-gold-400 transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase">Scroll</span>
        <ArrowDown size={13} />
      </motion.button>
    </section>
  );
}
