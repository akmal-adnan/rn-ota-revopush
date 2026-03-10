import codePush from '@revopush/react-native-code-push';
import {useEffect, useState} from 'react';

interface UseUpdateCheckReturn {
  isUpdateAvailable: boolean;
  isLoading: boolean;
  error: string | null;
  handleRestartApp: () => void;
}

/**
 * Custom hook for detecting CodePush updates and managing restart logic.
 * Automatically checks for updates on component mount.
 * Exposes state and handler function for UI integration.
 *
 * @returns Object containing update state and restart handler
 *
 * @example
 * const { isUpdateAvailable, isLoading, handleRestartApp } = useUpdateCheck();
 */
export const useUpdateCheck = (): UseUpdateCheckReturn => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Perform CodePush sync with mandatory update check
        // syncStatusCode: 1 = UP_TO_DATE, 2 = UPDATE_INSTALLED, 3 = UPDATE_PENDING, etc.
        const syncStatus = await codePush.sync(
          {
            installMode: codePush.InstallMode.IMMEDIATE,
            mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
          },
          status => {
            // Handle sync status changes
            if (status === 1) {
              setIsUpdateAvailable(true);
            } else if (status === 0) {
              setIsUpdateAvailable(false);
            }
          },
        );

        // Final sync status
        if (syncStatus === 1 || syncStatus === 2) {
          setIsUpdateAvailable(true);
        } else {
          setIsUpdateAvailable(false);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to check for updates';
        setError(errorMessage);
        console.warn(
          '[useUpdateCheck] Error during update check:',
          errorMessage,
        );
      } finally {
        setIsLoading(false);
      }
    };

    checkForUpdate();
  }, []);

  /**
   * Triggers app restart by allowing CodePush to complete the update.
   * Called when user confirms restart in UpdateRequiredModal.
   */
  const handleRestartApp = () => {
    try {
      codePush.allowRestart();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to restart app';
      console.error('[useUpdateCheck] Error restarting app:', errorMessage);
      setError(errorMessage);
    }
  };

  return {
    isUpdateAvailable,
    isLoading,
    error,
    handleRestartApp,
  };
};
