import codePush from '@revopush/react-native-code-push';
import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

interface UseUpdateCheckReturn {
  isUpdateAvailable: boolean;
  isLoading: boolean;
  error: string | null;
  handleRestartApp: () => void;
  checkForUpdate: () => Promise<void>;
}

export const useUpdateCheck = (): UseUpdateCheckReturn => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkForUpdate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use ON_NEXT_RESTART so the update is downloaded & installed
      // but the app doesn't auto-restart — we show a modal first.
      const syncStatus = await codePush.sync(
        {
          installMode: codePush.InstallMode.ON_NEXT_RESTART,
          mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
        },
        status => {
          switch (status) {
            case codePush.SyncStatus.UPDATE_INSTALLED:
              setIsUpdateAvailable(true);
              break;
            case codePush.SyncStatus.UP_TO_DATE:
              setIsUpdateAvailable(false);
              break;
          }
        },
      );

      if (syncStatus === codePush.SyncStatus.UPDATE_INSTALLED) {
        setIsUpdateAvailable(true);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to check for updates';
      setError(errorMessage);
      console.warn('[useUpdateCheck] Error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    checkForUpdate();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkForUpdate();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const handleRestartApp = () => {
    codePush.restartApp();
  };

  return {
    isUpdateAvailable,
    isLoading,
    error,
    handleRestartApp,
    checkForUpdate,
  };
};
