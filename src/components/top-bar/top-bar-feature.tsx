import { StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { TopBarWalletButton, TopBarWalletMenu, TopBarSettingsButton } from "./top-bar-ui";
import { useNavigation } from "@react-navigation/core";
import { InsuranceColors, InsuranceStyles } from "../../theme/insurance-styles";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function TopBar() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          InsuranceColors.glass.header,
          'rgba(0, 0, 0, 0.1)',
          'transparent'
        ]}
        style={styles.gradient}
      />
      <View style={[InsuranceStyles.glassHeader, styles.topBar]}>
        <View style={styles.leftSection}>
          {/* Logo or Brand */}
          <View style={styles.brandContainer}>
            <MaterialCommunityIcons 
              name="shield-plus" 
              size={24} 
              color={InsuranceColors.primary.teal} 
            />
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <TopBarWalletMenu />
          <TopBarSettingsButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 0,
  },
  
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50, // Account for status bar
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    zIndex: 1,
  },
  
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  brandContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: InsuranceColors.glass.background,
    borderWidth: 1,
    borderColor: InsuranceColors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
