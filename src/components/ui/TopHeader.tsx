import {ChevronLeft} from 'lucide-react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SPACING, TYPOGRAPHY} from '../../constants/theme';

interface TopHeaderProps {
  title: string;
  onBack?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({title, onBack}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      {onBack && (
        <TouchableOpacity style={styles.actionButton} onPress={onBack}>
          <ChevronLeft color={COLORS.text} size={34} />
        </TouchableOpacity>
      )}

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={{width: 34}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    backgroundColor: COLORS.surface,
    borderBottomColor: COLORS.border,
  },

  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
    textAlign: 'center',
  },

  actionButton: {
    left: -6,
    backgroundColor: 'red,',
  },
});
