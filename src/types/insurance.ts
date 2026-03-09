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
