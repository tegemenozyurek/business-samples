import Image from "next/image";
import Link from "next/link";
import logoImage from "@/images/logoDarkTheme.webp";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center transition-opacity duration-300 hover:opacity-80 ${className}`}
      aria-label="Qeva - Ana Sayfa"
    >
      <Image
        src={logoImage}
        alt="Qeva"
        width={160}
        height={107}
        priority
        fetchPriority="high"
        sizes="256px"
        className="h-16 w-auto theme-light:brightness-0"
      />
    </Link>
  );
}
