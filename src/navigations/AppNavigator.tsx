import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Shield, User} from 'lucide-react-native';
import React from 'react';

import {COLORS} from '../constants/theme';
import {HomeScreen} from '../screens/HomeScreen';
import {PoliciesScreen} from '../screens/PoliciesScreen';
import {PolicyDetailScreen} from '../screens/PolicyDetailScreen';
import {ProfileScreen} from '../screens/ProfileScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  PolicyDetail: {policyId: string};
};

export type TabsParamList = {
  Home: undefined;
  Policies: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="PolicyDetail"
        component={PolicyDetailScreen}
        options={{
          presentation: 'modal', // Example: give a modal feel
        }}
      />
    </Stack.Navigator>
  );
};
