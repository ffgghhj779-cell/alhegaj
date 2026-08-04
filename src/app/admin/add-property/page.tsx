import type { Metadata } from "next";
import AdminShell from "@/components/AdminShell";
import AddPropertyForm from "./AddPropertyForm";

export const metadata: Metadata = {
  title: "إضافة عقار",
  description: "لوحة إضافة عقار جديد إلى منصة الحجاز العقارية.",
  robots: { index: false, follow: false },
};

export default function AddPropertyPage() {
  return (
    <AdminShell
      title="إضافة عقار"
      description="أدخلوا بيانات العقار وحدّدوا موقعه بدقة على الخريطة كما سيظهر للعملاء."
      backHref="/properties"
      backLabel="العودة للعقارات"
    >
      <div className="surface-card p-6 sm:p-9">
        <AddPropertyForm />
      </div>
    </AdminShell>
  );
}
