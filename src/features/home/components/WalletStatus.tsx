import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuthorization } from '../../../utils/useAuthorization';
import { SignInFeature } from '../../../components/sign-in/sign-in-feature';
import { AccountDetailFeature } from '../../../components/account/account-detail-feature';
import { cyberpunkEffects } from '../../../theme/cyberpunkEffects';
import { CyberpunkColors } from '../../../theme/cyberpunkTheme';

export const WalletStatus: React.FC = () => {
  const theme = useTheme();
  const { selectedAccount } = useAuthorization();

  if (selectedAccount) {
    return (
      <View style={styles.container}>
        <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow(), { color: theme.colors.onSurface }]}>
          연결된 지갑
        </Text>
        <AccountDetailFeature />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow(), { color: theme.colors.onSurface }]}>
        지갑 연결
      </Text>
      
      <Card style={[styles.card, cyberpunkEffects.holographicCard()]}>
        <Card.Content style={styles.content}>
          <View style={[styles.iconContainer, cyberpunkEffects.neonGlow(CyberpunkColors.neonBlue)]}>
            <MaterialCommunityIcon
              name="wallet-outline"
              size={32}
              color={CyberpunkColors.neonBlue}
            />
          </View>
          
          <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            Solana Mobile 지갑을 연결하여 GPS 기반 보험 서비스를 이용하세요
          </Text>
          
          <SignInFeature />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  card: {
    elevation: 2,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
});
