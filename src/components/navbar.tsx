"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { navLinks, profile } from "@/lib/content";
import { useActiveSection } from "@/lib/use-active-section";
import { ThemeToggle } from "./theme-toggle";

const hrefs = ["#top", ...navLinks.map((link) => link.href)];

/**
 * Large screens: a bar pinned to the top. The active section is marked by a block that
 * inverts whatever sits under it (mix-blend-difference), so the link reads white on
 * black in light mode and black on white in dark mode. Phones use the bottom bar.
 */
export function Navbar() {
  const active = useActiveSection(hrefs);
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const blockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Moves the block onto the active link, straight from the DOM so it follows width
  // changes (fonts loading, resizes) without extra renders.
  useEffect(() => {
    const list = listRef.current;
    const block = blockRef.current;
    if (!list || !block) return;

    const place = () => {
      const link = list.querySelector<HTMLElement>(`a[href="${active}"]`);
      if (!link) {
        block.style.opacity = "0";
        return;
      }
      const wasHidden = block.style.opacity !== "1";
      if (wasHidden) block.style.transitionProperty = "opacity";
      block.style.translate = `${link.offsetLeft}px 0`;
      block.style.width = `${link.offsetWidth}px`;
      if (wasHidden) {
        void block.offsetWidth;
        block.style.transitionProperty = "";
      }
      block.style.opacity = "1";
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 hidden border-b bg-page transition-[border-color,height] duration-500 lg:block ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-10 transition-[height] duration-500 ease-out-expo ${
          scrolled ? "h-16" : "h-[84px]"
        }`}
      >
        <a href="#top" className="rise group flex items-center gap-3.5" aria-label={`${profile.name}, back to top`}>
          <span className="font-serif text-[2rem] leading-none tracking-[-0.06em] text-ink">
            I<span className="inline-block transition-transform duration-500 ease-out-expo group-hover:rotate-12">/</span>A
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-semibold tracking-[0.2em] text-ink uppercase">{profile.name}</span>
            <span className="block text-[10.5px] font-medium tracking-[0.16em] text-muted uppercase">
              UI/UX Designer · Developer
            </span>
          </span>
        </a>

        <ul
          ref={listRef}
          className="rise relative isolate flex items-center bg-page"
          style={{ "--i": 1 } as CSSProperties}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className="block px-3.5 py-2 text-[12.5px] font-semibold tracking-[0.14em] text-ink uppercase xl:px-4"
              >
                {link.label}
              </a>
            </li>
          ))}
          <span
            ref={blockRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 bg-white opacity-0 mix-blend-difference transition-[translate,width,opacity] duration-500 ease-out-expo"
          />
        </ul>

        <div className="rise flex items-center gap-3" style={{ "--i": 2 } as CSSProperties}>
          <ThemeToggle />
          <a
            href="#contact"
            className="group inline-flex h-11 items-center gap-2.5 bg-ink px-5 text-[12.5px] font-semibold tracking-[0.14em] text-page uppercase transition-opacity duration-300 hover:opacity-85"
          >
            Let&apos;s talk
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
