"use client";

import { useRef } from "react";
import { toggleTheme, useIsDark } from "@/lib/theme";

/**
 * A half-black, half-white disc. Each press turns it half a revolution, so the black
 * half swaps sides along with the page.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useIsDark();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => toggleTheme(ref.current)}
      className={`group grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-ink ${className}`}
    >
      <span
        aria-hidden="true"
        className="block size-[18px] rounded-full border-[1.5px] border-current bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)] text-ink transition-transform duration-700 ease-out-expo group-hover:scale-110 dark:rotate-180"
      />
    </button>
  );
}
