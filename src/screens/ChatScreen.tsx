import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Animated, TouchableOpacity } from 'react-native';
import { 
  TextInput as PaperTextInput, 
  useTheme
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { 
  CyberCard, 
  NeonButton, 
  CyberText, 
  NeonText, 
  GlitchText,
  TerminalText,
  useCyberpunkTheme 
} from '../components/cyberpunk';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'insurance_offer' | 'location_info';
  insuranceData?: {
    location: string;
    duration: string;
    price: string;
    coverage: string[];
  };
}

const quickActions = [
  { id: '1', label: 'TRAVEL_INSURANCE', icon: 'airplane', neonColor: 'cyan' as const },
  { id: '2', label: 'FESTIVAL_SHIELD', icon: 'music', neonColor: 'magenta' as const },
  { id: '3', label: 'MOUNTAIN_PROTOCOL', icon: 'mountain', neonColor: 'purple' as const },
  { id: '4', label: 'GPS_COVERAGE', icon: 'map-marker', neonColor: 'lime' as const },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'NEURAL LINK ESTABLISHED...\nGPS-BASED AI INSURANCE AGENT ONLINE\n> INITIALIZING CYBERSECURITY PROTOCOLS\n> SCANNING LOCATION DATA\n\nHOW MAY I ASSIST WITH YOUR INSURANCE NEEDS?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const theme = useTheme();
  const { colors, spacing } = useCyberpunkTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Pulse animation for AI elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // AI 응답 시뮬레이션 - Cyberpunk style
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: '> ACCESSING SATELLITE NETWORK...\n> TRIANGULATING GPS COORDINATES\n> ANALYZING RISK MATRIX\n\nLOCATION VERIFIED. GENERATING INSURANCE PROTOCOLS...',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const message: Message = {
      id: Date.now().toString(),
      text: `EXECUTE ${action.label} PROTOCOL`,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
    
    // AI response for protocol activation
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `> ${action.label} ACTIVATED\n> SCANNING ENVIRONMENTAL DATA\n> CALCULATING PREMIUM MATRIX\n\nPROTOCOL READY FOR DEPLOYMENT`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const CyberAvatar = ({ isUser, animate = false }: { isUser: boolean, animate?: boolean }) => {
    const avatarContent = isUser ? (
      <View style={styles.userAvatar}>
        <MaterialCommunityIcon name="account-circle" size={24} color={colors.neon.cyan} />
      </View>
    ) : (
      <Animated.View 
        style={[
          styles.aiAvatar,
          animate && { transform: [{ scale: pulseAnim }] }
        ]}
      >
        <LinearGradient
          colors={colors.gradients.neonPrimary}
          style={styles.avatarGradient}
        >
          <MaterialCommunityIcon name="robot" size={20} color={colors.dark.void} />
        </LinearGradient>
      </Animated.View>
    );
    
    return avatarContent;
  };

  const renderMessage = (message: Message) => {
    const isUser = message.isUser;
    
    return (
      <Animated.View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.aiMessage,
          { opacity: fadeAnim }
        ]}
      >
        {!isUser && <CyberAvatar isUser={false} animate={true} />}
        
        <CyberCard
          variant={isUser ? "neon" : "hologram"}
          glowColor={isUser ? "cyan" : "magenta"}
          style={[
            styles.messageCard,
            { maxWidth: width * 0.75 }
          ]}
        >
          {isUser ? (
            <CyberText 
              variant="body" 
              color="primary"
              style={styles.messageText}
            >
              {message.text}
            </CyberText>
          ) : (
            <TerminalText style={styles.aiMessageText}>
              {message.text}
            </TerminalText>
          )}
          
          {message.type === 'insurance_offer' && message.insuranceData && (
            <CyberCard variant="glass" style={styles.insuranceOffer}>
              <GlitchText variant="h6" style={styles.insuranceTitle}>
                >> INSURANCE PROTOCOL READY
              </GlitchText>
              <TerminalText>📍 ZONE: {message.insuranceData.location}</TerminalText>
              <TerminalText>⏰ DURATION: {message.insuranceData.duration}</TerminalText>
              <TerminalText>💰 PREMIUM: {message.insuranceData.price}</TerminalText>
              <NeonButton
                title="DEPLOY PROTOCOL"
                onPress={() => {}}
                variant="primary"
                size="small"
                style={{ marginTop: spacing.space[3] }}
              />
            </CyberCard>
          )}
        </CyberCard>
        
        {isUser && <CyberAvatar isUser={true} />}
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.dark.void }]}>
      <LinearGradient
        colors={[colors.dark.void, colors.dark.deep, colors.dark.void]}
        style={StyleSheet.absoluteFill}
      />
      
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Cyberpunk Header with GPS Status */}
        <CyberCard variant="glass" style={styles.headerCard}>
          <View style={styles.headerContent}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <MaterialCommunityIcon 
                name="satellite-variant" 
                size={20} 
                color={colors.neon.lime} 
                style={styles.satelliteIcon}
              />
            </Animated.View>
            <View style={styles.locationInfo}>
              <TerminalText style={styles.locationLabel}>GPS_LOCK: ACTIVE</TerminalText>
              <NeonText neonColor="cyan" variant="caption">
                COORDINATES: 37.5665°N 126.9780°E
              </NeonText>
            </View>
            <View style={styles.statusIndicators}>
              <View style={[styles.statusDot, { backgroundColor: colors.neon.lime }]} />
              <TerminalText style={styles.statusText}>ONLINE</TerminalText>
            </View>
          </View>
        </CyberCard>

        {/* Neural Chat Interface */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {/* Neural network background pattern */}
          <View style={styles.neuralBackground} />
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Cyber Protocol Quick Actions */}
        <View style={styles.quickActions}>
          <CyberText variant="overline" color="tertiary" style={styles.quickActionLabel}>
            >> QUICK PROTOCOLS
          </CyberText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => handleQuickAction(action)}
                style={styles.protocolChip}
              >
                <LinearGradient
                  colors={[`${colors.neon[action.neonColor]}20`, `${colors.neon[action.neonColor]}10`]}
                  style={styles.chipGradient}
                >
                  <MaterialCommunityIcon 
                    name={action.icon} 
                    size={16} 
                    color={colors.neon[action.neonColor]} 
                  />
                  <TerminalText style={[styles.chipText, { color: colors.neon[action.neonColor] }]}>
                    {action.label}
                  </TerminalText>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Cyberpunk Input Terminal */}
        <CyberCard variant="neon" glowColor="cyan" style={styles.inputContainer}>
          <View style={styles.terminalInput}>
            <TerminalText style={styles.inputPrefix}>root@neural_net:~$ </TerminalText>
            <PaperTextInput
              mode="flat"
              placeholder="Enter command..."
              placeholderTextColor={colors.text.tertiary}
              value={inputText}
              onChangeText={setInputText}
              style={styles.textInput}
              theme={{
                colors: {
                  primary: colors.neon.cyan,
                  text: colors.text.primary,
                  placeholder: colors.text.tertiary,
                  background: 'transparent',
                }
              }}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity 
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
              style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
            >
              <LinearGradient
                colors={colors.gradients.neonPrimary}
                style={styles.sendGradient}
              >
                <MaterialCommunityIcon 
                  name="send" 
                  size={20} 
                  color={colors.dark.void} 
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </CyberCard>

        {/* Neural Voice Input */}
        <TouchableOpacity style={styles.voiceFab}>
          <LinearGradient
            colors={colors.gradients.electric}
            style={styles.fabGradient}
          >
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <MaterialCommunityIcon 
                name="microphone" 
                size={24} 
                color={colors.dark.void} 
              />
            </Animated.View>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  
  // Header styles
  headerCard: {
    margin: 12,
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  satelliteIcon: {
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    letterSpacing: 1,
  },
  statusIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
  },
  
  // Chat area styles
  chatArea: {
    flex: 1,
    paddingHorizontal: 12,
  },
  chatContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  neuralBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  
  // Message styles
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  messageCard: {
    flex: 1,
    marginHorizontal: 8,
  },
  messageText: {
    lineHeight: 20,
  },
  aiMessageText: {
    lineHeight: 18,
    fontSize: 13,
  },
  
  // Avatar styles
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Insurance offer styles
  insuranceOffer: {
    marginTop: 12,
  },
  insuranceTitle: {
    marginBottom: 8,
  },
  
  // Quick actions styles
  quickActions: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quickActionLabel: {
    marginBottom: 8,
    marginLeft: 4,
  },
  protocolChip: {
    marginRight: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  chipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chipText: {
    marginLeft: 6,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  
  // Input styles
  inputContainer: {
    margin: 12,
    marginTop: 8,
  },
  terminalInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPrefix: {
    fontSize: 14,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: 'Courier New',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 8,
  },
  sendGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Voice FAB styles
  voiceFab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});