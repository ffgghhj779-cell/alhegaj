import type { Metadata } from "next";
import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "دخول الإدارة",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="bg-surface">
      <div className="page-shell flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md surface-card p-6 sm:p-8">
          <p className="eyebrow">لوحة التحكم</p>
          <h1 className="heading-card mt-3">دخول الإدارة</h1>
          <p className="body-copy mt-3">
            أدخلوا كلمة المرور للوصول إلى إضافة وإدارة العقارات.
          </p>
          <div className="mt-7">
            <Suspense fallback={<div className="h-28 animate-pulse rounded-md bg-surface" />}>
              <AdminLoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
