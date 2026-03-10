export type PolicyStatus = 'active' | 'pending' | 'expired' | 'cancelled';
export type PolicyType = 'Auto' | 'Home' | 'Life' | 'Health' | 'Renters';

export interface CoverageLimit {
  label: string;
  amount: number | string;
}

export interface Policy {
  id: string;
  type: PolicyType;
  title: string;
  policyNumber: string;
  status: PolicyStatus;
  premium: number;
  billingCycle: 'monthly' | 'annual' | 'semi-annual';
  nextPaymentDate: string;
  effectiveDate: string;
  expirationDate: string;
  deductible: number;
  coverageLimits: CoverageLimit[];
  imageUrl?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberSince: string;
  totalActivePolicies: number;
}

export type ActivityType = 'payment' | 'document' | 'renewal' | 'claim';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
}

export type QuoteProduct = 'Auto' | 'Health' | 'Life';

export interface QuoteDraft {
  id: string;
  productType: QuoteProduct;
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  age?: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  annualIncome?: string;
  smoker?: 'yes' | 'no';
  hasDependents?: 'yes' | 'no';
  updatedAt: string;
}

export interface QuotePlan {
  id: string;
  productType: QuoteProduct;
  name: string;
  monthlyPremium: number;
  deductible: number;
  highlights: string[];
  recommended?: boolean;
}
