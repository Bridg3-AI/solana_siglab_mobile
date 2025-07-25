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
import { SeekerThemeProvider, SeekerTheme } from "./src/components/seeker";
import { WalletProvider } from "./src/components/wallet";

const queryClient = new QueryClient();

export default function App() {
  // Create Seeker navigation theme
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: NavigationDarkTheme,
  });

  const SeekerNavigationTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: SeekerTheme.colors.primary.teal,
      background: SeekerTheme.colors.background.primary,
      card: SeekerTheme.colors.background.surface,
      text: SeekerTheme.colors.text.primary,
      border: SeekerTheme.colors.border.subtle,
      notification: SeekerTheme.colors.status.error,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ClusterProvider>
        <ConnectionProvider config={{ commitment: "processed" }}>
          <WalletProvider>
            <SeekerThemeProvider>
              <SafeAreaView
                style={[
                  styles.shell,
                  {
                    backgroundColor: SeekerTheme.colors.background.primary,
                  },
                ]}
              >
                <AppNavigator theme={SeekerNavigationTheme} />
              </SafeAreaView>
            </SeekerThemeProvider>
          </WalletProvider>
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
