import {
  PlaceholderPage,
  buildMetadata,
} from "@/components/PlaceholderPage";

export const metadata = buildMetadata(
  "خدماتنا",
  "خدمات عقارية متكاملة من الاستشارة حتى التسليم بمعايير فاخرة.",
);

export default function ServicesPage() {
  return (
    <PlaceholderPage
      title="خدماتنا"
      description="صفحة قيد التطوير — ستتضمن تفاصيل خدماتنا الاستشارية والتسويقية والإدارية."
    />
  );
}
