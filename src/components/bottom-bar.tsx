"use client";

import { Award, Briefcase, Layers, Mail, User, Wrench, type LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { navLinks } from "@/lib/content";
import { useActiveSection } from "@/lib/use-active-section";
import { toggleTheme, useIsDark } from "@/lib/theme";

const icons: Record<string, LucideIcon> = {
  "#services": Layers,
  "#work": Briefcase,
  "#about": User,
  "#skills": Wrench,
  "#certificates": Award,
  "#contact": Mail,
};

const hrefs = ["#top", ...navLinks.map((link) => link.href)];

/**
 * Phones and tablets: an inverted bar floating at the bottom. A disc slides under the
 * active section and inverts it, the same marker as the desktop navbar.
 */
export function BottomBar() {
  const active = useActiveSection(hrefs);
  const isDark = useIsDark();
  const listRef = useRef<HTMLUListElement>(null);
  const discRef = useRef<HTMLSpanElement>(null);
  const themeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const disc = discRef.current;
    if (!list || !disc) return;

    const place = () => {
      const link = list.querySelector<HTMLElement>(`a[href="${active}"]`);
      if (!link) {
        disc.style.opacity = "0";
        return;
      }
      const wasHidden = disc.style.opacity !== "1";
      if (wasHidden) disc.style.transitionProperty = "opacity";
      disc.style.translate = `${link.offsetLeft + (link.offsetWidth - disc.offsetWidth) / 2}px 0`;
      if (wasHidden) {
        void disc.offsetWidth;
        disc.style.transitionProperty = "";
      }
      disc.style.opacity = "1";
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden"
    >
      <div className="isolate flex h-[60px] w-full max-w-[420px] items-center rounded-full bg-ink px-1 text-page min-[380px]:px-1.5 shadow-[0_20px_44px_-18px_rgba(0,0,0,0.6)]">
        <ul ref={listRef} className="relative flex flex-1 items-center justify-between">
          {navLinks.map((link) => {
            const Icon = icons[link.href];
            return (
              <li key={link.href} className="flex-1">
                <a
                  href={link.href}
                  aria-label={link.label}
                  aria-current={active === link.href ? "true" : undefined}
                  className="mx-auto grid size-9 place-items-center min-[380px]:size-11"
                >
                  <Icon aria-hidden="true" className="size-[19px]" strokeWidth={1.8} />
                </a>
              </li>
            );
          })}
          <span
            ref={discRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 size-9 rounded-full bg-white min-[380px]:size-11 opacity-0 mix-blend-difference transition-[translate,opacity] duration-500 ease-out-expo"
          />
        </ul>
        <span aria-hidden="true" className="mx-0.5 h-6 w-px shrink-0 bg-page/25 min-[380px]:mx-1" />
        <button
          ref={themeRef}
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label="Dark mode"
          onClick={() => toggleTheme(themeRef.current)}
          className="grid size-9 shrink-0 place-items-center rounded-full min-[380px]:size-11"
        >
          <span
            aria-hidden="true"
            className="block size-[18px] rounded-full border-[1.5px] border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)] transition-transform duration-700 ease-out-expo dark:rotate-180"
          />
        </button>
      </div>
    </nav>
  );
}
