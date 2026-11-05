"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { profile, type Certificate } from "@/lib/content";
import { useImageViewer } from "./image-viewer";

/**
 * Certificates as an editorial index. On devices with a mouse, hovering a row shows a
 * preview of that certificate that follows the cursor; on touch screens each row shows
 * its own thumbnail. Any row opens the certificate full size.
 */
export function CertificateIndex({ items }: { items: Certificate[] }) {
  const { open, viewer } = useImageViewer();
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const follow = (event: MouseEvent) => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    const box = list.getBoundingClientRect();
    preview.style.translate = `${event.clientX - box.left}px ${event.clientY - box.top}px`;
  };

  const view = (cert: Certificate) =>
    open({
      src: cert.image,
      alt: `${cert.title} certificate awarded to ${profile.fullName} by ${cert.issuer}.`,
      title: cert.title,
      subtitle: `${cert.kind} · ${cert.issuer} · ${cert.date}`,
      width: cert.width,
      height: cert.height,
      pdf: cert.pdf,
    });

  return (
    <>
      <div
        ref={listRef}
        onMouseMove={follow}
        onMouseLeave={() => setHovered(null)}
        className="relative"
      >
        <ul className="border-t border-ink">
          {items.map((cert, i) => (
            <li
              key={cert.key}
              data-reveal=""
              style={{ "--d": i * 90 } as CSSProperties}
              className="border-b border-line"
            >
              <button
                type="button"
                onClick={() => view(cert)}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(null)}
                aria-label={`View ${cert.title} certificate`}
                className="group relative grid w-full grid-cols-[64px_1fr_auto] items-center gap-3.5 py-5 text-left sm:grid-cols-[110px_1fr_auto] sm:gap-6 lg:grid-cols-[130px_1fr_220px_auto] lg:py-7"
              >
                {/* Fill that sweeps in from the left on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-soft transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                />
                <span className="relative">
                  <time
                    dateTime={cert.dateTime}
                    className="eyebrow hidden text-muted lg:block"
                  >
                    {cert.date}
                  </time>
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[2px] border border-line bg-soft lg:hidden">
                    <Image
                      src={cert.image}
                      alt=""
                      fill
                      sizes="110px"
                      className="object-cover"
                    />
                  </span>
                </span>
                <span className="relative min-w-0">
                  <span className="block font-serif text-[1.08rem] leading-snug text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-[1.6rem] lg:text-[1.85rem]">
                    {cert.title}
                  </span>
                  <span className="mt-1 block text-sm">
                    {cert.issuer}
                    <span className="lg:hidden"> · {cert.date}</span>
                  </span>
                </span>
                <span className="eyebrow relative hidden text-muted lg:block">
                  {cert.kind}
                </span>
                <span className="relative grid size-8 place-items-center rounded-full border border-line text-ink sm:size-10 transition-[background-color,color,border-color,rotate] duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-page">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Cursor-following preview (mouse only) */}
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10 hidden [@media(hover:hover)]:lg:block"
        >
          <div
            className={`relative -translate-x-1/2 -translate-y-[115%] transition-[opacity,scale,rotate] duration-500 ease-out-expo ${
              hovered === null
                ? "scale-75 rotate-[-6deg] opacity-0"
                : "scale-100 rotate-[-3deg] opacity-100"
            }`}
          >
            {items.map((cert, i) => (
              <div
                key={cert.key}
                className={`w-[300px] overflow-hidden border-[6px] border-page bg-page shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] transition-opacity duration-300 ${
                  i === 0 ? "relative" : "absolute inset-0"
                } ${hovered === i ? "opacity-100" : "opacity-0"}`}
              >
                <div
                  className="relative"
                  style={{ aspectRatio: `${cert.width} / ${cert.height}` }}
                >
                  <Image
                    src={cert.image}
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {viewer}
    </>
  );
}
