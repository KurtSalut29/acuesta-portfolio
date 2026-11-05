import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Mrs_Saint_Delafield } from "next/font/google";
import { RevealObserver } from "@/components/reveal-observer";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

// Only used for his signature in the About section.
const signature = Mrs_Saint_Delafield({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "John Ivan Acuesta · UI/UX Designer & Developer",
  description:
    "Portfolio of John Ivan Acuesta, a Computer Science student at Biliran Province State University who designs and builds user-friendly systems: UI/UX design, system planning, and AI.",
  authors: [{ name: "John Ivan Acuesta" }],
  openGraph: {
    title: "John Ivan Acuesta · UI/UX Designer & Developer",
    description: "Services, projects, skills, and certificates of John Ivan Acuesta.",
    type: "website",
  },
};

export const viewport: Viewport = {
  // Lets the bottom bar sit above the iPhone home indicator via env(safe-area-inset-bottom).
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Runs before first paint: use the saved theme, otherwise the system preference.
// Also marks JS as available so scroll reveals may start hidden.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}document.documentElement.classList.add("js")})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bodoni.variable} ${hanken.variable} ${signature.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
