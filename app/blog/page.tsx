"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Search, ArrowRight, Clock } from "lucide-react";
import { blogPosts, blogCategories } from "@/data";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  );
}

export default function BlogPage() {
  const [query,    setQuery]    = useState("");
  const [category, setCategory] = useState("All");

  const filtered = blogPosts.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchQ   = !query || p.title.toLowerCase().includes(query.toLowerCase()) ||
                     p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const featured = blogPosts.filter((p) => p.featured);

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-16 dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="label-overline block mb-5">Thoughts & Technique</span>
            <h1 className="text-display-lg dark:text-white text-obsidian">Journal</h1>
          </motion.div>
        </div>
      </section>

      {/* Featured articles */}
      <section className="pb-16 dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <Reveal>
            <span className="label-overline block mb-8">Featured</span>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden blog-img-wrap mb-5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold-400 text-obsidian text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-1.5">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="label-overline">{post.category}</span>
                    <span className="text-warm-gray text-xs font-sans flex items-center gap-1">
                      <Clock size={10} /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl dark:text-white text-obsidian font-light leading-tight group-hover:text-gold-400 transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-warm-gray text-sm font-sans leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <p className="text-warm-gray/50 text-xs font-sans mt-3">{post.date}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* All posts with filters */}
      <section className="section-pad dark:bg-charcoal bg-white">
        <div className="container-luxury">
          {/* Search + filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input
                className="input-luxury pl-6"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-xs font-sans tracking-widest uppercase border transition-all ${
                    category === cat
                      ? "bg-gold-400 text-obsidian border-gold-400"
                      : "dark:border-white/10 border-obsidian/10 dark:text-white/50 text-obsidian/50 hover:border-gold-400/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-warm-gray font-sans">No articles match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.06}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="relative aspect-[4/3] overflow-hidden mb-5">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="label-overline">{post.category}</span>
                      <span className="w-1 h-1 rounded-full bg-warm-gray/30" />
                      <span className="text-warm-gray text-xs font-sans flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-xl dark:text-white text-obsidian font-light leading-snug group-hover:text-gold-400 transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-warm-gray text-sm font-sans line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-warm-gray/50 text-xs font-sans">{post.date}</p>
                      <span className="text-gold-400 text-xs font-sans flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
