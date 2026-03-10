import {NavigationContainer} from '@react-navigation/native';
import codePush from '@revopush/react-native-code-push';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UpdateRequiredModal} from './components/ui/UpdateRequiredModal';
import {useUpdateCheck} from './hooks/useUpdateCheck';
import {AppNavigator} from './navigations/AppNavigator';

/**
 * Inner app component that uses the update check hook
 * and renders the update modal at the root level
 */
const AppContent = () => {
  const {isUpdateAvailable, isLoading, handleRestartApp} = useUpdateCheck();

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>

      {/* Update modal rendered at root level to appear above all navigation */}
      <UpdateRequiredModal
        visible={isUpdateAvailable}
        onRestartPress={handleRestartApp}
        isLoading={isLoading}
      />
    </>
  );
};

const App = () => {
  return <AppContent />;
};

export default codePush(App);
