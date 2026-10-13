import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Fraunces, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { SiteHeader } from "@/components/site-header";
import { defaultLang, isLang } from "@/lib/translations";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  title: "YojanaMitra: find government schemes you qualify for",
  description:
    "Tell us a little about yourself and discover government schemes you may qualify for.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const saved = store.get("lang")?.value;
  const lang = isLang(saved) ? saved : defaultLang;

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${devanagari.variable}`}
    >
      <body className="bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider lang={lang}>
            <SiteHeader />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}