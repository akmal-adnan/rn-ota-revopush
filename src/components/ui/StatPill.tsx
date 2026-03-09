import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, RADIUS, SPACING, TYPOGRAPHY} from '../../constants/theme';
import {PolicyStatus} from '../../types/insurance';

interface StatPillProps {
  status: PolicyStatus;
  style?: object;
}

export const StatPill: React.FC<StatPillProps> = ({status, style}) => {
  const getStyleForStatus = () => {
    switch (status) {
      case 'active':
        return {bg: COLORS.successLight, text: COLORS.success};
      case 'pending':
        return {bg: COLORS.warningLight, text: COLORS.warning};
      case 'expired':
      case 'cancelled':
        return {bg: COLORS.errorLight, text: COLORS.error};
      default:
        return {bg: COLORS.primaryLight, text: COLORS.primary};
    }
  };

  const colors = getStyleForStatus();

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}, style]}>
      <Text style={[styles.text, {color: colors.text}]}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.round,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});
