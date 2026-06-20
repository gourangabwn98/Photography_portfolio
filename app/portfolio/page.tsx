"use client";

import { Suspense, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { portfolioImages, portfolioCategories } from "@/data";

type PortfolioImage = (typeof portfolioImages)[number];

function PortfolioGrid() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") ?? "all";

  const [active,    setActive]    = useState(initialCat);
  const [lightbox,  setLightbox]  = useState<PortfolioImage | null>(null);

  const filtered = active === "all"
    ? portfolioImages
    : portfolioImages.filter((img) => img.category === active);

  const openLightbox = (img: PortfolioImage) => setLightbox(img);
  const closeLightbox = () => setLightbox(null);

  const navigate = useCallback((dir: 1 | -1) => {
    if (!lightbox) return;
    const idx = filtered.findIndex((i) => i.id === lightbox.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next);
  }, [lightbox, filtered]);

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-16 dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="label-overline block mb-5">The Work</span>
            <h1 className="text-display-lg dark:text-white text-obsidian mb-6">
              Portfolio
            </h1>
            <p className="text-warm-gray max-w-lg font-sans text-sm leading-relaxed">
              A curated selection spanning weddings, portraits, fashion, events, travel, and commercial — each image a precise moment captured with intention.
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-3 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-5 py-2.5 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-300 ${
                  active === cat.id
                    ? "bg-gold-400 text-obsidian"
                    : "border border-current dark:text-white/40 text-obsidian/40 hover:dark:text-white hover:text-obsidian"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="pb-28 dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <div className="masonry-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  className="masonry-item"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                >
                  <button
                    onClick={() => openLightbox(img)}
                    className="block w-full group relative overflow-hidden focus-visible:ring-2 ring-gold-400"
                    aria-label={`View ${img.alt} fullscreen`}
                  >
                    <div className={`relative w-full ${
                      img.aspect === "tall"   ? "aspect-[3/4]" :
                      img.aspect === "wide"   ? "aspect-[4/3]" :
                      "aspect-square"
                    }`}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/40 transition-all duration-500 flex items-center justify-center">
                        <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-obsidian/80">
                        <p className="text-white text-sm font-sans">{img.alt}</p>
                        <span className="label-overline text-gold-400 mt-1 block capitalize">{img.category}</span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-10 h-10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
              aria-label="Close lightbox"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox.id}
              className="relative max-w-5xl max-h-[85vh] mx-auto px-16"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  quality={95}
                  priority
                />
              </div>
              <div className="absolute bottom-4 left-16 right-16 flex items-center justify-between">
                <p className="text-white/70 text-sm font-sans">{lightbox.alt}</p>
                <span className="label-overline text-gold-400 capitalize">{lightbox.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={null}>
      <PortfolioGrid />
    </Suspense>
  );
}
