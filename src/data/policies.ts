import {
  ActivityItem,
  Policy,
  QuoteDraft,
  QuotePlan,
  QuoteProduct,
  UserProfile,
} from '../types/insurance';

export const mockUser: UserProfile = {
  id: 'USR-123456',
  firstName: 'Akmal',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  phone: '(555) 123-4567',
  memberSince: '2021-03-15',
  totalActivePolicies: 2,
};

export const mockPolicies: Policy[] = [
  {
    id: 'POL-AUT-7890',
    type: 'Auto',
    title: 'Comprehensive Auto Coverage',
    policyNumber: 'A-7890-442',
    status: 'active',
    premium: 125.5,
    billingCycle: 'monthly',
    nextPaymentDate: '2026-04-01',
    effectiveDate: '2025-10-01',
    expirationDate: '2026-10-01',
    deductible: 500,
    coverageLimits: [
      {label: 'Bodily Injury', amount: '$100k / $300k'},
      {label: 'Property Damage', amount: '$50k'},
      {label: 'Uninsured Motorist', amount: '$50k / $100k'},
    ],
  },
  {
    id: 'POL-HOM-2234',
    type: 'Home',
    title: 'Standard Homeowners',
    policyNumber: 'H-2234-911',
    status: 'active',
    premium: 890.0,
    billingCycle: 'annual',
    nextPaymentDate: '2026-05-15',
    effectiveDate: '2025-05-15',
    expirationDate: '2026-05-15',
    deductible: 1000,
    coverageLimits: [
      {label: 'Dwelling', amount: '$350k'},
      {label: 'Personal Property', amount: '$175k'},
      {label: 'Liability', amount: '$300k'},
    ],
  },
];

export const mockActivity: ActivityItem[] = [
  {
    id: 'ACT-001',
    type: 'payment',
    title: 'Payment Received',
    description: 'Auto Policy A-7890-442',
    date: '2026-03-01T14:30:00Z',
  },
  {
    id: 'ACT-002',
    type: 'document',
    title: 'New ID Card Document',
    description: 'Auto Policy A-7890-442 ID card generated.',
    date: '2026-02-28T09:15:00Z',
  },
  {
    id: 'ACT-003',
    type: 'renewal',
    title: 'Policy Renewed',
    description: 'Homeowners Policy H-2234-911 successfully renewed.',
    date: '2026-02-15T11:00:00Z',
  },
];

export const mockQuoteDraft: QuoteDraft = {
  id: 'QDR-001',
  productType: 'Auto',
  fullName: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '(555) 123-4567',
  zipCode: '94107',
  vehicleYear: '2022',
  vehicleMake: 'Toyota',
  vehicleModel: 'Camry',
  updatedAt: '2026-03-09T10:00:00Z',
};

export const mockQuotePlans: Record<QuoteProduct, QuotePlan[]> = {
  Auto: [
    {
      id: 'QP-A-01',
      productType: 'Auto',
      name: 'Auto Basic',
      monthlyPremium: 92,
      deductible: 1000,
      highlights: ['Liability included', 'Roadside add-on available'],
    },
    {
      id: 'QP-A-02',
      productType: 'Auto',
      name: 'Auto Plus',
      monthlyPremium: 128,
      deductible: 750,
      highlights: ['Comprehensive coverage', 'Rental reimbursement'],
      recommended: true,
    },
    {
      id: 'QP-A-03',
      productType: 'Auto',
      name: 'Auto Premium',
      monthlyPremium: 164,
      deductible: 500,
      highlights: ['Higher liability limits', 'Glass repair included'],
    },
  ],
  Health: [
    {
      id: 'QP-H-01',
      productType: 'Health',
      name: 'Health Core',
      monthlyPremium: 210,
      deductible: 2500,
      highlights: ['Preventive care', 'Virtual visits'],
    },
    {
      id: 'QP-H-02',
      productType: 'Health',
      name: 'Health Plus',
      monthlyPremium: 286,
      deductible: 1500,
      highlights: ['Specialist support', 'Lower copays'],
      recommended: true,
    },
    {
      id: 'QP-H-03',
      productType: 'Health',
      name: 'Health Premium',
      monthlyPremium: 349,
      deductible: 1000,
      highlights: ['Broader network', 'Wellness credit'],
    },
  ],
  Life: [
    {
      id: 'QP-L-01',
      productType: 'Life',
      name: 'Term 20 - Essential',
      monthlyPremium: 36,
      deductible: 0,
      highlights: ['$250k coverage', 'Fixed term premium'],
    },
    {
      id: 'QP-L-02',
      productType: 'Life',
      name: 'Term 20 - Family',
      monthlyPremium: 58,
      deductible: 0,
      highlights: ['$500k coverage', 'Accelerated benefit rider'],
      recommended: true,
    },
    {
      id: 'QP-L-03',
      productType: 'Life',
      name: 'Term 30 - Secure',
      monthlyPremium: 84,
      deductible: 0,
      highlights: ['$750k coverage', 'Longer term protection'],
    },
  ],
};
