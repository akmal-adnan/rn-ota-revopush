import {NavigationContainer} from '@react-navigation/native';
import codePush from '@revopush/react-native-code-push';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './navigations/AppNavigator';

/**
 * Inner app component that uses the update check hook
 * and renders the update modal at the root level
 */
const AppContent = () => {
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

const App = () => {
  return <AppContent />;
};

export default codePush(App);
