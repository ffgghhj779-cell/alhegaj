import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { SITE } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: `سياسة الخصوصية لمنصة ${SITE.nameAr} وطريقة التعامل مع بيانات التواصل.`,
};

export default function PrivacyPage() {
  return (
    <section className="bg-surface">
      <div className="page-shell section-y max-w-3xl">
        <FadeIn>
          <p className="eyebrow">قانوني</p>
          <h1 className="heading-page mt-3">سياسة الخصوصية</h1>
          <p className="body-lead mt-5">
            نحترم خصوصيتكم. توضح هذه الصفحة كيف نتعامل مع البيانات التي تشاركونها
            عبر نموذج التواصل.
          </p>

          <div className="surface-card mt-10 space-y-8 p-6 sm:p-9">
            <section>
              <h2 className="heading-card">البيانات التي نجمعها</h2>
              <p className="body-copy mt-3">
                عند إرسال نموذج التواصل قد تتضمن البيانات: الاسم، رقم الجوال، نوع
                الاهتمام، ونص الرسالة. لا نطلب بيانات بطاقات ائتمان عبر الموقع.
              </p>
            </section>

            <section>
              <h2 className="heading-card">كيف نستخدم البيانات</h2>
              <p className="body-copy mt-3">
                تُستخدم حصراً للرد على طلبكم وتقديم الاستشارة العقارية. عند
                الإرسال يتم توجيه رسالة منسّقة إلى واتساب الإدارة عبر رابط
                wa.me لإتمام التواصل مباشرة.
              </p>
            </section>

            <section>
              <h2 className="heading-card">المشاركة مع أطراف ثالثة</h2>
              <p className="body-copy mt-3">
                لا نبيع بياناتكم. قد تمر الرسالة عبر تطبيق واتساب (ميتا) وفق
                سياساتهم عند فتح المحادثة على جهازكم.
              </p>
            </section>

            <section>
              <h2 className="heading-card">التواصل معنا</h2>
              <p className="body-copy mt-3">
                لأي استفسار حول الخصوصية:{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-medium text-gold hover:text-gold-mid"
                  dir="ltr"
                >
                  {SITE.email}
                </a>
              </p>
            </section>
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex text-sm font-medium text-gold transition-colors hover:text-gold-mid"
          >
            العودة لصفحة التواصل
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
