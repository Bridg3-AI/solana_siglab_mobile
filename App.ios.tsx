// iOS-specific App entry point (without Solana Mobile Wallet Adapter)
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
} from "react-native-paper";
import { AppNavigator } from "./src/navigators/AppNavigator";
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
      text: CyberpunkTheme.colors.onSurface,
      border: CyberpunkTheme.colors.outline,
      notification: CyberpunkTheme.colors.primary,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CyberpunkThemeProvider theme={CyberpunkTheme}>
        <SafeAreaView style={styles.shell}>
          <AppNavigator theme={CyberpunkNavigationTheme} />
        </SafeAreaView>
      </CyberpunkThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
});