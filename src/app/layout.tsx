import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { LayoutShell } from "@/components/LayoutShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Qeva",
    template: "Qeva",
  },
  description: "Premium digital agency crafting exceptional brand experiences.",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
    shortcut: ["/favicon.svg"],
  },
};

const themeInitScript = `(function(){try{var root=document.documentElement;var t=localStorage.getItem("qeva-theme");var a=localStorage.getItem("qeva-accent");if(t==="ember")t="latte";if(t==="meadow")t="mint";var themes={dark:1,light:1,latte:1,mint:1,corporate:1};var accents={red:1,green:1,blue:1};root.setAttribute("data-theme",themes[t]?t:"dark");if((themes[t]?t:"dark")==="corporate"){root.setAttribute("data-accent",accents[a]?a:"red");}else{root.removeAttribute("data-accent");}}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Script
          id="qeva-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
