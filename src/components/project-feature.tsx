"use client";

import { ArrowUpRight, Expand } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";
import { Laptop, Phone } from "./devices";
import { useImageViewer } from "./image-viewer";
import { ToolLogos } from "./tool-logos";

/**
 * One project: a laptop mockup (with a phone beside it when the project has a mobile
 * app) and the write-up. Projects alternate sides on large screens. Tapping a device
 * opens that screenshot full size.
 */
export function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const { open, viewer } = useImageViewer();
  const flip = index % 2 === 1;

  const show = (which: "laptop" | "phone") => {
    const shot = which === "laptop" ? project.laptop : project.phone!;
    open({
      src: shot.full,
      alt: shot.alt,
      title: `${project.name}: ${which === "laptop" ? "Desktop" : "Mobile"}`,
      subtitle: shot.alt,
      width: shot.width,
      height: shot.height,
    });
  };

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="grid scroll-mt-24 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10"
    >
      {/* Devices */}
      <div className={`relative isolate min-w-0 lg:col-span-7 ${flip ? "lg:col-start-6 lg:row-start-1" : ""}`}>
        <div aria-hidden="true" className="absolute inset-x-[6%] top-[6%] bottom-[4%] -z-10 rounded-[4px] bg-soft" />
        <div className={`relative px-[4%] pt-[8%] pb-[6%] ${project.phone ? "pr-[16%]" : ""}`}>
          <button
            type="button"
            onClick={() => show("laptop")}
            aria-label={`View the ${project.name} desktop screenshot full size`}
            className="group relative block w-full text-left"
          >
            <Laptop shot={project.laptop} sizes="(min-width: 1024px) 680px, 92vw" />
            <span className="absolute top-4 right-[10%] grid size-9 place-items-center rounded-full bg-page text-ink shadow-lg transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
              <Expand aria-hidden="true" className="size-4" />
            </span>
          </button>

          {project.phone && (
            <button
              type="button"
              onClick={() => show("phone")}
              aria-label={`View the ${project.name} mobile screenshot full size`}
              className="phone-up group absolute right-[3%] bottom-[2%] block w-[24%] text-left"
            >
              <Phone
                shot={project.phone}
                sizes="(min-width: 1024px) 160px, 24vw"
                className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
              />
            </button>
          )}
        </div>
      </div>

      {/* Write-up */}
      <div
        data-reveal=""
        style={{ "--d": 120 } as CSSProperties}
        className={`lg:col-span-5 ${flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"}`}
      >
        <p className="eyebrow text-muted">{project.category}</p>
        <h3 id={`${project.id}-title`} className="mt-4 text-[2.6rem] leading-none tracking-[-0.02em] sm:text-[3.4rem]">
          {project.name}
        </h3>
        <p className="mt-3 font-serif text-xl text-ink italic sm:text-2xl">{project.tagline}</p>
        <span aria-hidden="true" className="mt-6 block h-px w-12 bg-ink" />
        <p className="mt-6 leading-relaxed">{project.summary}</p>

        <ul className="mt-6 space-y-3 border-t border-line pt-6">
          {project.points.map((point) => (
            <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" />
              {point}
            </li>
          ))}
        </ul>

        <p className="eyebrow mt-7 text-muted">Built with</p>
        <ToolLogos items={project.tools} label={`Tools used to build ${project.name}`} size="sm" className="mt-3" />

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={() => show("laptop")}
            className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-[12.5px] font-semibold tracking-[0.14em] text-ink uppercase"
          >
            {project.phone ? "View desktop" : "View screenshot"}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
          {project.phone && (
            <button
              type="button"
              onClick={() => show("phone")}
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-[12.5px] font-semibold tracking-[0.14em] text-ink uppercase"
            >
              View mobile
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          )}
        </div>
      </div>
      {viewer}
    </article>
  );
}
