import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { cyberpunkEffects } from '../../../theme/cyberpunkEffects';
import { CyberpunkColors } from '../../../theme/cyberpunkTheme';

const { width } = Dimensions.get('window');

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route?: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'chat',
    title: 'AI 에이전트 채팅',
    description: '자연어로 보험 상담',
    icon: 'chat-processing',
    route: 'Chat',
  },
  {
    id: 'map',
    title: '위치 기반 보험',
    description: '현재 위치 맞춤 보험',
    icon: 'map-marker-radius',
    route: 'Map',
  },
  {
    id: 'settings',
    title: '설정',
    description: '앱 설정 및 프로필',
    icon: 'cog',
    route: 'Settings',
  },
];

export const QuickActions: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleActionPress = (action: QuickAction) => {
    if (action.route) {
      navigation.navigate(action.route as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow(), { color: theme.colors.onSurface }]}>
        빠른 실행
      </Text>
      
      <View style={styles.actionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={() => handleActionPress(action)}
            style={styles.actionButton}
          >
            <Card style={[styles.actionCard, cyberpunkEffects.cardGlow(), { backgroundColor: `${theme.colors.surface}E6` }]}>
              <Card.Content style={styles.actionContent}>
                <View style={[styles.actionIconContainer, cyberpunkEffects.neonGlow(theme.colors.secondary), { backgroundColor: `${theme.colors.secondaryContainer}E6` }]}>
                  <MaterialCommunityIcon
                    name={action.icon as any}
                    size={24}
                    color={theme.colors.secondary}
                  />
                </View>
                
                <Text variant="labelLarge" style={[styles.actionTitle, cyberpunkEffects.textGlow(), { color: theme.colors.onSurface }]}>
                  {action.title}
                </Text>
                
                <Text variant="bodySmall" style={[styles.actionDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {action.description}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 48) / 2,
    marginBottom: 12,
  },
  actionCard: {
    elevation: 2,
  },
  actionContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
  },
  actionDescription: {
    textAlign: 'center',
    fontSize: 12,
  },
});
