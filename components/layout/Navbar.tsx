"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { photographer } from "@/data";

const navLinks = [
  { href: "/",          label: "Home"      },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about",     label: "About"     },
  { href: "/services",  label: "Services"  },
  { href: "/blog",      label: "Journal"   },
  { href: "/contact",   label: "Contact"   },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [mounted,     setMounted]     = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || !isHome || menuOpen
            ? "glass-dark py-4 border-b border-white/5"
            : "bg-transparent py-6"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span
              className="font-display text-xl font-light tracking-[0.12em] text-white"
              style={{ letterSpacing: "0.12em" }}
            >
              {photographer.name.split(" ")[0]}
            </span>
            <span
              className="font-mono text-[0.52rem] tracking-[0.35em] uppercase text-gold-400 mt-0.5"
            >
              {photographer.name.split(" ")[1]} Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link",
                  pathname === link.href && "active"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-white/60 hover:text-gold-400 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            <Link
              href="/booking"
              className="hidden lg:inline-flex btn-primary text-xs py-3 px-6"
            >
              Book Session
            </Link>

            <button
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass-dark flex flex-col pt-24 px-8 pb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col gap-6 mt-8" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-display text-3xl font-light text-white/80 hover:text-gold-400 transition-colors block",
                      pathname === link.href && "text-gold-400"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto">
              <div className="divider-gold mb-8" />
              <Link href="/booking" className="btn-primary w-full justify-center">
                Book a Session
              </Link>
              <p className="text-warm-gray text-xs mt-6 tracking-widest uppercase">
                {photographer.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
