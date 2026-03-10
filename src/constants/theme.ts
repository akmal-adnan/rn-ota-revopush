export const COLORS = {
  primary: '#0F4C81', // Trustworthy deep classic blue
  primaryLight: '#E8F1F8',
  secondary: '#008080', // Teal accent
  background: '#F8FAFC', // Very light grey-blue
  surface: '#FFFFFF',
  white: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
  round: 9999,
};

export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  headings: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
    },
  },
  body: {
    lg: {
      fontSize: 18,
      fontWeight: '400' as const,
    },
    md: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    sm: {
      fontSize: 14,
      fontWeight: '400' as const,
    },
    xs: {
      fontSize: 12,
      fontWeight: '400' as const,
    },
  },
};

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.text,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.text,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
};
