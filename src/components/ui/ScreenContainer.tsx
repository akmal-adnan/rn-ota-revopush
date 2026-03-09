import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/theme';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  useSafeArea = true,
  style,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  const content = (
    <View style={[styles.inner, style]} {...rest}>
      {children}
    </View>
  );

  if (useSafeArea) {
    return (
      <View style={[styles.container, {paddingTop: insets.top}]}>
        {content}
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
  },
});
