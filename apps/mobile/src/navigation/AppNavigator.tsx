import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  HomeScreen,
  ForecastScreen,
  ReportsScreen,
  ReportsHistoryScreen,
  ProfileScreen,
  SettingsScreen,
  LoginScreen,
  RegisterScreen,
} from '../screens';
import { AuthProvider } from '../state/auth';
import HeaderRight from '../ui/HeaderRight';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

// Reports stack navigator for submitting and history
const ReportsStack = createNativeStackNavigator();

function ForecastTopTabs() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="Wave" component={ForecastScreen} options={{ title: 'Wave' }} />
      <TopTabs.Screen name="Wind" component={ForecastScreen} options={{ title: 'Wind' }} />
      <TopTabs.Screen name="Tide" component={ForecastScreen} options={{ title: 'Tide' }} />
      <TopTabs.Screen name="Weather" component={ForecastScreen} options={{ title: 'Weather' }} />
    </TopTabs.Navigator>
  );
}

function ReportsStackScreen() {
  return (
    <ReportsStack.Navigator>
      <ReportsStack.Screen name="ReportsMain" component={ReportsScreen} options={{ title: 'Reports' }} />
      <ReportsStack.Screen name="ReportsHistory" component={ReportsHistoryScreen} options={{ title: 'Reports History' }} />
    </ReportsStack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Forecasts" component={ForecastTopTabs} />
      <Tab.Screen name="Reports" component={ReportsStackScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerRight: () => <HeaderRight /> }}>
          <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: true, title: 'Inspirasi' }} />
          <Stack.Screen name="ForecastDetail" component={ForecastScreen} options={{ title: 'Forecast' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign in' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          <Stack.Screen name="ReportsHistory" component={ReportsHistoryScreen} options={{ title: 'Reports' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
