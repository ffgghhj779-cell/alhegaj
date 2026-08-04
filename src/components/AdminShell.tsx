import Link from "next/link";
import type { ReactNode } from "react";
import { adminLogout } from "@/app/admin/login/actions";

type AdminShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
};

export default function AdminShell({
  title,
  description,
  children,
  backHref = "/",
  backLabel = "العودة للموقع",
}: AdminShellProps) {
  return (
    <section className="bg-surface">
      <div className="page-shell section-y-tight max-w-5xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href={backHref}
              className="text-sm font-medium text-gold transition-colors duration-300 hover:text-gold-mid"
            >
              {backLabel} →
            </Link>
            <h1 className="heading-page mt-5">{title}</h1>
            {description ? (
              <p className="body-copy mt-4 max-w-2xl">{description}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex flex-wrap gap-2 text-sm">
              <Link
                href="/admin/requests"
                className="rounded-md border border-border px-3 py-2 text-muted-strong transition-colors hover:border-gold/40 hover:text-gold"
              >
                الطلبات
              </Link>
              <Link
                href="/admin/add-property"
                className="rounded-md border border-border px-3 py-2 text-muted-strong transition-colors hover:border-gold/40 hover:text-gold"
              >
                إضافة عقار
              </Link>
            </nav>
            <form action={adminLogout}>
              <button
                type="submit"
                className="text-sm text-muted transition-colors hover:text-gold"
              >
                تسجيل الخروج
              </button>
            </form>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
