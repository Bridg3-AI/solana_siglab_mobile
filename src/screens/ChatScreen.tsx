/**
 * Chat Screen - Converted from dApp_UI ChatInput.tsx
 * Insurance idea input with natural language processing
 */
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text,
  ScrollView, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform, 
  Pressable, 
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MapView, MapViewRef } from '../features/map/components/MapView';

import { InsuranceStyles, InsuranceColors, GradientConfigs } from '../theme/insurance-styles';
import type { InsuranceData } from '../navigators/AppNavigator';

const { width, height } = Dimensions.get('window');

// Festival insurance prompts
const examplePrompts = [
  {
    category: 'Festival',
    prompts: [
      'Cover medical expenses if injured at Fuji Rock Festival',
      'Pay $300 if festival is cancelled due to typhoon',
      'Cover theft/loss of items at festival grounds'
    ]
  },
  {
    category: 'Travel',
    prompts: [
      'Cover flight cancellation to Japan for festival',
      'Pay $500 if unable to attend due to illness',
      'Cover accommodation if festival dates change'
    ]
  },
  {
    category: 'Weather',
    prompts: [
      'Pay $200 per day if heavy rain during festival',
      'Cover gear damage from rain/mud at festival',
      'Pay $100 if temperature exceeds 35°C at venue'
    ]
  }
];

type RootStackParamList = {
  Chat: { data?: Partial<InsuranceData> };
  Score: { data: InsuranceData };
  InsuranceHome: undefined;
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export default function ChatScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ChatScreenRouteProp>();
  const mapRef = useRef<MapViewRef>(null);
  
  const initialData = route.params?.data || {};
  const [input, setInput] = useState(initialData.description || '');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(true);

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('Please describe your festival insurance needs.');
      return;
    }

    if (input.length > 120) {
      setError('Please keep your request under 120 characters.');
      return;
    }

    setIsProcessing(true);
    setError('');

    // Simulate AI processing for festival insurance
    setTimeout(() => {
      setIsProcessing(false);
      
      // For demo: show insurance options in map view
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: 36.8447,
          longitude: 138.8049,
        });
      }
      
      // Navigate to Score screen with festival insurance data
      const insuranceData: InsuranceData = {
        description: input,
        indicator: 'Festival attendance',
        threshold: 1,
        period: 3, // 3 days festival
        premium: 0.08, // 0.08 SOL
        maxPayout: 1000,
        reliability: 95,
        currency: 'USD',
        status: 'draft',
        ...initialData
      };
      
      navigation.navigate('Score', { data: insuranceData });
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setError('');
  };

  const handleBack = () => {
    navigation.navigate('InsuranceHome');
  };

  return (
    <SafeAreaView style={InsuranceStyles.safeArea}>
      <StatusBar style="light" />
      
      {/* Split View Container */}
      <View style={newStyles.container}>
        {/* Map View (Top 60%) */}
        <View style={newStyles.mapContainer}>
          <MapView ref={mapRef} />
        </View>
        
        {/* Chat Interface (Bottom 40%) */}
        <LinearGradient
          colors={GradientConfigs.background.colors}
          start={GradientConfigs.background.start}
          end={GradientConfigs.background.end}
          style={newStyles.chatContainer}
        >
        {/* Compact Header */}
        <View style={[InsuranceStyles.glassHeader, newStyles.compactHeader]}>
          <View style={[InsuranceStyles.maxWidth, InsuranceStyles.spaceBetween]}>
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed && { opacity: 0.7 }
              ]}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={20} color={InsuranceColors.text.primary} />
              <Text style={[InsuranceStyles.secondaryText, styles.backText]}>Back</Text>
            </Pressable>
            
            <View style={styles.headerCenter}>
              <Text style={[InsuranceStyles.gradientText, newStyles.headerTitle]}>
                Festival Insurance AI
              </Text>
            </View>
            
            <View style={styles.headerSpacer} />
          </View>
          
        </View>

        <KeyboardAvoidingView 
          style={newStyles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            style={newStyles.scrollView}
            contentContainerStyle={newStyles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth]}>
              
              {/* Compact Instruction */}
              <View style={newStyles.instructionBanner}>
                <MaterialCommunityIcons 
                  name="shield-plus" 
                  size={18} 
                  color={InsuranceColors.primary.teal} 
                />
                <Text style={[InsuranceStyles.secondaryText, newStyles.instructionText]}>
                  Tell me what festival coverage you need
                </Text>
              </View>

              {/* Input Area */}
              <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="e.g. I need medical coverage for Fuji Rock Festival"
                    placeholderTextColor={InsuranceColors.text.muted}
                    style={[InsuranceStyles.textInput, newStyles.compactTextArea]}
                    multiline
                    maxLength={120}
                    textAlignVertical="top"
                  />
                  
                  <View style={styles.inputFooter}>
                    <Text style={[InsuranceStyles.mutedText, styles.charCount]}>
                      {input.length}/120
                    </Text>
                    <Pressable
                      style={styles.micButton}
                      disabled
                    >
                      <Ionicons name="mic" size={16} color={InsuranceColors.text.muted} />
                    </Pressable>
                  </View>
                </View>

                {/* Error Message */}
                {error && (
                  <Card style={[InsuranceStyles.errorCard, styles.errorCard]}>
                    <View style={styles.errorContent}>
                      <Ionicons 
                        name="alert-circle" 
                        size={16} 
                        color={InsuranceColors.status.error} 
                      />
                      <Text style={[styles.errorText]}>
                        {error}
                      </Text>
                    </View>
                  </Card>
                )}

                {/* Submit Button */}
                <Pressable
                  style={({ pressed }) => [
                    InsuranceStyles.primaryButton,
                    styles.submitButton,
                    (!input.trim() || isProcessing) && styles.disabledButton,
                    pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
                  ]}
                  onPress={handleSubmit}
                  disabled={isProcessing || !input.trim()}
                >
                  {isProcessing ? (
                    <View style={styles.processingContent}>
                      <ActivityIndicator 
                        size="small" 
                        color={InsuranceColors.background.primary} 
                      />
                      <Text style={[InsuranceStyles.primaryButtonText, styles.processingText]}>
                        Analyzing...
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.buttonContent}>
                      <Ionicons 
                        name="send" 
                        size={16} 
                        color={InsuranceColors.background.primary} 
                      />
                      <Text style={InsuranceStyles.primaryButtonText}>
                        Get Coverage Quote
                      </Text>
                    </View>
                  )}
                </Pressable>
              </View>

              {/* Example Prompts */}
              <View style={styles.examplesSection}>
                <Text style={[InsuranceStyles.primaryText, styles.sectionTitle]}>
                  Example Ideas
                </Text>
                
                {/* Category Tabs */}
                <View style={styles.categoryTabs}>
                  {examplePrompts.map((category, index) => (
                    <Pressable
                      key={category.category}
                      style={({ pressed }) => [
                        styles.categoryTab,
                        selectedCategory === index ? styles.activeCategoryTab : styles.inactiveCategoryTab,
                        pressed && { opacity: 0.8 }
                      ]}
                      onPress={() => setSelectedCategory(index)}
                    >
                      <Text style={[
                        selectedCategory === index 
                          ? styles.activeCategoryText 
                          : styles.inactiveCategoryText
                      ]}>
                        {category.category}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {/* Prompts */}
                <View style={styles.promptsList}>
                  {examplePrompts[selectedCategory].prompts.map((prompt, index) => (
                    <Pressable
                      key={index}
                      style={({ pressed }) => [
                        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
                      ]}
                      onPress={() => handlePromptClick(prompt)}
                    >
                      <Card style={[InsuranceStyles.glassCard, styles.promptCard]}>
                        <Text style={[InsuranceStyles.secondaryText, styles.promptText]}>
                          {prompt}
                        </Text>
                      </Card>
                    </Pressable>
                  ))}
                </View>
              </View>


            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
    </SafeAreaView>
  );
}

const newStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: InsuranceColors.background.primary,
  },
  
  mapContainer: {
    flex: 0.6, // 60% of screen
    backgroundColor: '#000',
  },
  
  chatContainer: {
    flex: 0.4, // 40% of screen
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
  },
  
  compactHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  headerTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  
  keyboardContainer: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 20,
  },
  
  instructionBanner: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: InsuranceColors.glass.background,
    borderRadius: 12,
    marginBottom: 12,
  },
  
  instructionText: {
    fontSize: 13,
    flex: 1,
  },
  
  compactTextArea: {
    minHeight: 60,
    maxHeight: 80,
    fontSize: 14,
    paddingTop: 12,
  },
});

