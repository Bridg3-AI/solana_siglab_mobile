// Polyfills
import "./src/polyfills";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ConnectionProvider } from "./src/utils/ConnectionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
} from "react-native-paper";
import { AppNavigator } from "./src/navigators/AppNavigator";
import { ClusterProvider } from "./src/components/cluster/cluster-data-access";
import { CyberpunkThemeProvider, CyberpunkTheme } from "./src/components/cyberpunk";

const queryClient = new QueryClient();

export default function App() {
  // Create cyberpunk navigation theme
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: NavigationDarkTheme,
  });

  const CyberpunkNavigationTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: CyberpunkTheme.colors.primary,
      background: CyberpunkTheme.colors.background,
      card: CyberpunkTheme.colors.surface,
      text: CyberpunkTheme.colors.onBackground,
      border: CyberpunkTheme.colors.outline,
      notification: CyberpunkTheme.colors.error,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ClusterProvider>
        <ConnectionProvider config={{ commitment: "processed" }}>
          <CyberpunkThemeProvider>
            <SafeAreaView
              style={[
                styles.shell,
                {
                  backgroundColor: CyberpunkTheme.colors.background,
                },
              ]}
            >
              <AppNavigator theme={CyberpunkNavigationTheme} />
            </SafeAreaView>
          </CyberpunkThemeProvider>
        </ConnectionProvider>
      </ClusterProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
});
