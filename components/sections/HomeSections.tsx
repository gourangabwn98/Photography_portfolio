"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { portfolioImages, services, testimonials, instagramPosts, photographer } from "@/data";

// ─── Scroll reveal wrapper ───
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section header ───
function SectionHeader({
  overline,
  title,
  subtitle,
  center = false,
}: {
  overline: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-16 ${center ? "text-center" : ""}`}>
      <span className="label-overline block mb-4">{overline}</span>
      <h2 className="text-display-md dark:text-white text-obsidian mb-4">{title}</h2>
      {subtitle && (
        <p className="text-warm-gray max-w-xl text-sm leading-relaxed mt-4 font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Featured Works ───
export function FeaturedSection() {
  const featured = portfolioImages.slice(0, 6);

  return (
    <section id="featured" className="section-pad bg-ivory dark:bg-obsidian">
      <div className="container-luxury">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <Reveal>
            <SectionHeader
              overline="Selected Work"
              title={<>Featured<br /><em className="text-gold-400 not-italic">Captures</em></>}
            />
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/portfolio" className="btn-ghost-dark mb-16">
              View All Work <ArrowRight size={13} />
            </Link>
          </Reveal>
        </div>

        <div className="masonry-grid">
          {featured.map((img, i) => (
            <Reveal key={img.id} delay={i * 0.07} className="masonry-item">
              <Link href="/portfolio" className="block group relative overflow-hidden">
                <div className={`relative w-full ${
                  img.aspect === "tall"   ? "aspect-[3/4]" :
                  img.aspect === "wide"   ? "aspect-[4/3]" :
                  "aspect-square"
                }`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/30 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm font-sans tracking-wide">{img.alt}</p>
                    <span className="label-overline text-gold-400 mt-1 block capitalize">{img.category}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Preview ───
const iconMap: Record<string, React.ReactNode> = {
  Heart:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>,
  User:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
  Sparkles: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>,
  Briefcase:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>,
  Calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
  Globe:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
};

export function ServicesSection() {
  return (
    <section className="section-pad dark:bg-charcoal bg-white">
      <div className="container-luxury">
        <Reveal>
          <SectionHeader
            overline="What I Offer"
            title={<>Photography<br /><em className="text-gold-400 not-italic">Services</em></>}
            subtitle="From intimate portraits to international campaigns — every assignment receives the same obsessive attention to light, composition, and story."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {services.map((svc, i) => (
            <Reveal key={svc.id} delay={i * 0.08}>
              <div className={`group p-8 border transition-all duration-500 card-hover h-full ${
                svc.featured
                  ? "border-gold-400/40 dark:bg-obsidian/50 bg-ivory"
                  : "border-black/8 dark:border-white/6 dark:bg-obsidian/30 bg-ivory/50"
              }`}>
                {svc.featured && (
                  <span className="label-overline text-gold-400 block mb-4">Signature Service</span>
                )}
                <div className="w-10 h-10 border border-gold-400/30 flex items-center justify-center text-gold-400 mb-6">
                  {iconMap[svc.icon]}
                </div>
                <h3 className="font-display text-2xl font-light dark:text-white text-obsidian mb-2">
                  {svc.title}
                </h3>
                <p className="text-gold-400 text-xs tracking-widest uppercase font-sans mb-4">
                  {svc.tagline}
                </p>
                <p className="text-warm-gray text-sm leading-relaxed mb-8 font-sans">
                  {svc.description}
                </p>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <p className="text-warm-gray text-xs font-sans uppercase tracking-widest">From</p>
                    <p className="font-display text-2xl text-gold-400 font-light">${svc.startingAt}</p>
                  </div>
                  <Link
                    href="/services"
                    className="text-xs font-sans tracking-widest uppercase dark:text-white/50 text-obsidian/50 hover:text-gold-400 transition-colors flex items-center gap-1"
                  >
                    Details <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="text-center mt-16">
          <Link href="/services" className="btn-ghost-dark">
            View All Services & Packages <ArrowRight size={13} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Awards Band ───
export function AwardsBand() {
  const { awards } = photographer;
  return (
    <section className="py-16 dark:bg-obsidian bg-ivory border-y border-gold-400/10">
      <div className="container-luxury">
        <div className="flex items-center gap-6 mb-10">
          <span className="gold-line" />
          <span className="label-overline">Recognition & Awards</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {awards.map((award, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="flex items-start gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                <p className="text-warm-gray text-xs leading-relaxed font-sans group-hover:text-gold-400 transition-colors">
                  {award}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ───
export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="section-pad dark:bg-charcoal bg-white overflow-hidden">
      <div className="container-luxury">
        <Reveal>
          <SectionHeader
            overline="Client Words"
            title={<>What people<br /><em className="text-gold-400 not-italic">say</em></>}
            center
          />
        </Reveal>

        <div className="max-w-3xl mx-auto">
          {/* Quote */}
          <div className="relative min-h-[200px]">
            <div className="quote-mark absolute -top-6 -left-4 select-none">&ldquo;</div>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-8 px-4"
            >
              <p className="font-display text-xl md:text-2xl font-light dark:text-white text-obsidian italic leading-relaxed mb-8">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gold-400/30">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="dark:text-white text-obsidian font-sans text-sm font-medium">{t.name}</p>
                  <p className="text-warm-gray text-xs mt-0.5">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 ${
                  i === active ? "w-8 h-0.5 bg-gold-400" : "w-2 h-0.5 bg-warm-gray/40 hover:bg-warm-gray"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Instagram grid ───
export function InstagramSection() {
  return (
    <section className="section-pad dark:bg-obsidian bg-ivory">
      <div className="container-luxury">
        <Reveal>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="label-overline block mb-3">Follow the Journey</span>
              <h2 className="text-display-md dark:text-white text-obsidian">
                {photographer.instagram}
              </h2>
            </div>
            <a
              href={`https://instagram.com/${photographer.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-warm-gray text-xs tracking-widest uppercase hover:text-gold-400 transition-colors"
            >
              Open Instagram <ExternalLink size={12} />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {instagramPosts.map((post, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <a
                href={`https://instagram.com/${photographer.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square overflow-hidden group"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/50 transition-all duration-500 flex items-center justify-center">
                  <ExternalLink size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
