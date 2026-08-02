# الحجاز العقارية — Alhijaz Real Estate

منصة عقارية فاخرة باللغة العربية (RTL) مبنية بـ Next.js و Tailwind و Prisma.

## التشغيل محلياً

```bash
npm install
cp .env.example .env.local
# عدّل قيم WhatsApp / Mapbox / ADMIN_PASSWORD
npx prisma migrate dev
npm run db:seed
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000).

## أهم المسارات

| المسار | الوصف |
|--------|--------|
| `/` | الصفحة الرئيسية |
| `/properties` | قائمة العقارات |
| `/properties/[id]` | تفاصيل عقار + خريطة |
| `/media` | معرض وسائط |
| `/contact` | نموذج تواصل → واتساب الإدارة |
| `/about` | من نحن |
| `/services` | خدماتنا |
| `/admin/login` | دخول الإدارة |
| `/admin/add-property` | إضافة عقار |

## متغيرات البيئة

انظر `.env.example`.
