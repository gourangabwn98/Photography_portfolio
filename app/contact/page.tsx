"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Check, ArrowRight, Clock } from "lucide-react";
import { photographer } from "@/data";

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

type ContactData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const interests = ["Wedding", "Portrait", "Fashion / Editorial", "Commercial / Brand", "Something else"];

export default function ContactPage() {
  const [data, setData] = useState<ContactData>({
    name: "", email: "", phone: "", interest: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (field: keyof ContactData, val: string) =>
    setData((d) => ({ ...d, [field]: val }));

  const canSubmit = !!data.name && !!data.email && !!data.message;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSent(true);
  };

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-16 dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="label-overline block mb-5">Get in Touch</span>
            <h1 className="text-display-lg dark:text-white text-obsidian mb-6">
              Let&apos;s talk<br />
              <em className="text-gold-400 not-italic">about your day.</em>
            </h1>
            <p className="text-warm-gray max-w-lg font-sans text-sm leading-relaxed">
              Tell me a little about what you&apos;re planning. I read every message myself and
              reply within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="section-pad dark:bg-charcoal bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <Reveal className="lg:col-span-2">
              {sent ? (
                <div className="p-10 border dark:border-white/8 border-obsidian/8 dark:bg-obsidian/50 bg-ivory">
                  <div className="w-16 h-16 border border-gold-400 flex items-center justify-center mb-8">
                    <Check size={26} className="text-gold-400" />
                  </div>
                  <span className="label-overline block mb-4">Message Sent</span>
                  <h2 className="text-display-md dark:text-white text-obsidian mb-4">
                    Thank you, <em className="text-gold-400 not-italic">{data.name.split(" ")[0]}.</em>
                  </h2>
                  <p className="text-warm-gray font-sans text-sm leading-relaxed mb-8">
                    Your message has been received. I&apos;ll get back to you at {data.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setData({ name: "", email: "", phone: "", interest: "", message: "" }); }}
                    className="btn-ghost-dark"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="label-overline block mb-2">Name *</label>
                      <input
                        className="input-luxury"
                        value={data.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-overline block mb-2">Email *</label>
                      <input
                        className="input-luxury"
                        type="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="label-overline block mb-2">Phone</label>
                      <input
                        className="input-luxury"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="label-overline block mb-2">I&apos;m interested in</label>
                      <select
                        className="input-luxury"
                        value={data.interest}
                        onChange={(e) => set("interest", e.target.value)}
                      >
                        <option value="">Select one</option>
                        {interests.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label-overline block mb-2">Message *</label>
                    <textarea
                      className="input-luxury resize-none"
                      rows={6}
                      value={data.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Tell me about your date, location, and vision..."
                      required
                    />
                  </div>

                  <button type="submit" disabled={!canSubmit} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                    Send Message <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </Reveal>

            {/* Sidebar */}
            <div className="space-y-6">
              <Reveal delay={0.1}>
                <div className="p-8 border dark:border-white/8 border-obsidian/8 dark:bg-obsidian/30 bg-ivory/60">
                  <span className="label-overline block mb-6">Direct Contact</span>
                  <ul className="space-y-4">
                    <li>
                      <a href={`mailto:${photographer.email}`} className="flex items-center gap-3 text-sm font-sans dark:text-white/80 text-obsidian/80 hover:text-gold-400 transition-colors">
                        <Mail size={14} className="text-gold-400 shrink-0" /> {photographer.email}
                      </a>
                    </li>
                    <li>
                      <a href={`tel:${photographer.phone}`} className="flex items-center gap-3 text-sm font-sans dark:text-white/80 text-obsidian/80 hover:text-gold-400 transition-colors">
                        <Phone size={14} className="text-gold-400 shrink-0" /> {photographer.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-3 text-sm font-sans dark:text-white/80 text-obsidian/80">
                      <MapPin size={14} className="text-gold-400 shrink-0 mt-0.5" /> {photographer.location}
                    </li>
                    <li>
                      <a
                        href={`https://instagram.com/${photographer.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm font-sans dark:text-white/80 text-obsidian/80 hover:text-gold-400 transition-colors"
                      >
                        <Instagram size={14} className="text-gold-400 shrink-0" /> {photographer.instagram}
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="p-6 border border-gold-400/20 dark:bg-obsidian/50 bg-ivory">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={14} className="text-gold-400" />
                    <p className="text-xs font-sans tracking-wider uppercase text-warm-gray">Response time</p>
                  </div>
                  <p className="dark:text-white text-obsidian text-sm font-sans">Within 24 hours, every day.</p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-warm-gray text-sm font-sans leading-relaxed">
                  Prefer to book directly? Skip the form and{" "}
                  <Link href="/booking" className="text-gold-400 hover:underline">reserve your date</Link>{" "}
                  or check the{" "}
                  <Link href="/services" className="text-gold-400 hover:underline">packages &amp; pricing</Link>.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
