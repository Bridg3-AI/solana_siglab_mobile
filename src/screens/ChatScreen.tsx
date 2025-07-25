import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { 
  SeekerCard, 
  SeekerButton, 
  SeekerText, 
  SeekerHeading,
  useSeekerTheme 
} from '../components/seeker';

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
  { id: '1', label: 'Travel Insurance', icon: 'airplane' as const },
  { id: '2', label: 'Event Coverage', icon: 'calendar-star' as const },
  { id: '3', label: 'Adventure Sports', icon: 'hiking' as const },
  { id: '4', label: 'GPS Coverage', icon: 'map-marker-radius' as const },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Seeker AI insurance assistant. I\'m here to help you find the perfect GPS-based coverage for your activities.\n\nWhat kind of insurance are you looking for today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const { theme } = useSeekerTheme();
  const scrollViewRef = useRef<ScrollView>(null);

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
      
      // AI response simulation - Clean professional style
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I understand you\'re interested in that coverage. Let me check your location and provide personalized insurance options based on your GPS data.\n\nI\'ll analyze the risk factors for your area and suggest the best coverage plans.',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 1000);
    }
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    const message: Message = {
      id: Date.now().toString(),
      text: `I'm interested in ${action.label}`,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
    
    // AI response for quick action
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Great choice! ${action.label} is perfect for your needs. I can help you set up coverage that automatically activates based on your location.\n\nWould you like me to show you available plans in your area?`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 1500);
  };

  const Avatar = ({ isUser }: { isUser: boolean }) => {
    return isUser ? (
      <View style={[styles.userAvatar, { backgroundColor: theme.colors.primary.teal + '20' }]}>
        <MaterialCommunityIcon name="account" size={20} color={theme.colors.primary.teal} />
      </View>
    ) : (
      <LinearGradient
        colors={theme.colors.gradients.primary}
        style={styles.aiAvatar}
      >
        <MaterialCommunityIcon name="robot" size={20} color={theme.colors.text.primary} />
      </LinearGradient>
    );
  };

  const renderMessage = (message: Message) => {
    const isUser = message.isUser;
    
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.aiMessage
        ]}
      >
        {!isUser && <Avatar isUser={false} />}
        
        <SeekerCard
          variant={isUser ? "solid" : "gradient"}
          style={[
            styles.messageCard,
            { maxWidth: width * 0.75 },
            isUser ? { backgroundColor: theme.colors.primary.teal } : {}
          ]}
        >
          <SeekerText 
            variant="body" 
            color={isUser ? "primary" : "primary"}
            style={styles.messageText}
          >
            {message.text}
          </SeekerText>
          
          {message.type === 'insurance_offer' && message.insuranceData && (
            <SeekerCard variant="outline" style={styles.insuranceOffer}>
              <SeekerHeading level={3} style={styles.insuranceTitle}>
                Insurance Quote Ready
              </SeekerHeading>
              <SeekerText variant="body" style={styles.insuranceDetail}>
                📍 Location: {message.insuranceData.location}
              </SeekerText>
              <SeekerText variant="body" style={styles.insuranceDetail}>
                ⏰ Duration: {message.insuranceData.duration}
              </SeekerText>
              <SeekerText variant="body" style={styles.insuranceDetail}>
                💰 Premium: {message.insuranceData.price}
              </SeekerText>
              <SeekerButton
                title="Get Coverage"
                onPress={() => {}}
                variant="primary"
                size="sm"
                style={{ marginTop: 16 }}
              />
            </SeekerCard>
          )}
        </SeekerCard>
        
        {isUser && <Avatar isUser={true} />}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <LinearGradient
        colors={theme.colors.gradients.hero}
        style={StyleSheet.absoluteFill}
      />
      
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Clean Header with Status */}
        <SeekerCard variant="solid" style={styles.headerCard} elevated>
          <View style={styles.headerContent}>
            <View style={[styles.statusIcon, { backgroundColor: theme.colors.status.success + '20' }]}>
              <MaterialCommunityIcon 
                name="map-marker-check" 
                size={20} 
                color={theme.colors.status.success}
              />
            </View>
            <View style={styles.locationInfo}>
              <SeekerText variant="body" color="primary" style={styles.locationLabel}>
                Location Services Active
              </SeekerText>
              <SeekerText variant="caption" color="secondary">
                Seoul, South Korea • GPS Ready
              </SeekerText>
            </View>
            <View style={styles.statusIndicators}>
              <View style={[styles.statusDot, { backgroundColor: theme.colors.status.success }]} />
              <SeekerText variant="caption" color="accent" style={styles.statusText}>
                Online
              </SeekerText>
            </View>
          </View>
        </SeekerCard>

        {/* Chat Interface */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <SeekerText variant="overline" color="tertiary" style={styles.quickActionLabel}>
            Quick Actions
          </SeekerText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => handleQuickAction(action)}
                style={styles.actionChip}
              >
                <View style={[styles.chipContent, { backgroundColor: theme.colors.background.elevated }]}>
                  <MaterialCommunityIcon 
                    name={action.icon} 
                    size={16} 
                    color={theme.colors.primary.teal} 
                  />
                  <SeekerText variant="caption" color="primary" style={styles.chipText}>
                    {action.label}
                  </SeekerText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Area */}
        <SeekerCard variant="solid" style={styles.inputContainer} elevated>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Type your message..."
              placeholderTextColor={theme.colors.text.tertiary}
              value={inputText}
              onChangeText={setInputText}
              style={[styles.textInput, { color: theme.colors.text.primary }]}
              onSubmitEditing={handleSendMessage}
              multiline
            />
            <TouchableOpacity 
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
              style={[
                styles.sendButton, 
                { 
                  opacity: inputText.trim() ? 1 : 0.5,
                  backgroundColor: theme.colors.primary.teal 
                }
              ]}
            >
              <MaterialCommunityIcon 
                name="send" 
                size={20} 
                color={theme.colors.text.primary} 
              />
            </TouchableOpacity>
          </View>
        </SeekerCard>
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
    margin: 16,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  statusIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
  },
  
  // Chat area styles
  chatArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatContent: {
    paddingBottom: 20,
    paddingTop: 8,
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
    marginHorizontal: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  messageText: {
    lineHeight: 20,
    fontSize: 15,
  },
  
  // Avatar styles
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Insurance offer styles
  insuranceOffer: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  insuranceTitle: {
    marginBottom: 12,
  },
  insuranceDetail: {
    marginBottom: 8,
    fontSize: 14,
  },
  
  // Quick actions styles
  quickActions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  quickActionLabel: {
    marginBottom: 12,
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  actionChip: {
    marginRight: 12,
    borderRadius: 20,
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  chipText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
  },
  
  // Input styles
  inputContainer: {
    margin: 16,
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});