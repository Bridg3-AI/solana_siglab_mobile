import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuthorization } from '../../../utils/useAuthorization';
import { SignInFeature } from '../../../components/sign-in/sign-in-feature';
import { AccountDetailFeature } from '../../../components/account/account-detail-feature';
import { 
  SeekerCard, 
  SeekerText, 
  SeekerHeading,
  useSeekerTheme 
} from '../../../components/seeker';

export const WalletStatus: React.FC = () => {
  const { theme } = useSeekerTheme();
  const { selectedAccount } = useAuthorization();

  if (selectedAccount) {
    return (
      <View style={styles.container}>
        <SeekerText variant="overline" color="tertiary" style={styles.sectionTitle}>
          Wallet Status
        </SeekerText>
        
        <SeekerCard variant="solid" style={styles.connectedCard} elevated>
          <View style={styles.connectedContent}>
            {/* Connection Status Header */}
            <View style={styles.statusHeader}>
              <LinearGradient
                colors={theme.colors.gradients.primary}
                style={styles.connectionIndicator}
              >
                <MaterialCommunityIcon
                  name="check-circle"
                  size={24}
                  color={theme.colors.text.primary}
                />
              </LinearGradient>
              
              <View style={styles.statusText}>
                <SeekerHeading level={3} style={styles.connectedTitle}>
                  Wallet Connected
                </SeekerHeading>
                <SeekerText variant="body" color="secondary" style={styles.connectedStatus}>
                  Solana network • Ready for transactions
                </SeekerText>
              </View>
            </View>
            
            {/* Account Details */}
            <View style={styles.accountWrapper}>
              <AccountDetailFeature />
            </View>
          </View>
        </SeekerCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SeekerText variant="overline" color="tertiary" style={styles.sectionTitle}>
        Wallet Connection
      </SeekerText>
      
      <SeekerCard variant="outline" style={styles.disconnectedCard}>
        <View style={styles.disconnectedContent}>
          {/* Wallet Icon */}
          <View style={styles.walletIconContainer}>
            <View style={[styles.iconBackground, { backgroundColor: theme.colors.status.warning + '20' }]}>
              <MaterialCommunityIcon
                name="wallet-outline"
                size={40}
                color={theme.colors.status.warning}
              />
            </View>
          </View>
          
          <View style={styles.disconnectedText}>
            <SeekerHeading level={3} style={styles.disconnectedTitle}>
              Connect Your Wallet
            </SeekerHeading>
            <SeekerText variant="body" color="secondary" style={styles.disconnectedDescription}>
              Connect your Solana wallet to access GPS-based insurance services and manage your coverage.
            </SeekerText>
          </View>
          
          {/* Connection Interface */}
          <View style={styles.connectionInterface}>
            <SignInFeature />
          </View>
        </View>
      </SeekerCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Connected state styles
  connectedCard: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  connectedContent: {
    // No additional padding needed, already in card
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  connectionIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusText: {
    flex: 1,
  },
  connectedTitle: {
    marginBottom: 4,
  },
  connectedStatus: {
    fontSize: 14,
  },
  accountWrapper: {
    width: '100%',
  },
  
  // Disconnected state styles
  disconnectedCard: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  disconnectedContent: {
    alignItems: 'center',
  },
  walletIconContainer: {
    marginBottom: 24,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disconnectedText: {
    alignItems: 'center',
    marginBottom: 32,
  },
  disconnectedTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  disconnectedDescription: {
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  connectionInterface: {
    width: '100%',
    alignItems: 'center',
  },
});