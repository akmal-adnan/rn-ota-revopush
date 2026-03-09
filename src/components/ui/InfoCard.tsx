import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, RADIUS, SHADOWS, SPACING} from '../../constants/theme';

interface InfoCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  children,
  onPress,
  style,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, style]}
      {...(onPress && {onPress, activeOpacity: 0.8})}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
});
