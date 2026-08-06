import { TemplateShell } from "@/components/TemplateShell";

export default function SipSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TemplateShell template="sip">{children}</TemplateShell>;
}
