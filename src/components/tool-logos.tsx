"use client";

import { BrainCircuit, ChartSpline, Database, MessageSquareText, TextSearch, type LucideIcon } from "lucide-react";
import type { FocusEvent, MouseEvent } from "react";
import { logoPaths } from "@/lib/logos";

// Skills that are methods, not products, have no logo: they get a pictogram instead.
const pictograms: Record<string, LucideIcon> = {
  SQL: Database,
  "Machine Learning": BrainCircuit,
  "Natural Language Processing (NLP)": MessageSquareText,
  "TF-IDF": TextSearch,
  "Logistic Regression": ChartSpline,
};

/** One tool's logo in currentColor, so it follows the theme. */
export function ToolLogo({ name, className = "size-6" }: { name: string; className?: string }) {
  const logo = logoPaths[name];
  if (logo) {
    return (
      <svg viewBox={logo.viewBox} fill="currentColor" aria-hidden="true" className={className}>
        <path d={logo.d} fillRule={logo.evenOdd ? "evenodd" : undefined} clipRule={logo.evenOdd ? "evenodd" : undefined} />
      </svg>
    );
  }
  const Icon = pictograms[name];
  if (Icon) return <Icon aria-hidden="true" strokeWidth={1.6} className={className} />;
  throw new Error(`No logo for "${name}". Add it to logos.ts or the pictograms in tool-logos.tsx.`);
}

/** Keep a tile's name label inside the viewport by nudging it sideways. */
function placeLabel(event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) {
  const label = event.currentTarget.querySelector<HTMLElement>("[data-label]");
  if (!label) return;
  label.style.setProperty("--shift", "0px");
  const box = label.getBoundingClientRect();
  const gutter = 12;
  let shift = 0;
  if (box.left < gutter) shift = gutter - box.left;
  else if (box.right > window.innerWidth - gutter) shift = window.innerWidth - gutter - box.right;
  label.style.setProperty("--shift", `${shift}px`);
}

/**
 * A row of tool logos. Each logo sits in a square tile that inverts on hover; its name
 * appears above it on hover, keyboard focus, or tap (tapping focuses the tile).
 */
export function ToolLogos({
  items,
  label,
  size = "md",
  className = "",
}: {
  items: readonly string[];
  label: string;
  size?: "md" | "sm";
  className?: string;
}) {
  const tile = size === "md" ? "size-12 sm:size-[3.25rem]" : "size-11";
  const icon = size === "md" ? "size-6" : "size-5";

  return (
    <ul aria-label={label} className={`flex flex-wrap gap-2.5 ${className}`}>
      {items.map((name) => (
        <li key={name} className="group/tool relative" onMouseEnter={placeLabel} onFocus={placeLabel}>
          <span
            role="img"
            aria-label={name}
            tabIndex={0}
            className={`grid ${tile} cursor-default place-items-center border border-line text-ink transition-[background-color,color,border-color,translate] duration-300 ease-out-expo outline-none group-hover/tool:-translate-y-0.5 group-hover/tool:border-ink group-hover/tool:bg-ink group-hover/tool:text-page focus-visible:border-ink focus-visible:bg-ink focus-visible:text-page`}
          >
            <ToolLogo name={name} className={icon} />
          </span>
          <span
            data-label=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 [translate:calc(-50%+var(--shift,0px))_6px] bg-ink px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] whitespace-nowrap text-page uppercase opacity-0 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] transition-[opacity,translate] duration-300 ease-out-expo group-focus-within/tool:[translate:calc(-50%+var(--shift,0px))_0] group-focus-within/tool:opacity-100 group-hover/tool:[translate:calc(-50%+var(--shift,0px))_0] group-hover/tool:opacity-100"
          >
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}
