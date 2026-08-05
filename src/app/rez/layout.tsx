import { Cormorant_Garamond, Manrope } from "next/font/google";
import { TemplateShell } from "@/components/TemplateShell";
import { RezFooter } from "@/components/rez/RezFooter";
import "./rez-home.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export default function RezLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${manrope.variable} ${cormorant.variable} rez-home min-h-full`}>
      <TemplateShell template="rez" footer={<RezFooter />}>
        {children}
      </TemplateShell>
    </div>
  );
}
