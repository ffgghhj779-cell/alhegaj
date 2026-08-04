import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import ContactStatusForm from "@/components/ContactStatusForm";
import { prisma } from "@/lib/prisma";
import { buildClientFollowUpWhatsAppUrl } from "@/lib/service-requests";
import {
  SERVICE_REQUEST_STATUS_LABELS,
  type ServiceRequestStatusKey,
} from "@/lib/services";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "تفاصيل طلب تواصل",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminContactDetailPage({ params }: PageProps) {
  const { id } = await params;

  let request = null;
  try {
    request = await prisma.contactRequest.findUnique({ where: { id } });
  } catch {
    request = null;
  }

  if (!request) notFound();

  const status = request.status as ServiceRequestStatusKey;
  const waUrl = buildClientFollowUpWhatsAppUrl(
    `تواصل — ${request.interest}`,
    request.id.slice(-8).toUpperCase(),
    request.phone,
  );

  return (
    <AdminShell
      title="تفاصيل طلب التواصل"
      description={request.interest}
      backHref="/admin/contacts"
      backLabel="كل طلبات التواصل"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="surface-card space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-gold px-2.5 py-1 text-[0.7rem] font-semibold text-black">
              {SERVICE_REQUEST_STATUS_LABELS[status]}
            </span>
            <span className="text-xs text-muted" dir="ltr">
              #{request.id.slice(-8).toUpperCase()}
            </span>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">الاسم</dt>
              <dd className="mt-1 font-semibold">{request.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">الجوال</dt>
              <dd className="mt-1 font-semibold" dir="ltr">
                {request.phone}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">الاهتمام</dt>
              <dd className="mt-1 font-semibold">{request.interest}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">المصدر</dt>
              <dd className="mt-1 font-semibold">
                {request.source}
                {request.sourceRef ? ` · ${request.sourceRef}` : ""}
              </dd>
            </div>
          </dl>

          <div>
            <h2 className="heading-card text-base">الرسالة</h2>
            <p className="body-copy mt-3 whitespace-pre-line">
              {request.message}
            </p>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="surface-card p-5">
            <ContactStatusForm id={request.id} current={request.status} />
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark flex w-full min-h-11"
          >
            <MessageCircle className="size-4" aria-hidden />
            تواصل مع العميل
          </a>
          <p className="text-center text-[0.7rem] leading-6 text-muted">
            واتساب هنا أداة للمتابعة من الإدارة فقط بعد استلام الطلب.
          </p>
        </aside>
      </div>
    </AdminShell>
  );
}
