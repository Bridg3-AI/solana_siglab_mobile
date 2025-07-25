import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { 
  SeekerCard, 
  SeekerText, 
  SeekerButton,
  useSeekerTheme 
} from '../../../components/seeker';

const { width } = Dimensions.get('window');

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcon.glyphMap;
  route?: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'chat',
    title: 'AI Assistant',
    description: 'Chat with your intelligent insurance agent',
    icon: 'message-text',
    route: 'Chat',
  },
  {
    id: 'map',
    title: 'Location Services',
    description: 'View GPS-based insurance coverage areas',
    icon: 'map-marker',
    route: 'Map',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure your insurance preferences',
    icon: 'cog',
    route: 'Settings',
  },
];

export const QuickActions: React.FC = () => {
  const { theme } = useSeekerTheme();
  const navigation = useNavigation();

  const handleActionPress = (action: QuickAction) => {
    if (action.route) {
      navigation.navigate(action.route as never);
    }
  };

  const ActionCard = ({ action }: { action: QuickAction }) => (
    <TouchableOpacity
      onPress={() => handleActionPress(action)}
      style={styles.actionContainer}
      activeOpacity={0.8}
    >
      <SeekerCard variant="solid" style={styles.actionCard} elevated>
        <View style={styles.actionContent}>
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary.teal + '20' }]}>
            <MaterialCommunityIcon
              name={action.icon}
              size={24}
              color={theme.colors.primary.teal}
            />
          </View>
          
          {/* Text Content */}
          <View style={styles.textContent}>
            <SeekerText variant="h3" color="primary" style={styles.actionTitle}>
              {action.title}
            </SeekerText>
            <SeekerText variant="body" color="secondary" style={styles.actionDescription}>
              {action.description}
            </SeekerText>
          </View>
          
          {/* Arrow indicator */}
          <MaterialCommunityIcon
            name="chevron-right"
            size={20}
            color={theme.colors.text.tertiary}
            style={styles.arrowIcon}
          />
        </View>
      </SeekerCard>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SeekerText variant="overline" color="tertiary" style={styles.sectionTitle}>
        Quick Actions
      </SeekerText>
      
      <View style={styles.actionsContainer}>
        {quickActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </View>
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
  
  // Actions container
  actionsContainer: {
    gap: 12,
  },
  
  // Action card styles
  actionContainer: {
    marginBottom: 0,
  },
  actionCard: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Icon container
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  // Text content
  textContent: {
    flex: 1,
  },
  actionTitle: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  actionDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  
  // Arrow icon
  arrowIcon: {
    marginLeft: 8,
  },
});