import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {InfoCard} from '../components/ui/InfoCard';
import {PrimaryButton} from '../components/ui/PrimaryButton';
import {ScreenContainer} from '../components/ui/ScreenContainer';
import {StatPill} from '../components/ui/StatPill';
import {COLORS, SPACING, TYPOGRAPHY} from '../constants/theme';
import {mockPolicies} from '../data/policies';
import {RootStackParamList} from '../navigations/AppNavigator';

type PolicyDetailRouteProp = RouteProp<RootStackParamList, 'PolicyDetail'>;
type PolicyDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PolicyDetail'
>;

interface Props {
  route: PolicyDetailRouteProp;
  navigation: PolicyDetailNavigationProp;
}

export const PolicyDetailScreen: React.FC<Props> = ({route}) => {
  const {policyId} = route.params;
  const policy = mockPolicies.find(p => p.id === policyId) || mockPolicies[0];

  return (
    <ScreenContainer useSafeArea={false}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header summary */}
        <View style={styles.summaryContainer}>
          <StatPill status={policy.status} style={{marginBottom: SPACING.md}} />
          <Text style={styles.title}>{policy.title}</Text>
          <Text style={styles.policyNumber}>#{policy.policyNumber}</Text>
        </View>

        {/* Quick Documents action */}
        <PrimaryButton
          variant="secondary"
          label="View ID Card / Documents"
          onPress={() => console.log('Docs')}
          style={styles.docsButton}
        />

        {/* Details Card */}
        <Text style={styles.sectionTitle}>Coverage Summary</Text>
        <InfoCard style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Effective Date</Text>
            <Text style={styles.detailValue}>{policy.effectiveDate}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expiration</Text>
            <Text style={styles.detailValue}>{policy.expirationDate}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Deductible</Text>
            <Text style={styles.detailValue}>${policy.deductible}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Premium</Text>
            <Text style={styles.detailValue}>
              ${policy.premium.toFixed(2)} / {policy.billingCycle}
            </Text>
          </View>
        </InfoCard>

        {/* Limits Card */}
        <Text style={styles.sectionTitle}>Limits</Text>
        <InfoCard style={styles.detailsCard}>
          {policy.coverageLimits.map((limit, index) => (
            <React.Fragment key={index}>
              <View style={styles.limitRow}>
                <Text style={styles.limitLabel}>{limit.label}</Text>
                <Text style={styles.limitValue}>{limit.amount}</Text>
              </View>
              {index < policy.coverageLimits.length - 1 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          ))}
        </InfoCard>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.lg,
  },
  summaryContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  policyNumber: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textMuted,
  },
  docsButton: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  detailsCard: {
    marginBottom: SPACING.xl,
    padding: 0, // override padding for edge-to-edge lists
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textMuted,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  limitRow: {
    padding: SPACING.lg,
  },
  limitLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  limitValue: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textMuted,
  },
});
