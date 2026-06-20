# Elara Voss Studio

A luxury photography studio site built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Structure

```
app/                    Routes (App Router)
  layout.tsx            Root layout, fonts, theme provider, metadata
  page.tsx              Home
  portfolio/page.tsx     Filterable masonry gallery + lightbox
  about/page.tsx         Bio, timeline, equipment, client logos
  services/page.tsx      Pricing packages, comparison table, FAQ
  booking/page.tsx       4-step booking flow
  blog/page.tsx           Journal index (search + category filter)
  blog/[slug]/page.tsx    Individual article page
  contact/page.tsx        Contact form + direct contact info
components/
  layout/                Navbar, Footer
  sections/               HeroSection, HomeSections (home page blocks)
  ui/                     WhatsAppButton
data/index.ts            All site content/copy in one place — edit here
lib/utils.ts              cn() classname helper
```

## What was fixed from the original draft

- `next.config.js` now whitelists `images.unsplash.com` for `next/image` (was missing → runtime crash).
- `tailwind.config.ts` sets `darkMode: "class"` (was missing → all `dark:` classes were inert) and adds the custom color/font tokens (`obsidian`, `ivory`, `charcoal`, `gold-400`, `warm-gray`, `font-display/sans/mono`).
- `HeroSection.tsx`: `duration-1500` → `duration-[1500ms]` (Tailwind's default scale stops at 1000, so the crossfade was previously instant).
- `app/portfolio/page.tsx`: now reads `?cat=` from the URL via `useSearchParams` (wrapped in `<Suspense>`) so the Footer's category links (e.g. `/portfolio?cat=weddings`) actually pre-filter the grid. The local `type Image` shadowing `next/image`'s `Image` import was renamed to `PortfolioImage`.
- Added the two pages that were linked but never built: `/contact` and `/blog/[slug]`.
- Removed a couple of unused imports (`motion` in `Footer.tsx`, `services`/unused index param in the Services FAQ) that ESLint would otherwise flag.
- `app/globals.css` is now fully written out — every custom class referenced in the components (`.btn-primary`, `.label-overline`, `.masonry-grid`, `.input-luxury`, `.lightbox-overlay`, etc.) is defined, along with the `text-display-hero/lg/md` type scale and the `ken-burns` keyframe.
- `data/index.ts` is fully populated (photographer profile, portfolio images, services, pricing, FAQs, blog posts, etc.) so every page renders real content out of the box.

All files were run through a structural TypeScript/JSX check with stubbed module types — no syntax or structural errors. A full `next build` couldn't be run in this sandbox (no network access to install `node_modules`), so do run `npm install && npm run build` yourself before deploying to catch anything environment-specific.
