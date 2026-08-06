import { TemplateShell } from "@/components/TemplateShell";
import { RezFooter } from "@/components/rez/RezFooter";

export default function RezSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TemplateShell template="rez" footer={<RezFooter />}>
      {children}
    </TemplateShell>
  );
}
