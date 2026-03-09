import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {COLORS, RADIUS, SPACING, TYPOGRAPHY} from '../../constants/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  style,
  variant = 'primary',
  disabled = false,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryContainer;
      case 'outline':
        return styles.outlineContainer;
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getContainerStyle(),
        disabled && styles.disabledContainer,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}>
      <Text style={[getTextStyle(), disabled && styles.disabledText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.primaryLight,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  disabledContainer: {
    backgroundColor: COLORS.border,
    borderColor: COLORS.border,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  secondaryText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semiBold,
  },
  outlineText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semiBold,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
});
