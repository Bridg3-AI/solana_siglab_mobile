import { Button, IconButton, Menu, useTheme } from "react-native-paper";
import { Account, useAuthorization } from "../../utils/useAuthorization";
import { useMobileWallet } from "../../utils/useMobileWallet";
import { useNavigation } from "@react-navigation/native";
import { ellipsify } from "../../utils/ellipsify";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Linking, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { InsuranceColors, InsuranceStyles } from "../../theme/insurance-styles";
// import { useCluster } from "../cluster/cluster-data-access"; // Temporarily disabled for iOS compatibility

const styles = StyleSheet.create({
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    minWidth: 100,
  },
  
  connectedButton: {
    backgroundColor: InsuranceColors.primary.teal,
    borderColor: InsuranceColors.primary.teal,
  },
  
  disconnectedButton: {
    backgroundColor: InsuranceColors.glass.background,
    borderColor: InsuranceColors.glass.border,
  },
  
  walletButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  
  connectedText: {
    color: InsuranceColors.background.primary,
  },
  
  disconnectedText: {
    color: InsuranceColors.primary.teal,
  },
  
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: InsuranceColors.glass.background,
    borderWidth: 1,
    borderColor: InsuranceColors.glass.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  menuContent: {
    backgroundColor: InsuranceColors.glass.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: InsuranceColors.glass.border,
  },
  
  menuItemText: {
    color: InsuranceColors.text.primary,
    fontSize: 14,
  },
});

export function TopBarWalletButton({
  selectedAccount,
  openMenu,
}: {
  selectedAccount: Account | null;
  openMenu: () => void;
}) {
  const { connect } = useMobileWallet();
  return (
    <Button
      icon="wallet"
      mode="contained-tonal"
      style={{ alignSelf: "center" }}
      onPress={selectedAccount ? openMenu : connect}
    >
      {selectedAccount
        ? ellipsify(selectedAccount.publicKey.toBase58())
        : "Connect"}
    </Button>
  );
}

export function TopBarSettingsButton() {
  const navigation = useNavigation();
  return (
    <IconButton
      icon="cog"
      mode="contained-tonal"
      onPress={() => {
        navigation.navigate("Settings");
      }}
    />
  );
}

export function TopBarWalletMenu() {
  const { selectedAccount } = useAuthorization();
  
  // Use static explorer URL for now to avoid ClusterProvider issues
  const getExplorerUrl = (path: string) => `https://explorer.solana.com/${path}?cluster=devnet`;
  
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { disconnect } = useMobileWallet();

  const copyAddressToClipboard = async () => {
    if (selectedAccount) {
      await Clipboard.setStringAsync(selectedAccount.publicKey.toBase58());
    }
    closeMenu();
  };

  const viewExplorer = () => {
    if (selectedAccount) {
      const explorerUrl = getExplorerUrl(
        `account/${selectedAccount.publicKey.toBase58()}`
      );
      Linking.openURL(explorerUrl);
    }
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TopBarWalletButton
          selectedAccount={selectedAccount}
          openMenu={openMenu}
        />
      }
    >
      <Menu.Item
        onPress={copyAddressToClipboard}
        title="Copy address"
        leadingIcon="content-copy"
      />
      <Menu.Item
        onPress={viewExplorer}
        title="View Explorer"
        leadingIcon="open-in-new"
      />
      <Menu.Item
        onPress={async () => {
          await disconnect();
          closeMenu();
        }}
        title="Disconnect"
        leadingIcon="link-off"
      />
    </Menu>
  );
}
