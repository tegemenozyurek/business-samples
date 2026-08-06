import type { Metadata } from "next";
import { AdminPageView } from "@/components/admin/admin-page-view";

export const metadata: Metadata = {
  title: "Admin | Qeva Nail Studio",
  description: "Qeva Nail Studio randevu yönetim paneli.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RezAdminPage() {
  return <AdminPageView />;
}
