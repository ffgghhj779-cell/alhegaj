import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import RequestStatusForm from "@/components/RequestStatusForm";
import { prisma } from "@/lib/prisma";
import { buildClientFollowUpWhatsAppUrl } from "@/lib/service-requests";
import {
  getServiceBySlug,
  getServiceFieldLabel,
  SERVICE_REQUEST_STATUS_LABELS,
  type ServiceRequestStatusKey,
} from "@/lib/services";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "تفاصيل طلب خدمة",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminRequestDetailPage({ params }: PageProps) {
  const { id } = await params;

  let request = null;
  try {
    request = await prisma.serviceRequest.findUnique({ where: { id } });
  } catch {
    request = null;
  }

  if (!request) notFound();

  const service = getServiceBySlug(request.serviceSlug);
  const status = request.status as ServiceRequestStatusKey;
  const details =
    request.details &&
    typeof request.details === "object" &&
    !Array.isArray(request.details)
      ? (request.details as Record<string, string>)
      : {};

  const waUrl = buildClientFollowUpWhatsAppUrl(
    request.serviceTitle,
    request.id.slice(-8).toUpperCase(),
    request.phone,
  );

  return (
    <AdminShell
      title="تفاصيل الطلب"
      description={request.serviceTitle}
      backHref="/admin/requests"
      backLabel="كل الطلبات"
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
            <time
              className="text-xs text-muted"
              dateTime={request.createdAt.toISOString()}
            >
              {new Intl.DateTimeFormat("ar-SA", {
                dateStyle: "full",
                timeStyle: "short",
              }).format(request.createdAt)}
            </time>
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
              <dt className="text-xs text-muted">المدينة</dt>
              <dd className="mt-1 font-semibold">
                {request.city || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">الخدمة</dt>
              <dd className="mt-1 font-semibold">{request.serviceTitle}</dd>
            </div>
          </dl>

          <div>
            <h2 className="heading-card text-base">تفاصيل الطلب</h2>
            <ul className="mt-4 space-y-3">
              {Object.keys(details).length === 0 ? (
                <li className="text-sm text-muted">لا توجد حقول إضافية.</li>
              ) : (
                Object.entries(details).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex justify-between gap-4 border-b border-border/60 py-2 text-sm"
                  >
                    <span className="text-muted">
                      {service
                        ? getServiceFieldLabel(service, key)
                        : key}
                    </span>
                    <span className="font-medium text-foreground">{value}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {request.notes ? (
            <div>
              <h2 className="heading-card text-base">ملاحظات العميل</h2>
              <p className="body-copy mt-3 whitespace-pre-line">
                {request.notes}
              </p>
            </div>
          ) : null}
        </article>

        <aside className="space-y-4">
          <div className="surface-card p-5">
            <RequestStatusForm id={request.id} current={request.status} />
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex w-full min-h-11"
          >
            <MessageCircle className="size-4" aria-hidden />
            واتساب العميل
          </a>
          {service ? (
            <Link
              href={`/services/${service.slug}`}
              className="btn-dark flex w-full min-h-11"
            >
              صفحة الخدمة
            </Link>
          ) : null}
        </aside>
      </div>
    </AdminShell>
  );
}
