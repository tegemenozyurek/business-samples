import { TemplateShell } from "@/components/TemplateShell";

export default function RezLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TemplateShell template="rez">{children}</TemplateShell>;
}
