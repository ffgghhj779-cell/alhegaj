import type { Metadata } from "next";
import Link from "next/link";
import AddPropertyForm from "./AddPropertyForm";
import { adminLogout } from "../login/actions";

export const metadata: Metadata = {
  title: "إضافة عقار",
  description: "لوحة إضافة عقار جديد إلى منصة الحجاز العقارية.",
  robots: { index: false, follow: false },
};

export default function AddPropertyPage() {
  return (
    <section className="bg-surface">
      <div className="page-shell section-y-tight max-w-3xl">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href="/properties"
              className="text-sm font-medium text-gold transition-colors duration-300 hover:text-gold-mid"
            >
              العودة للعقارات →
            </Link>
            <h1 className="heading-page mt-5">إضافة عقار</h1>
            <p className="body-copy mt-4">
              أدخل بيانات العقار، واستخدم محاكاة الترميز الجغرافي لتعبئة الإحداثيات.
            </p>
          </div>
          <form action={adminLogout}>
            <button type="submit" className="text-sm text-muted transition-colors hover:text-gold">
              تسجيل الخروج
            </button>
          </form>
        </div>

        <div className="surface-card p-6 sm:p-9">
          <AddPropertyForm />
        </div>
      </div>
    </section>
  );
}
