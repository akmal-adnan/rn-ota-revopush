import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {COLORS, RADIUS, SPACING, TYPOGRAPHY} from '../../constants/theme';
import {PrimaryButton} from './PrimaryButton';

interface UpdateRequiredModalProps {
  /**
   * Controls whether the modal is visible
   */
  visible: boolean;

  /**
   * Callback triggered when user taps "Restart App" button
   */
  onRestartPress: () => void;

  /**
   * Whether the app is currently in the process of restarting
   * Shows loading indicator and disables button
   */
  isLoading?: boolean;

  /**
   * Custom title text
   * @default "Update Available"
   */
  title?: string;

  /**
   * Custom description text
   * @default "A new version of the app is available. Please restart to continue."
   */
  description?: string;

  /**
   * Custom button label
   * @default "Restart App"
   */
  buttonLabel?: string;
}

/**
 * Reusable modal component for displaying mandatory app update notifications.
 * Shows update available message with a restart button.
 * Modal is not dismissible (user must restart to continue).
 *
 * @example
 * const { isUpdateAvailable, isLoading, handleRestartApp } = useUpdateCheck();
 * return (
 *   <UpdateRequiredModal
 *     visible={isUpdateAvailable}
 *     onRestartPress={handleRestartApp}
 *     isLoading={isLoading}
 *   />
 * );
 */
export const UpdateRequiredModal: React.FC<UpdateRequiredModalProps> = ({
  visible,
  onRestartPress,
  isLoading = false,
  title = 'Update Available',
  description = 'A new version of the app is available. Please restart to continue.',
  buttonLabel = 'Restart App',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      hardwareAccelerated
      onRequestClose={() => {
        // Android back button - prevent dismissal (mandatory update)
      }}>
      {/* Semi-transparent overlay */}
      <View style={styles.overlay}>
        {/* Centered modal container */}
        <View style={styles.modalContainer}>
          {/* Content wrapper */}
          <View style={styles.contentBox}>
            {/* Icon/Header */}
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>📱</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Description */}
            <Text style={styles.description}>{description}</Text>

            {/* Loading Indicator */}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={COLORS.primary}
                  style={styles.spinner}
                />
                <Text style={styles.loadingText}>Restarting app...</Text>
              </View>
            )}

            {/* Restart Button */}
            <PrimaryButton
              label={buttonLabel}
              onPress={onRestartPress}
              disabled={isLoading}
              variant="danger"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 350,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  contentBox: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.lg,
  },
  iconText: {
    fontSize: 48,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.regular,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 22,
  },
  loadingContainer: {
    marginVertical: SPACING.lg,
    alignItems: 'center',
  },
  spinner: {
    marginBottom: SPACING.sm,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
  button: {
    marginTop: SPACING.lg,
    width: '100%',
  },
});