const styles = {
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  
  backButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  
  backText: {
    fontSize: 14,
  },
  
  headerCenter: {
    alignItems: 'center' as const,
    flex: 1,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  
  headerSpacer: {
    width: 64, // Same as back button width for centering
  },
  
  progressContainer: {
    paddingTop: 12,
  },
  
  keyboardContainer: {
    flex: 1,
  },
  
  instructionCard: {
    padding: 16,
    marginBottom: 24,
  },
  
  instructionContent: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    gap: 12,
  },
  
  instructionText: {
    flex: 1,
    gap: 4,
  },
  
  instructionTitle: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  
  instructionSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  inputSection: {
    marginBottom: 24,
    gap: 16,
  },
  
  inputContainer: {
    gap: 12,
  },
  
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top' as const,
    paddingTop: 16,
  },
  
  inputFooter: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 4,
  },
  
  charCount: {
    fontSize: 10,
  },
  
  micButton: {
    padding: 8,
    opacity: 0.5,
  },
  
  errorCard: {
    padding: 12,
  },
  
  errorContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  
  errorText: {
    color: InsuranceColors.status.error,
    fontSize: 12,
  },
  
  submitButton: {
    minHeight: 52,
  },
  
  disabledButton: {
    opacity: 0.6,
  },
  
  processingContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  
  processingText: {
    marginLeft: 4,
  },
  
  buttonContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  
  examplesSection: {
    marginBottom: 24,
    gap: 16,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
  
  categoryTabs: {
    flexDirection: 'row' as const,
    gap: 8,
  },
  
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  
  activeCategoryTab: {
    backgroundColor: InsuranceColors.primary.teal,
    borderColor: InsuranceColors.primary.teal,
  },
  
  inactiveCategoryTab: {
    backgroundColor: 'transparent',
    borderColor: InsuranceColors.glass.border,
  },
  
  activeCategoryText: {
    color: InsuranceColors.background.primary,
    fontSize: 12,
    fontWeight: '500' as const,
  },
  
  inactiveCategoryText: {
    color: InsuranceColors.text.primary,
    fontSize: 12,
    fontWeight: '500' as const,
  },
  
  promptsList: {
    gap: 8,
  },
  
  promptCard: {
    padding: 12,
  },
  
  promptText: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  tipsCard: {
    padding: 16,
    marginBottom: 24,
  },
  
  tipsTitle: {
    fontSize: 14,
    fontWeight: '500' as const,
    marginBottom: 12,
  },
  
  tipsList: {
    gap: 4,
  },
  
  tipItem: {
    fontSize: 12,
    lineHeight: 16,
  },
};