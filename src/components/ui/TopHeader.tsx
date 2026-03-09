import {ChevronLeft} from 'lucide-react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '../../constants/theme';

interface TopHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  onBack,
  rightAction,
}) => {
  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity style={styles.actionButton} onPress={onBack}>
          <ChevronLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightAction ? (
        <View style={styles.actionButton}>{rightAction}</View>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});
