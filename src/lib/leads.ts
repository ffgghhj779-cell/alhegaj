export type LeadInterest =
  | "شراء"
  | "إيجار"
  | "استشارة"
  | "تقييم عقار"
  | "أخرى";

export type LeadPayload = {
  name: string;
  phone: string;
  interest: LeadInterest;
  message: string;
};

export const LEAD_INTERESTS: readonly LeadInterest[] = [
  "شراء",
  "إيجار",
  "استشارة",
  "تقييم عقار",
  "أخرى",
] as const;
