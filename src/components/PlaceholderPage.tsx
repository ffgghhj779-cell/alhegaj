import type { Metadata } from "next";
import Link from "next/link";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mb-5 h-px w-14 bg-gold" aria-hidden />
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-lg text-base leading-8 text-muted">{description}</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-sm border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
      >
        العودة للرئيسية
      </Link>
    </section>
  );
}

export function buildMetadata(title: string, description: string): Metadata {
  return { title, description };
}
