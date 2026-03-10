import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Car, Home as HomeIcon} from 'lucide-react-native';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {InfoCard} from '../components/ui/InfoCard';
import {ScreenContainer} from '../components/ui/ScreenContainer';
import {StatPill} from '../components/ui/StatPill';
import {COLORS, SPACING, TYPOGRAPHY} from '../constants/theme';
import {mockPolicies} from '../data/policies';
import {RootStackParamList, TabsParamList} from '../navigations/AppNavigator';
import {Policy} from '../types/insurance';

type PoliciesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'Policies'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: PoliciesScreenNavigationProp;
}

export const PoliciesScreen: React.FC<Props> = ({navigation}) => {
  const getIconForType = (type: Policy['type']) => {
    switch (type) {
      case 'Auto':
        return <Car color={COLORS.primary} size={24} />;
      case 'Home':
        return <HomeIcon color={COLORS.primary} size={24} />;
      default:
        return <Car color={COLORS.primary} size={24} />;
    }
  };

  const renderPolicyCard = ({item}: {item: Policy}) => (
    <InfoCard
      style={styles.card}
      onPress={() => navigation.navigate('PolicyDetail', {policyId: item.id})}>
      <View style={styles.cardHeader}>
        <View style={styles.typeIconContainer}>
          {getIconForType(item.type)}
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.policyTitle}>{item.title}</Text>
          <Text style={styles.policyNumber}>Policy #{item.policyNumber}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.label}>Premium</Text>
          <Text style={styles.value}>
            ${item.premium.toFixed(2)} / {item.billingCycle}
          </Text>
        </View>
        <StatPill status={item.status} />
      </View>
    </InfoCard>
  );

  return (
    <ScreenContainer>
      <FlatList
        data={mockPolicies}
        keyExtractor={item => item.id}
        renderItem={renderPolicyCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: SPACING.lg,
  },
  card: {
    marginBottom: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  typeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  policyTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
  },
  policyNumber: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
  },
});
