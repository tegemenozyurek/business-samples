import { TemplateShell } from "@/components/TemplateShell";

export default function SipLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TemplateShell template="sip">{children}</TemplateShell>;
}
