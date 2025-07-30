import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TopBar } from "../components/top-bar/top-bar-feature";
import { HomeScreen } from "../screens/HomeScreen";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import ChatScreen from "../screens/ChatScreen";
import MapScreen from "../screens/MapScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { useSeekerTheme } from "../components/seeker";

const Tab = createBottomTabNavigator();

/**
 * This is the main navigator with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 */
export function HomeNavigator() {
  const { theme } = useSeekerTheme();

  const renderTabIcon = ({ focused, route }: { focused: boolean; route: any }) => {
    let iconName: keyof typeof MaterialCommunityIcon.glyphMap;
    
    switch (route.name) {
      case "Home":
        iconName = focused ? "home" : "home-outline";
        break;
      case "Chat":
        iconName = focused ? "message-text" : "message-text-outline";
        break;
      case "Map":
        iconName = focused ? "map" : "map-outline";
        break;
      case "Settings":
        iconName = focused ? "cog" : "cog-outline";
        break;
      default:
        iconName = "help-circle";
    }

    return (
      <View style={styles.tabIconContainer}>
        {focused && (
          <LinearGradient
            colors={[theme.colors.primary.teal + '20', theme.colors.primary.teal + '10']}
            style={styles.tabIconBackground}
          />
        )}
        <MaterialCommunityIcon
          name={iconName}
          size={24}
          color={focused ? theme.colors.primary.teal : theme.colors.text.tertiary}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'Map' || route.name === 'Chat' ? false : true,
        header: route.name !== 'Map' && route.name !== 'Chat' ? () => <TopBar /> : undefined,
        tabBarStyle: route.name === 'Map' || route.name === 'Chat' ? { display: 'none' } : {
          backgroundColor: theme.colors.background.surface,
          borderTopColor: theme.colors.border.subtle,
          borderTopWidth: 1,
          height: 88,
          paddingTop: 8,
          paddingBottom: 32,
          paddingHorizontal: 20,
          elevation: 8,
          shadowColor: theme.colors.shadow.secondary,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarActiveTintColor: theme.colors.primary.teal,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarIcon: ({ focused }) => renderTabIcon({ focused, route }),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{ 
          title: "Festival AI",
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{ 
          title: "Map",
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    position: 'relative',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  tabIconBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
});
