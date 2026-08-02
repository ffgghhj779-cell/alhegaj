import {
  PlaceholderPage,
  buildMetadata,
} from "@/components/PlaceholderPage";

export const metadata = buildMetadata(
  "من نحن",
  "تعرف على رؤية الحجاز العقارية ورسالتنا في تقديم تجارب عقارية فاخرة.",
);

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="من نحن"
      description="صفحة قيد التطوير — قريباً ستطّلعون على قصة الحجاز العقارية ورؤيتنا للفخامة."
    />
  );
}
