import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by the script in layout.tsx.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/** True while the dark theme is on. Re-renders when any control changes the theme. */
export function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
}

/**
 * Flips black and white. With View Transitions the new theme opens as a diamond from the
 * button that was pressed; otherwise colors crossfade, and reduced motion swaps instantly.
 */
export function toggleTheme(origin?: HTMLElement | null) {
  const root = document.documentElement;
  const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }

  if (!document.startViewTransition) {
    root.classList.add("theme-fade");
    apply();
    window.setTimeout(() => root.classList.remove("theme-fade"), 500);
    return;
  }

  const box = origin?.getBoundingClientRect();
  const x = box ? box.left + box.width / 2 : window.innerWidth / 2;
  const y = box ? box.top + box.height / 2 : 0;
  // A diamond reaches the farthest corner once its half-diagonal covers both distances.
  const r = Math.max(x, window.innerWidth - x) + Math.max(y, window.innerHeight - y);
  const diamond = (d: number) => `polygon(${x}px ${y - d}px, ${x + d}px ${y}px, ${x}px ${y + d}px, ${x - d}px ${y}px)`;

  const transition = document.startViewTransition(apply);
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [diamond(0), diamond(r)] },
        {
          duration: 800,
          easing: "cubic-bezier(0.7, 0, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {});
}
