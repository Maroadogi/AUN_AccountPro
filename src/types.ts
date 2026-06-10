export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface StepItem {
  id: number;
  title: string;
  description: string;
  detailedItems: string[];
}

export interface TariffPlan {
  id: string;
  name: string;
  priceMonthly: number;
  features: string[];
  isPopular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface SavedInquiry {
  id: string;
  email: string;
  companyName: string;
  tariff: string;
  submittedAt: string;
  notes?: string;
  phone?: string;
}
