import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 750, alt: post.title }],
    },
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Render the body as paragraphs (content is stored as a single block in data/index.ts)
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-gold-400 text-xs font-sans tracking-widest uppercase mb-8 transition-colors"
          >
            <ArrowLeft size={13} /> Journal
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <span className="label-overline">{post.category}</span>
            <span className="text-white/50 text-xs font-sans flex items-center gap-1">
              <Clock size={10} /> {post.readTime}
            </span>
          </div>
          <h1 className="text-display-lg text-white">{post.title}</h1>
        </div>
      </section>

      {/* Article body */}
      <article className="section-pad dark:bg-obsidian bg-ivory">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <p className="text-warm-gray/60 text-xs font-sans tracking-wide uppercase mb-10">{post.date}</p>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="dark:text-white/80 text-obsidian/80 font-sans text-base leading-loose mb-6"
              >
                {para}
              </p>
            ))}

            <div className="divider-gold my-12" />

            <div className="flex items-center justify-between flex-wrap gap-6">
              <p className="text-warm-gray text-sm font-sans">
                Written by <span className="dark:text-white text-obsidian">RK photography</span>
              </p>
              <Link href="/contact" className="btn-ghost-dark">
                Discuss a session <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* More articles */}
      <section className="section-pad dark:bg-charcoal bg-white">
        <div className="container-luxury">
          <span className="label-overline block mb-10">More from the Journal</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {more.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-5">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <span className="label-overline">{p.category}</span>
                <h3 className="font-display text-xl dark:text-white text-obsidian font-light leading-snug group-hover:text-gold-400 transition-colors mt-2">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
