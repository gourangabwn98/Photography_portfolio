// ─────────────────────────────────────────────────────────────
// Central content/data source for the Elara Voss Studio site.
// Everything components render comes from here, so the site's
// copy can be edited in one place.
// ─────────────────────────────────────────────────────────────

export const photographer = {
  name: "Elara Voss",
  studio: "Elara Voss Studio",
  tagline: "Light, held still.",
  subTagline: "Editorial-grade wedding, portrait, and commercial photography.",
  email: "hello@elaravoss.com",
  phone: "+13105550142",
  whatsapp: "13105550142",
  instagram: "@elaravoss",
  location: "Los Angeles, California",
  bio: "I make photographs for people who notice the difference between a smile and a real one.",
  story:
    "I started shooting on a borrowed Leica in Marrakech and never really stopped. Twelve years later, the camera has changed four times but the question hasn't: what does this person look like when they forget they're being looked at? That's the frame I wait for. Everything else — the gear, the light, the location — is just how I get there.",
  stats: {
    shoots: "540+",
    clients: "310+",
    years: "12",
    awards: "9",
  },
  equipment: [
    { name: "Leica SL2-S", role: "Primary body" },
    { name: "Sony A7R V", role: "Secondary body" },
    { name: "50mm f/1.4", role: "Signature portrait lens" },
    { name: "Profoto B10", role: "Location lighting" },
  ],
  awards: [
    "Sony World Photography Awards — Portrait Finalist, 2017",
    "International Photography Awards — Gold, Portrait Category, 2021",
    "Fearless Photographers — Hall of Fame, 2023",
    "Published in Vogue, The New York Times, and PDN",
    "Resene Photography Awards — Finalist, 2024",
  ],
};

export const clientLogos = ["VOGUE", "NYT", "PDN", "Condé Nast", "Net-a-Porter", "Reformation"];

// ── Hero slideshow ──
export const heroSlides = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85", alt: "Bride and groom at golden hour" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=85", alt: "Editorial portrait in natural light" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=85", alt: "Wedding reception candid moment" },
];

// ── Portfolio ──
export const portfolioCategories = [
  { id: "all",        label: "All Work" },
  { id: "weddings",   label: "Weddings" },
  { id: "portraits",  label: "Portraits" },
  { id: "fashion",    label: "Fashion" },
  { id: "commercial", label: "Commercial" },
];

