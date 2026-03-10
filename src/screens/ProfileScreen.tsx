import {
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  RefreshCw,
  Settings,
} from 'lucide-react-native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {InfoCard} from '../components/ui/InfoCard';
import {ListRow} from '../components/ui/ListRow';
import {PrimaryButton} from '../components/ui/PrimaryButton';
import {ScreenContainer} from '../components/ui/ScreenContainer';
import {UpdateRequiredModal} from '../components/ui/UpdateRequiredModal';
import {COLORS, RADIUS, SPACING, TYPOGRAPHY} from '../constants/theme';
import {mockUser} from '../data/policies';
import {useUpdateCheck} from '../hooks/useUpdateCheck';

export const ProfileScreen = () => {
  const {isUpdateAvailable, isLoading, handleRestartApp, checkForUpdate} =
    useUpdateCheck();

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
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Settings</Text>
          <InfoCard>
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
            <ListRow
              icon={<RefreshCw color={COLORS.textMuted} size={24} />}
              title="Check for Updates"
              subtitle={isLoading ? 'Checking...' : 'Tap to check'}
              onPress={checkForUpdate}
              hideBorder
            />
          </InfoCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <InfoCard>
            <ListRow
              icon={<HelpCircle color={COLORS.textMuted} size={24} />}
              title="Help Center"
              onPress={() => {}}
              hideBorder
            />
          </InfoCard>
        </View>

        <View style={styles.logoutContainer}>
          <PrimaryButton
            variant="danger"
            label="Log Out"
            icon={<LogOut size={18} color={COLORS.white} />}
            onPress={() => {}}
          />
        </View>
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
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.primaryLight,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  initials: {
    ...TYPOGRAPHY.headings.h3,
    color: COLORS.primary,
  },
  name: {
    ...TYPOGRAPHY.headings.h4,
    color: COLORS.text,
    marginBottom: 2,
  },
  email: {
    ...TYPOGRAPHY.body.md,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.body.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  logoutContainer: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
});
