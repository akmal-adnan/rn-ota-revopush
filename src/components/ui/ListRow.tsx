import {ChevronRight} from 'lucide-react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '../../constants/theme';

interface ListRowProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

export const ListRow: React.FC<ListRowProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={styles.container}
      {...(onPress && {onPress, activeOpacity: 0.7})}>
      <View style={styles.leftContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && onPress && (
        <ChevronRight color={COLORS.textMuted} size={20} />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: SPACING.md,
    width: 24,
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
