import type { Metadata } from "next";
import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { prisma } from "@/lib/prisma";
import {
  SERVICE_REQUEST_STATUS_LABELS,
  type ServiceRequestStatusKey,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "طلبات الخدمات",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function statusClass(status: string) {
  switch (status) {
    case "New":
      return "bg-gold text-black";
    case "InProgress":
      return "bg-gold/20 text-gold-soft";
    case "Completed":
      return "bg-white/10 text-white/80";
    default:
      return "bg-black/40 text-muted";
  }
}

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusFilter } = await searchParams;

  const where =
    statusFilter &&
    ["New", "InProgress", "Completed", "Cancelled"].includes(statusFilter)
      ? { status: statusFilter as "New" | "InProgress" | "Completed" | "Cancelled" }
      : undefined;

  let requests: Awaited<ReturnType<typeof prisma.serviceRequest.findMany>> = [];
  let counts = { all: 0, New: 0, InProgress: 0, Completed: 0, Cancelled: 0 };

  try {
    const [list, grouped, all] = await Promise.all([
      prisma.serviceRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      prisma.serviceRequest.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
      prisma.serviceRequest.count(),
    ]);
    requests = list;
    counts.all = all;
    for (const row of grouped) {
      counts[row.status] = row._count._all;
    }
  } catch {
    requests = [];
  }

  const filters: { key: string; label: string; count: number }[] = [
    { key: "", label: "الكل", count: counts.all },
    { key: "New", label: "جديد", count: counts.New },
    { key: "InProgress", label: "قيد المتابعة", count: counts.InProgress },
    { key: "Completed", label: "مكتمل", count: counts.Completed },
    { key: "Cancelled", label: "ملغي", count: counts.Cancelled },
  ];

  return (
    <AdminShell
      title="طلبات الخدمات"
      description="كل الطلبات الواردة من نماذج الخدمات على الموقع — تابعوا الحالة وتواصلوا مع العميل."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active =
            (filter.key === "" && !statusFilter) ||
            statusFilter === filter.key;
          return (
            <Link
              key={filter.label}
              href={
                filter.key
                  ? `/admin/requests?status=${filter.key}`
                  : "/admin/requests"
              }
              className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition-colors ${
                active
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-border text-muted hover:border-gold/40 hover:text-gold-soft"
              }`}
            >
              {filter.label}
              <span className="rounded bg-black/30 px-1.5 py-0.5" dir="ltr">
                {filter.count}
              </span>
            </Link>
          );
        })}
      </div>

      {requests.length === 0 ? (
        <div className="surface-card p-8 text-center">
          <p className="body-copy">لا توجد طلبات في هذا التصنيف حالياً.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {requests.map((request) => {
            const status = request.status as ServiceRequestStatusKey;
            return (
              <li key={request.id}>
                <Link
                  href={`/admin/requests/${request.id}`}
                  className="surface-card flex flex-col gap-3 p-5 transition-[border-color,transform] hover:border-gold/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-[0.7rem] font-semibold ${statusClass(request.status)}`}
                      >
                        {SERVICE_REQUEST_STATUS_LABELS[status]}
                      </span>
                      <span className="text-[0.7rem] text-muted" dir="ltr">
                        #{request.id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    <h2 className="mt-2 text-base font-semibold text-foreground">
                      {request.serviceTitle}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {request.name}
                      {request.city ? ` — ${request.city}` : ""} ·{" "}
                      <span dir="ltr">{request.phone}</span>
                    </p>
                  </div>
                  <time
                    className="shrink-0 text-xs text-muted"
                    dateTime={request.createdAt.toISOString()}
                  >
                    {new Intl.DateTimeFormat("ar-SA", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(request.createdAt)}
                  </time>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </AdminShell>
  );
}