export const portfolioImages = [
  { id: 1,  src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=85", alt: "Bride walking down the aisle",        category: "weddings",   aspect: "tall" },
  { id: 2,  src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=85", alt: "Studio portrait, dramatic light",      category: "portraits",  aspect: "square" },
  { id: 3,  src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=900&q=85", alt: "Wedding rings on linen",               category: "weddings",   aspect: "wide" },
  { id: 4,  src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=85", alt: "Editorial fashion shoot, rooftop",     category: "fashion",    aspect: "tall" },
  { id: 5,  src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=85", alt: "Couple's first dance",                 category: "weddings",   aspect: "square" },
  { id: 6,  src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=85", alt: "Product photography for skincare line", category: "commercial", aspect: "wide" },
  { id: 7,  src: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=900&q=85", alt: "Black and white portrait, window light", category: "portraits",  aspect: "tall" },
  { id: 8,  src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=85", alt: "Bride's bouquet detail",               category: "weddings",   aspect: "square" },
  { id: 9,  src: "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=900&q=85", alt: "Fashion campaign, studio cyc wall",    category: "fashion",    aspect: "tall" },
  { id: 10, src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=85", alt: "Founder portrait for brand campaign",  category: "commercial", aspect: "square" },
  { id: 11, src: "https://images.unsplash.com/photo-1525258049639-da9c1be7a40c?w=900&q=85", alt: "Reception toast, candid",              category: "weddings",   aspect: "wide" },
  { id: 12, src: "https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=900&q=85", alt: "Editorial close-up portrait",          category: "portraits",  aspect: "tall" },
];

// ── Services ──
export const services = [
  {
    id: "wedding",
    icon: "Heart",
    title: "Weddings",
    tagline: "Full-day coverage",
    description: "Documentary-style coverage of your full day, from getting-ready light to the last dance, delivered as a story rather than a checklist.",
    startingAt: 3800,
    featured: true,
  },
  {
    id: "portrait",
    icon: "User",
    title: "Portraits",
    tagline: "Individual & family",
    description: "Studio or location portrait sessions for individuals, couples, and families who want images that hold up on a wall, not just a feed.",
    startingAt: 650,
    featured: false,
  },
  {
    id: "fashion",
    icon: "Sparkles",
    title: "Fashion & Editorial",
    tagline: "Lookbooks & campaigns",
    description: "Concept-driven editorial work for designers and labels — lookbooks, campaign imagery, and tear-sheet-ready stories.",
    startingAt: 1900,
    featured: false,
  },
  {
    id: "commercial",
    icon: "Briefcase",
    title: "Commercial & Brand",
    tagline: "Product & founder imagery",
    description: "Brand and product photography for companies that need images doing real marketing work, not stock-photo filler.",
    startingAt: 2200,
    featured: false,
  },
  {
    id: "engagement",
    icon: "Calendar",
    title: "Engagements",
    tagline: "Pre-wedding sessions",
    description: "A relaxed hour together before the wedding — partly to get comfortable in front of the camera, partly because the in-between moments matter too.",
    startingAt: 480,
    featured: false,
  },
  {
    id: "destination",
    icon: "Globe",
    title: "Destination",
    tagline: "Travel anywhere",
    description: "Available worldwide for destination weddings and campaigns. Travel and logistics are handled as part of the quote, not an afterthought.",
    startingAt: 5200,
    featured: false,
  },
];

// ── Testimonials ──
export const testimonials = [
  {
    quote: "Elara photographed our wedding like she'd known us for years. Every image still feels like the actual day, not a performance of it.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    name: "Maya & Theo Lindqvist",
    role: "Wedding client, 2024",
    rating: 5,
  },
  {
    quote: "We've worked with a lot of commercial photographers. Elara is the only one who asked about the brand before asking about the shot list.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80",
    name: "Daniel Osei",
    role: "Marketing Director, Lumen Skincare",
    rating: 5,
  },
  {
    quote: "My family portraits had been the same stiff lineup for a decade. Elara got my kids to forget the camera existed within ten minutes.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    name: "Priya Chandrasekaran",
    role: "Family portrait client",
    rating: 5,
  },
];

export const instagramPosts = portfolioImages.slice(0, 6).map((img) => ({ src: img.src, alt: img.alt }));

// ── Pricing ──
export const pricingPackages = [
  {
    id: "silver",
    name: "Silver",
    description: "A focused short session for portraits or small moments.",
    price: 650,
    hours: 2,
    images: 30,
    edits: 15,
    includes: [
      "2-hour session, one location",
      "30 high-resolution digital files",
      "15 hand-retouched images",
      "Private online gallery",
    ],
    featured: false,
  },
  {
    id: "gold",
    name: "Gold",
    description: "Full coverage for weddings, brand shoots, or events.",
    price: 3800,
    hours: 8,
    images: 120,
    edits: 60,
    includes: [
      "8-hour coverage, up to 3 locations",
      "120 high-resolution digital files",
      "60 hand-retouched images",
      "Private online gallery + USB delivery",
      "Same-week preview gallery",
      "1-hour engagement or pre-shoot session",
      "Commercial usage license",
    ],
    featured: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    description: "The full multi-day, destination-ready experience.",
    price: 7400,
    hours: 16,
    images: 300,
    edits: 150,
    includes: [
      "2-day coverage, unlimited locations",
      "300 high-resolution digital files",
      "150 hand-retouched images",
      "20×30 fine art print set",
      "Second photographer included",
      "International travel included",
      "Engagement session included",
      "Commercial usage license",
    ],
    featured: false,
  },
];

export const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

export const faqs = [
  {
    q: "How far in advance should I book?",
    a: "For weddings, 9–12 months is ideal, especially for peak season (May–October). Portrait and commercial sessions can often be booked 2–4 weeks out, though popular dates fill quickly.",
  },
  {
    q: "What's included in the retainer?",
    a: "A 30% non-refundable retainer secures your date and is applied toward your total package price. The remaining balance is due two weeks before your session.",
  },
  {
    q: "Do you travel for destination work?",
    a: "Yes — I shoot internationally several times a year. Travel and accommodation are quoted separately based on location and added to your package total.",
  },
  {
    q: "How long until I receive my images?",
    a: "Portrait sessions: 2 weeks. Weddings: 6–8 weeks, with a same-week sneak-peek gallery of 20–30 images delivered within 72 hours.",
  },
  {
    q: "Can I print my own images?",
    a: "All packages include personal printing rights. Commercial and brand work includes a commercial usage license as outlined in your contract.",
  },
];

// ── Blog ──
export const blogCategories = ["All", "Technique", "Weddings", "Business", "Behind the Scenes"];

export const blogPosts = [
  {
    id: 1,
    slug: "finding-light-in-overcast-weddings",
    title: "Finding Light in Overcast Weddings",
    excerpt: "Cloudy skies aren't a problem to fix — they're the largest, softest light source you'll ever get for free.",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=85",
    category: "Technique",
    readTime: "6 min",
    date: "May 14, 2026",
    featured: true,
    content:
      "Most couples apologize for an overcast forecast as if it ruins the day. It doesn't. An overcast sky behaves like a softbox the size of the horizon — even, directionless, and forgiving on skin. The work shifts from controlling harsh light to finding shape inside flat light: doorways, tree lines, and architecture become your contrast. I look for one consistent direction of light across a scene, then position the couple so it wraps rather than flattens. The biggest mistake is fighting the gray sky with flash; instead, expose for skin and let the sky read pale and quiet in the background. Some of my favorite wedding frames came from days planners called 'a washout.'",
  },
  {
    id: 2,
    slug: "the-case-for-a-first-look",
    title: "The Case for a First Look",
    excerpt: "A first look isn't a compromise on tradition — it's extra time with the people who matter, before the day gets loud.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85",
    category: "Weddings",
    readTime: "4 min",
    date: "April 2, 2026",
    featured: true,
    content:
      "Couples often ask whether skipping the ceremony reveal for a private first look 'ruins the surprise.' In my experience it does the opposite — it adds a second, quieter surprise earlier in the day, away from a hundred phone cameras. It also buys back time. Portraits that would otherwise be squeezed into twenty rushed minutes before dinner happen in genuine daylight, unhurried. The ceremony entrance still carries its own charge; it just isn't doing double duty as the only moment two people see each other.",
  },
  {
    id: 3,
    slug: "how-i-price-a-shoot",
    title: "How I Actually Price a Shoot",
    excerpt: "A behind-the-curtain look at what goes into a quote — and why the cheapest photographer is rarely the best value.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=85",
    category: "Business",
    readTime: "7 min",
    date: "March 18, 2026",
    featured: false,
    content:
      "A quote isn't just an hourly rate times hours booked. It accounts for editing time (often 3–4x the shoot length), gear depreciation, insurance, second-shooter coordination, and the years it took to shoot reliably in difficult light. Cheaper quotes usually mean shorter editing time, fewer deliverables, or a less experienced second shooter. None of that is wrong for every budget — but it's worth knowing what you're trading when you compare two numbers.",
  },
  {
    id: 4,
    slug: "behind-the-shot-lumen-campaign",
    title: "Behind the Shot: The Lumen Skincare Campaign",
    excerpt: "A breakdown of the lighting setup, location scouting, and client back-and-forth behind a recent commercial campaign.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=85",
    category: "Behind the Scenes",
    readTime: "5 min",
    date: "February 9, 2026",
    featured: false,
    content:
      "Lumen wanted imagery that felt closer to fine-art still life than typical product photography. We scouted four studios before settling on one with usable north-facing skylight, then supplemented with a single bounced strobe to keep shadows soft but directional. The brief asked for 'quiet luxury' — which in practice meant negative space, restraint in prop styling, and shooting far more frames than usual to find the two or three that felt effortless rather than staged.",
  },
  {
    id: 5,
    slug: "packing-list-for-destination-weddings",
    title: "My Packing List for Destination Weddings",
    excerpt: "Twelve years of travel mistakes, distilled into the gear bag I now bring to every international booking.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=85",
    category: "Behind the Scenes",
    readTime: "5 min",
    date: "January 22, 2026",
    featured: false,
    content:
      "Two bodies, always — never one camera with a backup left at the hotel. A battery count that assumes a full day with no outlet. A dedicated pouch for memory cards that have already been shot, separated physically from blank ones, because confusing the two at hour fourteen is how data gets lost. And always, always, a printed copy of the timeline, because phones die and group chats don't work without signal.",
  },
  {
    id: 6,
    slug: "directing-people-who-hate-cameras",
    title: "Directing People Who Hate Being Photographed",
    excerpt: "Most people don't dislike how they look — they dislike not knowing what to do with their hands. Here's how I fix that.",
    image: "https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=1200&q=85",
    category: "Technique",
    readTime: "6 min",
    date: "December 30, 2025",
    featured: false,
    content:
      "Give people a task, not a pose. 'Walk toward me and stop when it feels too close' produces better body language than 'stand here and smile.' Most awkwardness in portraits comes from idle hands and an audience of one (the lens) staring back without blinking. I talk constantly during a session — not directions so much as ordinary conversation — because a relaxed jaw and an unguarded laugh can't be art-directed, only invited.",
  },
];
