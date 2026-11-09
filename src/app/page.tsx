import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Download,
  FileText,
  Layers,
  Mail,
  Monitor,
  PenTool,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BottomBar } from "@/components/bottom-bar";
import { CertificateIndex } from "@/components/certificate-index";
import { CopyButton } from "@/components/copy-button";
import { CountUp } from "@/components/count-up";
import { Navbar } from "@/components/navbar";
import { ProjectFeature } from "@/components/project-feature";
import { ToolLogo, ToolLogos } from "@/components/tool-logos";
import {
  certificates,
  navLinks,
  profile,
  projects,
  services,
  skillGroups,
  toolCount,
  type Service,
} from "@/lib/content";

const container = "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;
const stagger = (ms: number) => ({ "--d": ms }) as CSSProperties;

const serviceIcons: Record<Service["key"], LucideIcon> = {
  design: PenTool,
  planning: Workflow,
  ai: BrainCircuit,
  docs: FileText,
};

const socials = [
  { name: "Facebook", href: profile.facebookUrl },
  { name: "LinkedIn", href: profile.linkedinUrl },
] as const;

const buttonLabel = "text-[12.5px] font-semibold tracking-[0.14em] uppercase";
const h2 = "mt-4 text-[2.5rem] leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem]";

function SectionHead({
  eyebrow,
  id,
  children,
  aside,
}: {
  eyebrow: string;
  id: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div data-reveal="" className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow text-muted">{eyebrow}</p>
        <h2 id={id} className={h2}>
          {children}
        </h2>
      </div>
      {aside && <div className="max-w-sm lg:pb-2 lg:text-right">{aside}</div>}
    </div>
  );
}

