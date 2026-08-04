/** Catalog of Alhijaz services — shared base fields + per-service extras */

export type ServiceFieldType = "text" | "select" | "textarea" | "number";

export type ServiceField = {
  id: string;
  label: string;
  type: ServiceFieldType;
  required?: boolean;
  options?: readonly string[];
  placeholder?: string;
};

export type ServiceDef = {
  slug: string;
  title: string;
  body: string;
  summary: string;
  fields: readonly ServiceField[];
};

export const SERVICES_INTRO =
  "يقدم مكتب الحجاز للخدمات العقارية مجموعة متكاملة من الخدمات العقارية المصممة لتلبية احتياجات الأفراد والمستثمرين، وتشمل:";

const PROPERTY_TYPES = [
  "أرض",
  "فيلا",
  "شقة",
  "دوبلكس",
  "بنتهاوس",
  "تجاري",
  "أخرى",
] as const;

export const SERVICES: readonly ServiceDef[] = [
  {
    slug: "buy-sell",
    title: "بيع وشراء العقارات",
    body: "من أراضٍ، وفلل، وشقق سكنية، ووحدات تجارية.",
    summary:
      "نرافقكم من تحديد الاحتياج حتى إتمام الصفقة — بحث، تفاوض، وإفراغ بثقة.",
    fields: [
      {
        id: "role",
        label: "أنا",
        type: "select",
        required: true,
        options: ["مشتري", "بائع"],
      },
      {
        id: "propertyType",
        label: "نوع العقار",
        type: "select",
        required: true,
        options: PROPERTY_TYPES,
      },
      {
        id: "budget",
        label: "الميزانية التقريبية (ر.س)",
        type: "text",
        placeholder: "مثال: 2.5 مليون",
      },
      {
        id: "purpose",
        label: "الغرض",
        type: "select",
        options: ["سكن", "استثمار", "كلاهما"],
      },
    ],
  },
  {
    slug: "marketing",
    title: "التسويق العقاري الاحترافي",
    body: "للمشاريع والوحدات السكنية والتجارية باستخدام أحدث الوسائل التسويقية.",
    summary:
      "خطة تسويق رقمية وميدانية للوحدات والمشاريع مع متابعة العروض حتى الإغلاق.",
    fields: [
      {
        id: "assetKind",
        label: "ماذا تريدون تسويقه؟",
        type: "select",
        required: true,
        options: ["وحدة واحدةحدة", "مجموعة وحدات", "مشروع كامل"],
      },
      {
        id: "unitsCount",
        label: "عدد الوحدات تقريباً",
        type: "number",
        placeholder: "مثال: 12",
      },
      {
        id: "timeline",
        label: "الإطار الزمني المطلوب",
        type: "select",
        options: ["عاجل (أقل من شهر)", "شهر إلى 3 أشهر", "مرن"],
      },
    ],
  },
  {
    slug: "property-management",
    title: "إدارة الأملاك والأصول العقارية",
    body: "بكفاءة عالية، بما يشمل الإشراف والتشغيل والتحصيل والمتابعة.",
    summary:
      "تشغيل احترافي للأصول: مستأجرون، تحصيل، صيانة، وتقارير دورية للمالك.",
    fields: [
      {
        id: "unitsCount",
        label: "عدد الوحدات تحت الإدارة",
        type: "number",
        required: true,
        placeholder: "مثال: 5",
      },
      {
        id: "cityFocus",
        label: "مدينة الأصول",
        type: "text",
        placeholder: "الرياض",
      },
      {
        id: "needs",
        label: "أهم ما تحتاجونه",
        type: "select",
        options: ["تحصيل إيجار", "صيانة وتشغيل", "إدارة كاملة", "أخرى"],
      },
    ],
  },
  {
    slug: "rentals",
    title: "تأجير العقارات",
    body: "وإدارة عمليات التأجير بما يحقق أفضل عائد للملاك.",
    summary:
      "نربط الملاك بالمستأجرين المناسبين مع عقود إلكترونية ومتابعة احترافية.",
    fields: [
      {
        id: "role",
        label: "أنا",
        type: "select",
        required: true,
        options: ["مالك يريد التأجير", "مستأجر يبحث عن عقار"],
      },
      {
        id: "propertyType",
        label: "نوع العقار",
        type: "select",
        required: true,
        options: PROPERTY_TYPES,
      },
      {
        id: "duration",
        label: "مدة الإيجار المفضلة",
        type: "select",
        options: ["سنة", "سنتان", "أكثر من سنتين", "غير محدد"],
      },
    ],
  },
  {
    slug: "ejar-contracts",
    title: "توثيق العقود الإلكترونية",
    body: "عبر منصة إيجار وفق الأنظمة واللوائح المعتمدة.",
    summary:
      "تجهيز وتوثيق عقود الإيجار عبر منصة إيجار بسرعة ووضوح للطرفين.",
    fields: [
      {
        id: "contractType",
        label: "نوع العقد",
        type: "select",
        required: true,
        options: ["سكني", "تجاري"],
      },
      {
        id: "partiesReady",
        label: "جاهزية الأطراف",
        type: "select",
        options: ["الطرفان جاهزان", "أحتاج مساعدة في التنسيق"],
      },
    ],
  },
  {
    slug: "consulting",
    title: "الاستشارات العقارية والاستثمارية",
    body: "لمساعدة العملاء على اتخاذ القرارات المناسبة.",
    summary:
      "جلسة استشارية مبنية على وضعكم المالي وأهدافكم في السوق السعودي.",
    fields: [
      {
        id: "topic",
        label: "موضوع الاستشارة",
        type: "select",
        required: true,
        options: [
          "شراء أول عقار",
          "استثمار وتأجير",
          "تقييم فرصة",
          "إعادة تسعير/بيع",
          "أخرى",
        ],
      },
      {
        id: "investmentSize",
        label: "حجم الاستثمار المتوقع",
        type: "text",
        placeholder: "مثال: حتى مليون ر.س",
      },
    ],
  },
  {
    slug: "feasibility",
    title: "دراسات الفرص الاستثمارية",
    body: "وتحليل الجدوى العقارية للمشاريع.",
    summary:
      "تحليل جدوى وعائد متوقع للمشاريع أو الفرص قبل اتخاذ قرار الشراء أو التطوير.",
    fields: [
      {
        id: "projectStage",
        label: "مرحلة الفرصة",
        type: "select",
        required: true,
        options: ["فكرة", "أرض متاحة", "مشروع قائم", "إعادة تطوير"],
      },
      {
        id: "capital",
        label: "رأس المال التقريبي",
        type: "text",
        placeholder: "مثال: 5 ملايين",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "التسويق الرقمي وإنتاج المحتوى",
    body: "لتعزيز وصول العقارات إلى الشريحة المستهدفة.",
    summary:
      "محتوى وتصوير وحملات رقمية ترفع وصول عقاركم للجمهور المناسب.",
    fields: [
      {
        id: "channels",
        label: "القنوات المطلوبة",
        type: "select",
        required: true,
        options: [
          "سوشيال ميديا",
          "تصوير ومحتوى فقط",
          "حملة إعلانية مدفوعة",
          "باقة متكاملة",
        ],
      },
      {
        id: "listingsCount",
        label: "عدد العقارات/الوحدات",
        type: "number",
        placeholder: "مثال: 3",
      },
    ],
  },
  {
    slug: "sale-transfer",
    title: "إدارة عمليات البيع ونقل الملكية",
    body: "حتى اكتمال الإجراءات بكل احترافية.",
    summary:
      "متابعة الإجراءات الرسمية حتى الإفراغ ونقل الملكية دون تعثر.",
    fields: [
      {
        id: "stage",
        label: "مرحلة الصفقة حالياً",
        type: "select",
        required: true,
        options: [
          "يوجد مشتري جاد",
          "قيد التفاوض",
          "جاهز للإفراغ",
          "أحتاج تنسيقاً كاملاً",
        ],
      },
      {
        id: "cityFocus",
        label: "مدينة العقار",
        type: "text",
        placeholder: "الرياض",
      },
    ],
  },
  {
    slug: "property-search",
    title: "البحث عن العقار الأمثل",
    body: "وفق احتياجات العميل وميزانيته وأهدافه الاستثمارية.",
    summary:
      "نبحث لكم عن العقار الأنسب وفق الميزانية والموقع والمواصفات بدقة.",
    fields: [
      {
        id: "propertyType",
        label: "نوع العقار المطلوب",
        type: "select",
        required: true,
        options: PROPERTY_TYPES,
      },
      {
        id: "budget",
        label: "الميزانية القصوى",
        type: "text",
        required: true,
        placeholder: "مثال: 1.8 مليون",
      },
      {
        id: "preferredAreas",
        label: "الأحياء / المناطق المفضلة",
        type: "text",
        placeholder: "الياسمين، النرجس…",
      },
      {
        id: "rooms",
        label: "عدد الغرف المطلوب",
        type: "number",
        placeholder: "مثال: 4",
      },
    ],
  },
] as const;

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceFieldLabel(
  service: ServiceDef,
  fieldId: string,
): string {
  return service.fields.find((f) => f.id === fieldId)?.label ?? fieldId;
}

export const SERVICE_REQUEST_STATUS_LABELS = {
  New: "جديد",
  InProgress: "قيد المتابعة",
  Completed: "مكتمل",
  Cancelled: "ملغي",
} as const;

export type ServiceRequestStatusKey = keyof typeof SERVICE_REQUEST_STATUS_LABELS;
