import Link from "next/link";
import { SITE } from "@/lib/navigation";

export default function NotFound() {
  return (
    <section className="bg-surface">
      <div className="page-shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold">٤٠٤</p>
        <h1 className="heading-page mt-4">الصفحة غير موجودة</h1>
        <p className="body-lead mt-5 max-w-md">
          عذراً، لم نتمكن من العثور على الصفحة المطلوبة. يمكنكم العودة للرئيسية
          أو تصفح عقارات {SITE.nameAr}.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-dark">
            الرئيسية
          </Link>
          <Link href="/properties" className="btn-gold">
            العقارات
          </Link>
        </div>
      </div>
    </section>
  );
}
