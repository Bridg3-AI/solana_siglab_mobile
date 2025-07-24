import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { 
  CyberCard, 
  CyberText, 
  NeonText,
  TerminalText,
  useCyberpunkTheme 
} from '../../../components/cyberpunk';

const { width } = Dimensions.get('window');

interface QuickAction {
  id: string;
  title: string;
  code: string;
  description: string;
  icon: string;
  route?: string;
  neonColor: 'cyan' | 'magenta' | 'purple' | 'lime';
  gridPosition: { x: number; y: number };
}

const quickActions: QuickAction[] = [
  {
    id: 'chat',
    title: 'NEURAL CHAT',
    code: 'AI_AGENT.exe',
    description: 'NATURAL LANGUAGE INSURANCE PROTOCOL',
    icon: 'robot',
    route: 'Chat',
    neonColor: 'cyan',
    gridPosition: { x: 0, y: 0 },
  },
  {
    id: 'map',
    title: 'GPS MATRIX',
    code: 'LOCATION.sys',
    description: 'GEOGRAPHIC RISK ASSESSMENT MODULE',
    icon: 'radar',
    route: 'Map',
    neonColor: 'magenta',
    gridPosition: { x: 1, y: 0 },
  },
  {
    id: 'settings',
    title: 'SYSTEM CONFIG',
    code: 'SETTINGS.cfg',
    description: 'NEURAL NETWORK CONFIGURATION PANEL',
    icon: 'tune',
    route: 'Settings',
    neonColor: 'purple',
    gridPosition: { x: 0.5, y: 1 },
  },
];

export const QuickActions: React.FC = () => {
  const { colors, spacing } = useCyberpunkTheme();
  const navigation = useNavigation();
  
  // Animation refs for each action
  const animRefs = useRef(quickActions.map(() => new Animated.Value(1))).current;
  const pulseRefs = useRef(quickActions.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    // Start pulse animations for each action with different delays
    quickActions.forEach((_, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseRefs[index], {
              toValue: 1.05,
              duration: 2000 + index * 500,
              useNativeDriver: true,
            }),
            Animated.timing(pulseRefs[index], {
              toValue: 1,
              duration: 2000 + index * 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, index * 200);
    });
  }, []);

  const handleActionPress = (action: QuickAction, index: number) => {
    // Trigger press animation
    Animated.sequence([
      Animated.timing(animRefs[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animRefs[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (action.route) {
      navigation.navigate(action.route as never);
    }
  };

  const HexagonButton = ({ action, index }: { action: QuickAction; index: number }) => (
    <Animated.View
      style={[
        styles.hexagonContainer,
        {
          transform: [
            { scale: Animated.multiply(animRefs[index], pulseRefs[index]) },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => handleActionPress(action, index)}
        style={styles.hexagonButton}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[
            `${colors.neon[action.neonColor]}30`,
            `${colors.neon[action.neonColor]}10`,
            colors.dark.deep,
          ]}
          style={styles.hexagonGradient}
        >
          {/* Circuit connections */}
          <View style={styles.circuitPattern}>
            <View style={[styles.circuitLine, { backgroundColor: colors.neon[action.neonColor] }]} />
            <View style={[styles.circuitDot, { backgroundColor: colors.neon[action.neonColor] }]} />
          </View>
          
          {/* Icon */}
          <View style={[styles.iconContainer, { borderColor: colors.neon[action.neonColor] }]}>
            <MaterialCommunityIcon
              name={action.icon as any}
              size={28}
              color={colors.neon[action.neonColor]}
            />
          </View>
          
          {/* Text Content */}
          <View style={styles.textContent}>
            <TerminalText style={[styles.actionCode, { color: colors.neon[action.neonColor] }]}>
              {action.code}
            </TerminalText>
            <CyberText variant="h6" color="primary" style={styles.actionTitle}>
              {action.title}
            </CyberText>
            <CyberText variant="caption" color="tertiary" style={styles.actionDescription}>
              {action.description}
            </CyberText>
          </View>
          
          {/* Status indicator */}
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: colors.neon[action.neonColor] }]} />
            <TerminalText style={styles.statusText}>READY</TerminalText>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <CyberText variant="overline" color="tertiary" style={styles.sectionTitle}>
        >> QUICK ACCESS PROTOCOLS
      </CyberText>
      
      {/* Neural network background */}
      <View style={styles.neuralNetwork}>
        {/* Connection lines between modules */}
        <View style={styles.connectionLines}>
          <View style={[styles.connectionLine, { backgroundColor: colors.border.primary }]} />
          <View style={[styles.connectionLineVertical, { backgroundColor: colors.border.primary }]} />
        </View>
        
        {/* Action modules */}
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <HexagonButton key={action.id} action={action} index={index} />
          ))}
        </View>
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
    letterSpacing: 1,
  },
  
  // Neural network grid
  neuralNetwork: {
    position: 'relative',
    minHeight: 280,
  },
  connectionLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  connectionLine: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    right: '20%',
    height: 1,
  },
  connectionLineVertical: {
    position: 'absolute',
    left: '50%',
    top: '40%',
    bottom: '20%',
    width: 1,
  },
  
  // Actions grid
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  
  // Hexagon button styles
  hexagonContainer: {
    width: (width - 60) / 2,
    marginBottom: 20,
  },
  hexagonButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
  },
  hexagonGradient: {
    padding: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  
  // Circuit pattern
  circuitPattern: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
  },
  circuitLine: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 6,
    height: 1,
    opacity: 0.6,
  },
  circuitDot: {
    position: 'absolute',
    top: 8,
    right: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  
  // Icon container
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  
  // Text content
  textContent: {
    alignItems: 'center',
  },
  actionCode: {
    fontSize: 10,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  actionTitle: {
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 1,
  },
  actionDescription: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 14,
    paddingHorizontal: 8,
  },
  
  // Status indicator
  statusIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 8,
    opacity: 0.8,
  },
});