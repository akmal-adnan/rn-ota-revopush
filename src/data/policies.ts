import {ActivityItem, Policy, UserProfile} from '../types/insurance';

export const mockUser: UserProfile = {
  id: 'USR-123456',
  firstName: 'Jane',
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
