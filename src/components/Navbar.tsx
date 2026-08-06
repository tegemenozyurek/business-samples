"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/language";
import { useTemplate } from "@/lib/template";
import { getNavCopy } from "@/lib/translations";
import { Logo } from "./Logo";

function CartBadge({ count, pulse }: { count: number; pulse: number }) {
  if (count <= 0) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={`${count}-${pulse}`}
        className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--background)] px-1 text-[10px] font-bold text-[var(--accent)] ring-2 ring-[var(--accent)]"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.2, 1], opacity: 1 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {count > 99 ? "99+" : count}
      </motion.span>
    </AnimatePresence>
  );
}

export function Navbar() {
  const { lang } = useLanguage();
  const template = useTemplate();
  const copy = getNavCopy(template, lang);
  const pathname = usePathname();
  const cart = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showCartIcon = template === "sip";
  const cartCount = cart?.count ?? 0;
  const cartPulse = cart?.pulse ?? 0;

  const isActive = (href: string) => {
    if (href === copy.homeHref) {
      return pathname === href || pathname === `${href}/`;
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const ctaClassName =
    "relative inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 py-2.5 text-[12px] font-medium tracking-[0.14em] text-background uppercase transition-all duration-300 hover:opacity-90";

  const ctaContent = (
    <>
      {copy.cta}
      {showCartIcon ? (
        <span className="relative inline-flex">
          <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        </span>
      ) : null}
      {showCartIcon ? <CartBadge count={cartCount} pulse={cartPulse} /> : null}
    </>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        isMenuOpen
          ? "border-b border-border bg-background shadow-[0_8px_32px_var(--nav-shadow)]"
          : isScrolled
            ? "border-b border-border bg-[var(--nav-bg)] shadow-[0_8px_32px_var(--nav-shadow)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-10"
        aria-label={copy.ariaLabel}
      >
        <Logo href={copy.homeHref} />

        <ul className="hidden items-center gap-10 md:flex">
          {copy.links.map((link) => {
            const active = isActive(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                    active
                      ? "text-heading"
                      : "text-muted hover:text-heading"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[var(--accent)] transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <motion.div
              animate={cartPulse > 0 ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={copy.ctaHref}
                className={ctaClassName}
                data-cart-target={showCartIcon ? "true" : undefined}
                aria-label={
                  showCartIcon && cartCount > 0
                    ? `${copy.cta}, ${cartCount} ürün`
                    : copy.cta
                }
              >
                {ctaContent}
              </Link>
            </motion.div>
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          {showCartIcon ? (
            <motion.div
              animate={cartPulse > 0 ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={copy.ctaHref}
                data-cart-target="true"
                aria-label={
                  cartCount > 0 ? `${copy.cta}, ${cartCount} ürün` : copy.cta
                }
                className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-accent bg-accent text-background transition-opacity duration-300 hover:opacity-90"
              >
                <ShoppingCart className="h-4 w-4" strokeWidth={2} />
                <CartBadge count={cartCount} pulse={cartPulse} />
              </Link>
            </motion.div>
          ) : null}

          <button
            type="button"
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--icon-border)] bg-[var(--icon-bg)] transition-colors duration-300 hover:border-[var(--icon-hover-border)] hover:bg-[var(--icon-hover-bg)]"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu}
          >
            <span className="sr-only">
              {isMenuOpen ? copy.closeMenu : copy.openMenu}
            </span>
            <span className="relative h-3.5 w-5">
              <span
                className={`absolute left-0 h-px w-full bg-heading transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-heading transition-all duration-300 ease-out ${
                  isMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-heading transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ease-out theme-light:bg-black/30 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        <div
          className={`absolute inset-x-0 top-20 border-b border-border bg-background px-6 pb-10 pt-6 transition-all duration-500 ease-out ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {copy.links.map((link, index) => {
              const active = isActive(link.href);

              return (
                <li
                  key={link.href}
                  className={`transition-all duration-500 ease-out ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 60 + 80}ms` : "0ms",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`block border-b border-border py-4 text-sm font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${
                      active
                        ? "text-heading"
                        : "text-foreground hover:text-heading"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li
              className={`pt-4 transition-all duration-500 ease-out ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: isMenuOpen
                  ? `${copy.links.length * 60 + 80}ms`
                  : "0ms",
              }}
            >
              <Link
                href={copy.ctaHref}
                onClick={closeMenu}
                className={`${ctaClassName} w-full`}
              >
                {ctaContent}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
