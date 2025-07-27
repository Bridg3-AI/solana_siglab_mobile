/**
 * Chat Screen - Converted from dApp_UI ChatInput.tsx
 * Insurance idea input with natural language processing
 */
import React, { useState } from 'react';
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
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { InsuranceStyles, InsuranceColors, GradientConfigs } from '../theme/insurance-styles';
import type { InsuranceData } from '../navigators/AppNavigator';

const { width } = Dimensions.get('window');

// Example prompts data (from dApp_UI)
const examplePrompts = [
  {
    category: 'Weather',
    prompts: [
      'Pay $500 if LA AQI ≥ 150 for 3 consecutive days',
      'Pay $300 if hurricane warning is issued in Florida',
      'Pay $200 if NYC daily rainfall exceeds 4 inches'
    ]
  },
  {
    category: 'Finance',
    prompts: [
      'Pay $1,000 if Bitcoin drops 15% or more within 24 hours',
      'Pay $500 if S&P 500 drops -5% or more weekly',
      'Pay $300 if EUR/USD exchange rate falls below 1.05'
    ]
  },
  {
    category: 'Sports',
    prompts: [
      'Pay $200 if Lakers miss NBA playoffs this season',
      'Pay $100 if Patrick Mahomes throws less than 25 TDs in NFL season',
      'Pay $300 if Yankees finish below .500 in MLB season'
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
  
  const initialData = route.params?.data || {};
  const [input, setInput] = useState(initialData.description || '');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('Please enter your insurance idea.');
      return;
    }

    if (input.length > 80) {
      setError('Please enter within 80 characters.');
      return;
    }

    setIsProcessing(true);
    setError('');

    // Simulate AI processing (from dApp_UI)
    setTimeout(() => {
      setIsProcessing(false);
      
      // Navigate to Score screen with data
      const insuranceData: InsuranceData = {
        description: input,
        indicator: '',
        threshold: 0,
        period: 0,
        premium: 0,
        maxPayout: 0,
        reliability: 0,
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
      
      {/* Background Gradient */}
      <LinearGradient
        colors={GradientConfigs.background.colors}
        start={GradientConfigs.background.start}
        end={GradientConfigs.background.end}
        style={InsuranceStyles.container}
      >
        {/* Header */}
        <View style={[InsuranceStyles.glassHeader, styles.header]}>
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
              <Text style={[InsuranceStyles.gradientText, styles.headerTitle]}>
                Seeker Insurance
              </Text>
              <Text style={[InsuranceStyles.mutedText, styles.headerSubtitle]}>
                Idea Input
              </Text>
            </View>
            
            <View style={styles.headerSpacer} />
          </View>
          
          {/* Progress Bar */}
          <View style={[InsuranceStyles.maxWidth, styles.progressContainer]}>
            <View style={InsuranceStyles.progressContainer}>
              <View 
                style={[
                  InsuranceStyles.progressFill,
                  { width: `${(1 / 6) * 100}%` } // Step 2 of 7
                ]}
              />
            </View>
          </View>
        </View>

        <KeyboardAvoidingView 
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            style={InsuranceStyles.container}
            contentContainerStyle={InsuranceStyles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth]}>
              
              {/* Instruction Card */}
              <Card style={[InsuranceStyles.glassCard, InsuranceStyles.accentCard, styles.instructionCard]}>
                <View style={styles.instructionContent}>
                  <Ionicons 
                    name="bulb" 
                    size={20} 
                    color={InsuranceColors.primary.teal} 
                  />
                  <View style={styles.instructionText}>
                    <Text style={[InsuranceStyles.primaryText, styles.instructionTitle]}>
                      Describe your insurance idea in plain language
                    </Text>
                    <Text style={[InsuranceStyles.secondaryText, styles.instructionSubtitle]}>
                      Format like "If condition occurs, pay amount" for better accuracy
                    </Text>
                  </View>
                </View>
              </Card>

              {/* Input Area */}
              <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="e.g. Pay $500 if LA AQI exceeds 150 for 3 consecutive days"
                    placeholderTextColor={InsuranceColors.text.muted}
                    style={[InsuranceStyles.textInput, styles.textArea]}
                    multiline
                    maxLength={80}
                    textAlignVertical="top"
                  />
                  
                  <View style={styles.inputFooter}>
                    <Text style={[InsuranceStyles.mutedText, styles.charCount]}>
                      {input.length}/80
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
                        Verify Feasibility
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

              {/* Tips Section */}
              <Card style={[InsuranceStyles.glassCard, styles.tipsCard]}>
                <Text style={[InsuranceStyles.primaryText, styles.tipsTitle]}>
                  💡 Writing Tips
                </Text>
                <View style={styles.tipsList}>
                  <Text style={[InsuranceStyles.mutedText, styles.tipItem]}>
                    • Include specific conditions and values
                  </Text>
                  <Text style={[InsuranceStyles.mutedText, styles.tipItem]}>
                    • Use measurable indicators
                  </Text>
                  <Text style={[InsuranceStyles.mutedText, styles.tipItem]}>
                    • Gambling-related content may be restricted
                  </Text>
                </View>
              </Card>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

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