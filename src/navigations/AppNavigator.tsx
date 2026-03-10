import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Shield, User} from 'lucide-react-native';
import React from 'react';

import {TopHeader} from '../components/ui/TopHeader';
import {COLORS} from '../constants/theme';
import {GetQuoteScreen} from '../screens/GetQuoteScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {PoliciesScreen} from '../screens/PoliciesScreen';
import {PolicyDetailScreen} from '../screens/PolicyDetailScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {QuoteResultsScreen} from '../screens/QuoteResultsScreen';
import {QuoteProduct} from '../types/insurance';

export type RootStackParamList = {
  MainTabs: undefined;
  PolicyDetail: {policyId: string};
  GetQuote: {productType?: QuoteProduct} | undefined;
  QuoteResults: {productType: QuoteProduct; applicantName: string};
};

export type TabsParamList = {
  Home: undefined;
  Policies: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

const getTitleFromRoute = (routeName: string): string => {
  const titles: Record<string, string> = {
    MainTabs: 'Home',
    PolicyDetail: 'Policy Details',
    GetQuote: 'Get a Quote',
    QuoteResults: 'Quote Results',
  };
  return titles[routeName] || routeName;
};

const StackHeader = ({navigation, route}: {navigation: any; route: any}) => (
  <TopHeader
    title={getTitleFromRoute(route.name)}
    onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
  />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Policies"
        component={PoliciesScreen}
        options={{
          tabBarIcon: ({color, size}) => <Shield color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="MainTabs"
        component={TabNavigator}
      />
      <Stack.Screen
        name="PolicyDetail"
        component={PolicyDetailScreen}
        options={{
          header: StackHeader,
        }}
      />
      <Stack.Screen
        name="QuoteResults"
        component={QuoteResultsScreen}
        options={{
          header: StackHeader,
        }}
      />

      <Stack.Screen
        name="GetQuote"
        component={GetQuoteScreen}
        options={{
          header: StackHeader,
        }}
      />
    </Stack.Navigator>
  );
};
