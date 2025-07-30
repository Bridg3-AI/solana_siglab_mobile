/**
 * The app navigator - Insurance creation flow with 7 steps
 * Based on dApp_UI conversion to React Native
 */
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import * as Screens from "../screens";
import { HomeNavigator } from "./HomeNavigator";
import { StatusBar } from "expo-status-bar";

/**
 * Insurance Data Type - shared across all screens
 */
export type InsuranceData = {
  id?: string;
  description: string;
  indicator: string;
  threshold: string;
  period: number;
  premium?: number;
  maxPayout?: number;
  reliability?: number;
  currency: 'USD' | 'USDC';
  status: 'draft' | 'active' | 'claimed';
  transactionSignature?: string;
};

/**
 * Root Stack Parameter List - Insurance creation flow
 */
type RootStackParamList = {
  HomeStack: undefined;
  Settings: undefined;
  // Insurance Creation Flow (7 steps)
  InsuranceHome: undefined;
  Chat: { data?: Partial<InsuranceData> };
  Score: { data: InsuranceData };
  Indicator: { data: InsuranceData };
  Premium: { data: InsuranceData };
  Policy: { data: InsuranceData };
  Monitoring: { data: InsuranceData };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName={"HomeStack"}>
      <Stack.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      {/* Insurance Creation Flow */}
      <Stack.Screen
        name="InsuranceHome"
        component={Screens.InsuranceHomeScreen}
        options={{ 
          headerShown: false,
          title: "Seeker Insurance" 
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Screens.ChatScreen}
        options={{ 
          headerShown: false,
          title: "Festival Insurance AI" 
        }}
      />
      <Stack.Screen
        name="Score"
        component={Screens.ScoreScreen}
        options={{ 
          headerShown: false,
          title: "Feasibility Verification" 
        }}
      />
      <Stack.Screen
        name="Indicator"
        component={Screens.IndicatorScreen}
        options={{ 
          headerShown: false,
          title: "Indicator Setup" 
        }}
      />
      <Stack.Screen
        name="Premium"
        component={Screens.PremiumScreen}
        options={{ 
          headerShown: false,
          title: "Premium Calculation" 
        }}
      />
      <Stack.Screen
        name="Policy"
        component={Screens.PolicyScreen}
        options={{ 
          headerShown: false,
          title: "Policy Preview" 
        }}
      />
      <Stack.Screen
        name="Monitoring"
        component={Screens.MonitoringScreen}
        options={{ 
          headerShown: false,
          title: "Monitoring" 
        }}
      />
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  // Use the theme passed from props (cyberpunk theme) or fallback to default
  const { theme, ...navigationProps } = props;
  
  return (
    <NavigationContainer
      theme={theme}
      {...navigationProps}
    >
      <StatusBar style="light" />
      <AppStack />
    </NavigationContainer>
  );
};
