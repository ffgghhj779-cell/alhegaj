"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-surface">
      <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">حدث خطأ</p>
        <h1 className="heading-page mt-3">تعذّر تحميل الصفحة</h1>
        <p className="body-lead mt-5 max-w-md">
          نعتذر عن الإزعاج. يمكنكم المحاولة مرة أخرى أو العودة للرئيسية.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-gold">
            إعادة المحاولة
          </button>
          <Link href="/" className="btn-dark">
            الرئيسية
          </Link>
        </div>
      </div>
    </section>
  );
}
