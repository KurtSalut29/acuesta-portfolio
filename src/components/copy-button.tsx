"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

const styles = {
  default: "h-12 border-line text-ink hover:border-ink",
  inverted: "h-12 border-page/30 text-page hover:border-page",
};

export function CopyButton({
  value,
  label,
  variant = "default",
  className = "",
}: {
  value: string;
  label: string;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          window.location.href = `mailto:${value}`;
        }
      }}
      className={`inline-flex shrink-0 items-center justify-center gap-2 border px-5 text-[12.5px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
