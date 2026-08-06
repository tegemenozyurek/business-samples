import { Fraunces, Outfit } from "next/font/google";
import "./sip-home.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export default function SipLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${outfit.variable} ${fraunces.variable} sip-home min-h-full`}>
      {children}
    </div>
  );
}
