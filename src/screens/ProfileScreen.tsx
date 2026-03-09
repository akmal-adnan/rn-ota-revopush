import {
  Bell,
  CreditCard,
  HelpCircle,
  Settings,
  ShieldCheck,
} from 'lucide-react-native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {ListRow} from '../components/ui/ListRow';
import {PrimaryButton} from '../components/ui/PrimaryButton';
import {ScreenContainer} from '../components/ui/ScreenContainer';
import {TopHeader} from '../components/ui/TopHeader';
import {COLORS, RADIUS, SPACING, TYPOGRAPHY} from '../constants/theme';
import {mockUser} from '../data/policies';

export const ProfileScreen = () => {
  return (
    <ScreenContainer useSafeArea={false}>
      <TopHeader title="My Profile" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Card Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.initials}>
              {mockUser.firstName.charAt(0)}
              {mockUser.lastName.charAt(0)}
            </Text>
          </View>
          <Text style={styles.name}>
            {mockUser.firstName} {mockUser.lastName}
          </Text>
          <Text style={styles.email}>{mockUser.email}</Text>

          <View style={styles.badge}>
            <ShieldCheck color={COLORS.primary} size={16} />
            <Text style={styles.badgeText}>
              Member since {new Date(mockUser.memberSince).getFullYear()}
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        <Text style={styles.sectionTitle}>Account & Settings</Text>
        <View style={styles.groupContainer}>
          <ListRow
            icon={<CreditCard color={COLORS.textMuted} size={24} />}
            title="Payment Methods"
            onPress={() => {}}
          />
          <ListRow
            icon={<Bell color={COLORS.textMuted} size={24} />}
            title="Notifications"
            subtitle="Email, Push, SMS"
            onPress={() => {}}
          />
          <ListRow
            icon={<Settings color={COLORS.textMuted} size={24} />}
            title="Personal Details"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.groupContainer}>
          <ListRow
            icon={<HelpCircle color={COLORS.textMuted} size={24} />}
            title="Help Center"
            onPress={() => {}}
          />
        </View>

        <PrimaryButton
          variant="outline"
          label="Log Out"
          onPress={() => {}}
          style={styles.logoutButton}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  initials: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  name: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.round,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text,
    marginLeft: 6,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textMuted,
    marginLeft: SPACING.lg,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  groupContainer: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  logoutButton: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    borderColor: COLORS.error,
  },
});