export default function Home() {
  const stats = [
    { icon: Monitor, value: projects.length, label: "Featured systems" },
    { icon: Layers, value: services.length, label: "Service areas" },
    { icon: Wrench, value: toolCount, label: "Tools and technologies" },
    { icon: Award, value: certificates.length, label: "Certificates" },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] bg-ink px-4 py-2 font-semibold text-page focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        {/* ───────────── Hero ───────────── */}
        <section id="top" aria-label="Introduction" className="relative overflow-hidden">
          <div
            className={`${container} grid items-center gap-14 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-6 lg:pt-36 lg:pb-20`}
          >
            <div className="text-center lg:col-span-6 lg:text-left">
              <p className="rise eyebrow text-muted" style={delay(0)}>
                Hi, I&apos;m {profile.name}
              </p>
              <h1 className="mt-6 text-[clamp(2.6rem,10.5vw,5.1rem)] leading-[1.02] tracking-[-0.025em]">
                <span className="wipe" style={delay(0)}>
                  Turning Ideas Into
                </span>
                <span className="wipe" style={delay(1)}>
                  Clean, Useful
                </span>
                <span className="wipe italic" style={delay(2)}>
                  Digital Systems.
                </span>
              </h1>
              <span aria-hidden="true" className="draw-x mx-auto mt-8 block h-px w-14 bg-ink lg:mx-0" style={delay(3)} />
              <p className="rise mx-auto mt-7 max-w-md leading-relaxed sm:text-lg lg:mx-0" style={delay(3)}>
                I&apos;m a {profile.role} studying Computer Science at {profile.school}. I plan the system, design
                the screens, and build them, with AI where it helps.
              </p>
              <div
                className="rise mx-auto mt-9 grid max-w-sm grid-cols-2 gap-3 sm:flex sm:max-w-none sm:justify-center lg:justify-start"
                style={delay(4)}
              >
                <a
                  href="#work"
                  className={`group inline-flex h-12 items-center justify-center gap-2.5 bg-ink px-4 text-page transition-opacity hover:opacity-85 sm:px-7 ${buttonLabel}`}
                >
                  View my work
                  <ArrowRight
                    aria-hidden="true"
                    className="hidden size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 min-[400px]:block"
                  />
                </a>
                <Link
                  href="/resume"
                  className={`inline-flex h-12 items-center justify-center gap-2.5 border border-ink px-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-page sm:px-7 ${buttonLabel}`}
                >
                  <FileText aria-hidden="true" className="hidden size-4 min-[400px]:block" />
                  Résumé
                </Link>
              </div>
              <a
                href="#services"
                className="rise mt-16 hidden items-center gap-4 text-[11px] font-semibold tracking-[0.2em] text-ink uppercase lg:inline-flex"
                style={delay(5)}
              >
                <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-line">
                  <span className="run-down absolute inset-x-0 top-0 h-1/3 bg-ink" />
                </span>
                Scroll down
              </a>
            </div>

            {/* Portrait */}
            <figure className="group relative mx-auto w-[min(76vw,320px)] lg:col-span-5 lg:col-start-8 lg:w-full lg:max-w-[440px]">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="absolute top-1/2 left-1/2 w-[128%] -translate-x-1/2 -translate-y-1/2 text-line"
              >
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.35" pathLength="1" className="trace" />
              </svg>
              <div aria-hidden="true" className="dots rise absolute -top-6 -right-8 size-32 sm:-right-12 sm:size-40" style={delay(3)} />
              <div aria-hidden="true" className="dots rise absolute -bottom-8 -left-8 size-24 sm:size-28" style={delay(4)} />

              <div className="relative aspect-[4/5]">
                {/* Hover: the halo swells and the portrait lifts toward the viewer. Each
                    sits in its own wrapper because the entrance animations own scale/translate. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[6%] top-[10%] aspect-square transition-[scale] duration-700 ease-out-expo group-hover:scale-[1.12]"
                >
                  <div className="halo size-full rounded-full" />
                </div>
                <div className="portrait person-in absolute inset-0">
                  <Image
                    src={profile.cutout}
                    alt="Portrait of John Ivan Acuesta in a black suit, white shirt and black tie."
                    fill
                    preload
                    quality={90}
                    sizes="(min-width: 1024px) 440px, 76vw"
                    className="origin-bottom object-contain object-bottom transition-[scale,translate] duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Centered with flex, not translate: the entrance animation owns `translate`. */}
              <figcaption className="absolute inset-x-0 -bottom-5 flex justify-center lg:-right-6 lg:left-auto lg:justify-end">
                <span
                  className="rise flex items-center gap-3 bg-ink px-5 py-3 whitespace-nowrap text-page"
                  style={delay(5)}
                >
                  <span className="font-serif text-xl italic">Ivan.</span>
                  <span aria-hidden="true" className="h-4 w-px bg-page/30" />
                  <span className="text-[10.5px] font-semibold tracking-[0.18em] uppercase">BS Computer Science</span>
                </span>
              </figcaption>

              <div aria-hidden="true" className="absolute inset-y-0 -right-12 hidden items-center xl:flex">
                <p
                  className="rise text-[10.5px] font-semibold tracking-[0.3em] whitespace-nowrap text-muted uppercase [writing-mode:vertical-rl]"
                  style={delay(6)}
                >
                  Design · Systems · AI
                </p>
              </div>
            </figure>
          </div>
        </section>

        {/* ───────────── Services ───────────── */}
        <section id="services" aria-labelledby="services-title" className="py-16 lg:py-24">
          <div className={container}>
            <SectionHead
              eyebrow="What I do"
              id="services-title"
              aside={<p className="leading-relaxed">Four ways I help turn a real problem into a working digital solution.</p>}
            >
              Services
            </SectionHead>

            <ul className="mt-12 grid border-y border-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {services.map((service, i) => {
                const Icon = serviceIcons[service.key];
                return (
                  <li
                    key={service.key}
                    data-reveal=""
                    style={stagger(i * 100)}
                    className={`border-line ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l" : ""} ${
                      i >= 2 ? "sm:border-t lg:border-t-0" : ""
                    } ${i > 0 ? "lg:border-l" : ""}`}
                  >
                    <div className="group h-full p-6 transition-colors duration-500 hover:bg-ink sm:p-7">
                      <Icon
                        aria-hidden="true"
                        className="size-7 text-ink transition-[color,translate] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:text-page"
                        strokeWidth={1.4}
                      />
                      <h3 className="mt-6 font-sans text-[13px] font-bold tracking-[0.14em] uppercase transition-colors duration-500 group-hover:text-page">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed transition-colors duration-500 group-hover:text-page/75">
                        {service.text}
                      </p>
                      <ul className="mt-5 space-y-2 border-t border-line pt-5 transition-colors duration-500 group-hover:border-page/20">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-sm text-ink transition-colors duration-500 group-hover:text-page"
                          >
                            <span aria-hidden="true" className="mt-[0.6em] h-px w-2.5 shrink-0 bg-current" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ───────────── Work ───────────── */}
        <section id="work" aria-labelledby="work-title" className="overflow-x-clip py-16 lg:py-24">
          <div className={container}>
            <SectionHead
              eyebrow="Featured work"
              id="work-title"
              aside={
                <p className="leading-relaxed">
                  Two systems, shown on laptop and phone. Tap a screen to see it full size.
                </p>
              }
            >
              Selected <em>Projects</em>
            </SectionHead>
            <div className="mt-14 space-y-24 lg:mt-20 lg:space-y-36">
              {projects.map((project, i) => (
                <ProjectFeature key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── About ───────────── */}
        <section id="about" aria-labelledby="about-title" className="mt-10 bg-soft py-16 lg:mt-16 lg:py-24">
          <div className={`${container} grid items-center gap-14 lg:grid-cols-12 lg:gap-10`}>
            <div data-reveal="" className="lg:col-span-4">
              <p className="eyebrow text-muted">About me</p>
              <h2 id="about-title" className="mt-4 text-[2.3rem] leading-[1.05] tracking-[-0.02em] sm:text-[2.7rem]">
                I design for people, <em>then build it to work.</em>
              </h2>
              <p className="mt-6 leading-relaxed">
                I&apos;m {profile.fullName}, a Computer Science student at {profile.school}. I like taking a
                real-world problem, planning the system behind it, designing screens that feel simple, and building
                them, adding AI where it actually helps.
              </p>
              <p aria-hidden="true" className="signature mt-6 font-script text-[2.7rem] leading-none text-ink sm:text-[3.2rem]">
                John Ivan Acuesta
              </p>
              <Link
                href="/resume"
                className={`group mt-7 inline-flex h-12 items-center gap-2.5 border border-ink px-6 text-ink transition-colors duration-300 hover:bg-ink hover:text-page ${buttonLabel}`}
              >
                Download CV
                <Download
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
                />
              </Link>
            </div>

            {/* Framed typographic print */}
            <div data-reveal="" style={stagger(120)} className="mx-auto w-full max-w-[320px] lg:col-span-4 lg:max-w-none">
              <div className="group relative mx-auto aspect-[4/5] w-full max-w-[340px] rotate-[-1.5deg] border-[10px] border-ink bg-page p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out-expo hover:rotate-0 sm:p-9">
                <div className="flex h-full flex-col justify-between border border-line p-5 sm:p-6">
                  <p className="font-sans text-[2.1rem] leading-[0.95] font-extrabold tracking-[-0.03em] text-ink uppercase sm:text-[2.5rem]">
                    Plan it.
                    <br />
                    Design it.
                    <br />
                    Build it.
                  </p>
                  <p className="text-[10px] font-semibold tracking-[0.24em] text-muted uppercase">I/A · 2026</p>
                </div>
              </div>
            </div>

            <ul className="divide-y divide-line border-y border-line lg:col-span-4">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <li key={label} data-reveal="" style={stagger(i * 90)} className="flex items-center gap-5 py-5">
                  <Icon aria-hidden="true" className="size-6 shrink-0 text-ink" strokeWidth={1.4} />
                  <span className="w-16 font-serif text-[2.4rem] leading-none text-ink">
                    <CountUp value={value} />
                  </span>
                  <span className="text-[11.5px] font-semibold tracking-[0.16em] text-muted uppercase">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────────── Skills ───────────── */}
        <section id="skills" aria-labelledby="skills-title" className="overflow-x-clip py-16 lg:py-24">
          <div className={container}>
            <SectionHead
              eyebrow="Skills and tools"
              id="skills-title"
              aside={
                <p className="leading-relaxed">
                  The technologies and tools I use to plan, design, build, and improve digital solutions, across my
                  academic and personal projects.
                </p>
              }
            >
              The tools <em>I work with.</em>
            </SectionHead>

            <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {skillGroups.map((group, i) => (
                <div key={group.title} data-reveal="" style={stagger(i * 100)} className="bg-page p-6 sm:p-7">
                  <h3 className="text-[1.6rem] leading-tight">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{group.text}</p>
                  <ToolLogos items={group.items} label={group.title} className="mt-6" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Certificates ───────────── */}
        <section id="certificates" aria-labelledby="certificates-title" className="pb-16 lg:pb-24">
          <div className={container}>
            <SectionHead
              eyebrow="Certificates"
              id="certificates-title"
              aside={<p className="leading-relaxed">Courses, seminars, and webinars I&apos;ve completed. Open any one to see it.</p>}
            >
              Always <em>learning.</em>
            </SectionHead>
            <div className="mt-12 lg:mt-14">
              <CertificateIndex items={certificates} />
            </div>
          </div>
        </section>

        {/* ───────────── Contact ───────────── */}
        <section id="contact" aria-labelledby="contact-title" className={container}>
          <div data-reveal="" className="relative overflow-hidden bg-ink px-6 py-14 text-page sm:px-12 lg:px-16 lg:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full border border-page/15"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 size-52 rounded-full border border-page/15"
            />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow text-page/60">Have a project in mind?</p>
                <h2
                  id="contact-title"
                  className="mt-5 text-[2.4rem] leading-[1.02] tracking-[-0.02em] text-page sm:text-5xl lg:text-[3.8rem]"
                >
                  Let&apos;s create something <em>useful</em> together.
                </h2>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-7 inline-block font-sans text-[clamp(0.95rem,3.4vw,1.15rem)] font-medium tracking-[0.04em] text-page [overflow-wrap:anywhere] decoration-1 underline-offset-8 hover:underline"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
                <a
                  href={`mailto:${profile.email}`}
                  className={`group inline-flex h-12 items-center justify-center gap-2.5 bg-page px-6 text-ink transition-opacity hover:opacity-90 ${buttonLabel}`}
                >
                  <Mail aria-hidden="true" className="size-4" />
                  Let&apos;s work together
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  />
                </a>
                <CopyButton value={profile.email} label="Copy email" variant="inverted" />
                <ul aria-label="Social profiles" className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-start">
                  {socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 py-1 text-sm font-semibold text-page/75 transition-colors hover:text-page"
                      >
                        <ToolLogo name={social.name} className="size-4" />
                        {social.name}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${container} pt-16 pb-[calc(env(safe-area-inset-bottom)+6.5rem)] lg:pb-10`}>
        <div className="grid gap-10 border-b border-line pb-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" className="inline-flex items-center gap-3.5">
              <span className="font-serif text-[2.2rem] leading-none tracking-[-0.06em] text-ink">I/A</span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold tracking-[0.2em] text-ink uppercase">{profile.name}</span>
                <span className="block text-[10.5px] font-medium tracking-[0.16em] text-muted uppercase">
                  UI/UX Designer · Developer
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Planning, designing, and building user-friendly systems.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow text-ink">Quick links</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-ink">Services</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.key}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-ink">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="[overflow-wrap:anywhere] transition-colors hover:text-ink">
                  {profile.email}
                </a>
              </li>
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                  >
                    <ToolLogo name={social.name} className="size-3.5" />
                    {social.name}
                  </a>
                </li>
              ))}
              <li>{profile.school}</li>
              <li>
                <Link href="/resume" className="inline-flex items-center gap-1.5 font-semibold text-ink">
                  Résumé
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {profile.fullName}. All rights reserved.</p>
          <a href="#top" className="group inline-flex items-center gap-2 font-semibold tracking-[0.16em] text-ink uppercase">
            Back to top
            <span className="grid size-8 place-items-center rounded-full border border-line transition-[translate,border-color] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:border-ink">
              <ArrowUp aria-hidden="true" className="size-3.5" />
            </span>
          </a>
        </div>
      </footer>

      <BottomBar />
    </>
  );
}
