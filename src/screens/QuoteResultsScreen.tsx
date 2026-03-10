import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';

import {InfoCard} from '../components/ui/InfoCard';
import {PrimaryButton} from '../components/ui/PrimaryButton';
import {ScreenContainer} from '../components/ui/ScreenContainer';
import {COLORS, RADIUS, SPACING, TYPOGRAPHY} from '../constants/theme';
import {mockQuotePlans} from '../data/policies';
import {RootStackParamList} from '../navigations/AppNavigator';

type QuoteResultsRouteProp = RouteProp<RootStackParamList, 'QuoteResults'>;
type QuoteResultsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'QuoteResults'
>;

interface Props {
  route: QuoteResultsRouteProp;
  navigation: QuoteResultsNavigationProp;
}

export const QuoteResultsScreen: React.FC<Props> = ({route}) => {
  const {productType, applicantName} = route.params;
  const plans = mockQuotePlans[productType];

  return (
    <ScreenContainer useSafeArea={false}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>
          Hi {applicantName}, here are your quote options.
        </Text>

        {plans.map(plan => (
          <InfoCard key={plan.id} style={styles.planCard}>
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planTitle}>{plan.name}</Text>
                <Text style={styles.planMeta}>
                  Deductible: ${plan.deductible}
                </Text>
              </View>
              {plan.recommended && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Recommended</Text>
                </View>
              )}
            </View>

            <Text style={styles.price}>
              ${plan.monthlyPremium.toFixed(0)} / month
            </Text>

            <View style={styles.highlightContainer}>
              {plan.highlights.map(item => (
                <Text key={item} style={styles.highlightText}>
                  - {item}
                </Text>
              ))}
            </View>

            <PrimaryButton
              label="Continue with this plan"
              onPress={() =>
                Alert.alert(
                  'Plan selected',
                  'Checkout screen is next in Sprint 2 implementation.',
                )
              }
              style={styles.selectButton}
            />
          </InfoCard>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  planCard: {
    marginBottom: SPACING.lg,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  planTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
  },
  planMeta: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.successLight,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  price: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  highlightContainer: {
    marginBottom: SPACING.md,
    gap: 4,
  },
  highlightText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text,
  },
  selectButton: {
    marginTop: SPACING.xs,
  },
});
