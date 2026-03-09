import {
  CreditCard,
  FileText,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS, RADIUS, SPACING, TYPOGRAPHY} from '../../constants/theme';
import {ActivityItem} from '../../types/insurance';

const getActivityIcon = (type: ActivityItem['type'], color: string) => {
  switch (type) {
    case 'payment':
      return <CreditCard color={color} size={20} />;
    case 'document':
      return <FileText color={color} size={20} />;
    case 'renewal':
      return <RefreshCw color={color} size={20} />;
    default:
      return <ShieldAlert color={color} size={20} />;
  }
};

interface Props {
  activity: ActivityItem;
}

export const ActivityRow: React.FC<Props> = ({activity}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getActivityIcon(activity.type, COLORS.primary)}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {activity.description}
        </Text>
      </View>
      <Text style={styles.dateText}>
        {new Date(activity.date).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  dateText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});
