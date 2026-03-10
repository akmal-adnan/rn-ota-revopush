import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Car,
  FileText,
  Home as HomeIcon,
  MessageCircle,
  PhoneCall,
  ShieldAlert,
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {UpdateRequiredModal} from '../components/ui/UpdateRequiredModal';
import {useUpdateCheck} from '../hooks/useUpdateCheck';

import {ActivityRow} from '../components/ui/ActivityRow';
import {InfoCard} from '../components/ui/InfoCard';
import {PrimaryButton} from '../components/ui/PrimaryButton';
import {ScreenContainer} from '../components/ui/ScreenContainer';
import {COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY} from '../constants/theme';
import {mockActivity, mockPolicies, mockUser} from '../data/policies';
import {RootStackParamList, TabsParamList} from '../navigations/AppNavigator';
import {Policy} from '../types/insurance';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {isUpdateAvailable, isLoading, handleRestartApp} = useUpdateCheck();
  const nextPaymentPolicy = mockPolicies[0]; // Just picking first for demo

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good morning,';
    }
    if (hour < 18) {
      return 'Good afternoon,';
    }
    return 'Good evening,';
  };

  const getIconForType = (
    type: Policy['type'],
    size = 20,
    color = COLORS.primary,
  ) => {
    switch (type) {
      case 'Auto':
        return <Car color={color} size={size} />;
      case 'Home':
        return <HomeIcon color={color} size={size} />;
      default:
        return <ShieldAlert color={color} size={size} />;
    }
  };

  const totalPremium = mockPolicies.reduce((acc, p) => acc + p.premium, 0);

  return (
    <ScreenContainer>
      <UpdateRequiredModal
        visible={isUpdateAvailable}
        onRestartPress={handleRestartApp}
        isLoading={isLoading}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Welcome Block */}
        <View style={styles.headerBlock}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.name}>
            {mockUser.firstName} {mockUser.lastName}
          </Text>
        </View>

        {/* Hero Card: Quick Overview */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <ShieldAlert color="#fff" size={24} />
            <Text style={styles.heroTitle}>Coverage Status</Text>
          </View>
          <Text style={styles.heroSubtitle}>
            All your policies are active and up to date.
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.statContainer}>
              <Text style={styles.statValue}>
                {mockUser.totalActivePolicies}
              </Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.statValue}>${totalPremium.toFixed(0)}</Text>
              <Text style={styles.statLabel}>/mo</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.statValue}>Oct 1</Text>
              <Text style={styles.statLabel}>Next Renewal</Text>
            </View>
          </View>
          <PrimaryButton
            label="Get a Quote"
            variant="secondary"
            onPress={() => navigation.navigate('GetQuote')}
            style={styles.quoteButton}
          />
        </View>

        {/* Policy Summary Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContent}>
          {mockPolicies.map(policy => (
            <TouchableOpacity
              key={policy.id}
              style={styles.policyChip}
              onPress={() =>
                navigation.navigate('PolicyDetail', {policyId: policy.id})
              }
              activeOpacity={0.7}>
              <View style={styles.chipIcon}>
                {getIconForType(policy.type, 18, COLORS.primary)}
              </View>
              <Text style={styles.chipText}>{policy.type}</Text>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      policy.status === 'active'
                        ? COLORS.success
                        : COLORS.warning,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Upcoming Payment */}
        <Text style={styles.sectionTitle}>Upcoming Payment</Text>
        <InfoCard style={styles.paymentCard}>
          <View style={styles.paymentHeader}>
            <Text style={styles.paymentDate}>
              Due{' '}
              {new Date(nextPaymentPolicy.nextPaymentDate).toLocaleDateString(
                undefined,
                {month: 'short', day: 'numeric'},
              )}
            </Text>
            <Text style={styles.paymentAmount}>
              ${nextPaymentPolicy.premium.toFixed(2)}
            </Text>
          </View>
          <Text style={styles.paymentContext}>
            {nextPaymentPolicy.title} • {nextPaymentPolicy.policyNumber}
          </Text>
          <PrimaryButton
            label="Make a Payment"
            onPress={() => console.log('Pay')}
            style={styles.payButton}
          />
        </InfoCard>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('Policies')}>
            <View style={styles.actionIconContainer}>
              <FileText color={COLORS.primary} size={24} />
            </View>
            <Text style={styles.actionText}>ID Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => navigation.navigate('GetQuote')}>
            <View style={styles.actionIconContainer}>
              <PhoneCall color={COLORS.primary} size={24} />
            </View>
            <Text style={styles.actionText}>Get Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => console.log('Contact Support')}>
            <View style={styles.actionIconContainer}>
              <ShieldAlert color={COLORS.primary} size={24} />
            </View>
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        <InfoCard style={styles.activityCard}>
          {mockActivity.map(activity => (
            <View key={activity.id}>
              <ActivityRow activity={activity} />
            </View>
          ))}
        </InfoCard>

        {/* Agent Support Strip */}
        <View style={styles.agentStrip}>
          <View style={styles.agentInfo}>
            <View style={styles.agentAvatar}>
              <Text style={styles.agentInitials}>MW</Text>
            </View>
            <View>
              <Text style={styles.agentName}>Michael Weaver</Text>
              <Text style={styles.agentRole}>Your Insurance Agent</Text>
            </View>
          </View>
          <View style={styles.agentActions}>
            <TouchableOpacity style={styles.iconButton}>
              <MessageCircle color={COLORS.primary} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <PhoneCall color={COLORS.primary} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.lg,
  },
  headerBlock: {
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
  },
  greeting: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.textMuted,
  },
  name: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  heroTitle: {
    color: '#fff',
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    marginLeft: SPACING.sm,
  },
  heroSubtitle: {
    color: COLORS.primaryLight,
    fontSize: TYPOGRAPHY.sizes.md,
    marginBottom: SPACING.lg,
  },
  heroStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: SPACING.md,
  },
  quoteButton: {
    marginTop: SPACING.md,
  },
  statContainer: {
    flex: 1,
  },
  statValue: {
    color: '#fff',
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  statLabel: {
    color: COLORS.primaryLight,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  paymentCard: {
    marginBottom: SPACING.xl,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.xs,
  },
  paymentDate: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.warning,
  },
  paymentAmount: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
  },
  paymentContext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  payButton: {
    marginTop: SPACING.sm,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    width: '30%',
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  actionText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
  },
  chipsScroll: {
    marginHorizontal: -SPACING.lg,
    marginBottom: SPACING.xl,
  },
  chipsContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  policyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.round,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
    marginRight: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  activityCard: {
    paddingInline: 20,
    paddingVertical: 0,
    marginBottom: SPACING.xl,
  },
  agentStrip: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xxl,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  agentInitials: {
    color: '#fff',
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  agentName: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
  },
  agentRole: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textMuted,
  },
  agentActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
});
