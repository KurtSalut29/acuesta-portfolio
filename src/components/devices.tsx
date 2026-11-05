import Image from "next/image";
import type { Shot } from "@/lib/content";

/**
 * A laptop drawn in CSS: a bezel around a 16:10 screen and a thin base with a notch.
 * The lid opens on its hinge and the screen gains color as it scrolls into view
 * (.lid / .to-color in globals.css).
 */
export function Laptop({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <div className="relative">
      <div className="lid relative mx-auto w-[88%] rounded-t-[14px] bg-bezel p-[2.2%] pb-[2.6%] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)] ring-1 ring-line">
        <span aria-hidden="true" className="absolute top-[0.9%] left-1/2 size-1 -translate-x-1/2 rounded-full bg-white/25" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-black">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            quality={90}
            sizes={sizes}
            className="to-color object-cover object-top"
          />
          {/* Glass reflection */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.08),transparent_35%)]"
          />
        </div>
      </div>
      {/* Base */}
      <div className="relative mx-auto h-[14px] w-full rounded-b-[14px] bg-[linear-gradient(180deg,#d9d9d9,#a3a3a3)] shadow-[0_18px_30px_-16px_rgba(0,0,0,0.45)] dark:bg-[linear-gradient(180deg,#3a3a3a,#1f1f1f)] sm:h-[18px]">
        <span aria-hidden="true" className="absolute top-0 left-1/2 h-[5px] w-[14%] -translate-x-1/2 rounded-b-md bg-black/15 dark:bg-white/10" />
      </div>
    </div>
  );
}

/** A phone drawn in CSS: rounded bezel, a pill-shaped camera island, and the screen. */
export function Phone({ shot, sizes, className = "" }: { shot: Shot; sizes: string; className?: string }) {
  return (
    <div
      className={`relative rounded-[2.1rem] bg-bezel p-[3.5%] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.6)] ring-1 ring-line ${className}`}
    >
      <div
        className="relative overflow-hidden rounded-[1.65rem] bg-black"
        style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
      >
        <Image src={shot.src} alt={shot.alt} fill quality={90} sizes={sizes} className="to-color object-cover object-top" />
        <span
          aria-hidden="true"
          className="absolute top-[1.4%] left-1/2 h-[2.4%] w-[30%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </div>
  );
}
