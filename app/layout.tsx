import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Banner } from "../components/global/Banner";
import Footer from "../components/global/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://nuvyxui.vercel.app/"),
  title: "Nuvyx UI",
  description:
    "Nuvyx UI is a premium collection of customizable UI components for Next.js applications. Built with Tailwind CSS, Framer Motion, and TypeScript for responsive, accessible, and beautiful interfaces.",
  keywords: [
    "Next.js components",
    "React UI library",
    "Tailwind CSS components",
    "TypeScript UI kit",
    "Framer Motion animations",
    "nuvyx UI",
    "frontend development",
    "web components",
  ],
  authors: [{ name: "Mihir Jaiswal", url: "https://x.com/nuvyx_ui" }],
  creator: "Mihir Jaiswal",
  publisher: "Mihir Jaiswal",
  openGraph: {
    title: "Nuvyx UI | Beautiful UI Components for Next.js",
    description:
      "Build stunning Next.js applications faster with Nuvyx UI components. Powered by Tailwind CSS and Framer Motion.",
    images: [{ url: "/docs/docs-cover.png", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuvyx UI | Modern React Components for Next.js",
    description:
      "Build stunning Next.js applications faster with Nuvyx UI components. Powered by Tailwind CSS and Framer Motion.",
    images: ["/docs/docs-cover.png"],
    creator: "@nuvyx_ui",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Web Development",
  alternates: {
    canonical: "https://nuvyxui.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white dark:bg-[#0A0A0A]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Banner />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
