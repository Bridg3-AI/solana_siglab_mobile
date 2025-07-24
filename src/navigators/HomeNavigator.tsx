import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TopBar } from "../components/top-bar/top-bar-feature";
import { HomeScreen } from "../screens/HomeScreen";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import ChatScreen from "../screens/ChatScreen";
import MapScreen from "../screens/MapScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { cyberpunkEffects } from "../theme/cyberpunkEffects";
import { CyberpunkColors } from "../theme/cyberpunkTheme";

const Tab = createBottomTabNavigator();

/**
 * This is the main navigator with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 */
export function HomeNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <TopBar />,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: `${CyberpunkColors.neonBlue}40`,
          ...cyberpunkEffects.neonGlow(CyberpunkColors.glowBlue),
        },
        tabBarActiveTintColor: CyberpunkColors.neonBlue,
        tabBarInactiveTintColor: CyberpunkColors.glowPurple,
        tabBarIcon: ({ focused, color, size }) => {
          const iconStyle = focused ? cyberpunkEffects.neonGlow(color) : {};
          switch (route.name) {
            case "Chat":
              return (
                <MaterialCommunityIcon
                  name={focused ? "chat" : "chat-outline"}
                  size={size}
                  color={color}
                  style={iconStyle}
                />
              );
            case "Map":
              return (
                <MaterialCommunityIcon
                  name={focused ? "map" : "map-outline"}
                  size={size}
                  color={color}
                  style={iconStyle}
                />
              );
            case "Settings":
              return (
                <MaterialCommunityIcon
                  name={focused ? "cog" : "cog-outline"}
                  size={size}
                  color={color}
                  style={iconStyle}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{ title: "AI 채팅" }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{ title: "지도" }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: "설정" }}
      />
    </Tab.Navigator>
  );
}
