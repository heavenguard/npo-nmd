import { LucideIcon } from "lucide-react";

// PawaPay supported countries and operators
export const PAWAPAY_SUPPORTED_COUNTRIES = [
  { code: "CMR", name: "Cameroon", currency: "XAF", mobileOperators: ["MTN", "ORANGE"] },
  { code: "GHA", name: "Ghana", currency: "GHS", mobileOperators: ["MTN", "VODAFONE", "AIRTELTIGO"] },
  { code: "KEN", name: "Kenya", currency: "KES", mobileOperators: ["MPESA", "AIRTEL"] },
  { code: "NGA", name: "Nigeria", currency: "NGN", mobileOperators: ["MTN", "AIRTEL", "GLO", "9MOBILE"] },
  { code: "UGA", name: "Uganda", currency: "UGX", mobileOperators: ["MTN", "AIRTEL"] },
  { code: "TZA", name: "Tanzania", currency: "TZS", mobileOperators: ["VODACOM", "AIRTEL", "TIGO"] },
  { code: "RWA", name: "Rwanda", currency: "RWF", mobileOperators: ["MTN", "AIRTEL"] },
  { code: "ZMB", name: "Zambia", currency: "ZMW", mobileOperators: ["MTN", "AIRTEL"] },
];

// Currency conversion rates (XAF to other currencies)
export const CONVERSION_RATES = {
  XAF: 1,
  USD: 0.0016,
  EUR: 0.0015,
};

export interface PaymentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogTitle: string;
  dialogDescription?: string;
  amount: number; // base amount (per unit) in FCFA
  type: "don" | "mission" | "student" | "membership" | string;
  currency?: "USD" | "EUR" | "XAF" | null;
}

export type FormDataState = {
  name: string;
  email: string;
  password: string;
  voting: boolean;
  country: string;
  currency: string;
  profession: string;
  motivation?: string;
  agreeTerms: boolean;
  payYearlyMembership?: boolean;
  phoneNumber?: string;
  mobileOperator?: string;
  paymentMethod: "mobile" | "paypal";
};

export type LoadingState = {
  isActive: boolean;
  step: "payment" | "account_creation" | "complete" | null;
  message: string;
};

export interface PaymentMethod {
  value: "mobile" | "paypal";
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface CountryInfo {
  code: string;
  name: string;
  currency: string;
  mobileOperators: string[];
}