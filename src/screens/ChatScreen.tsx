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
    category: '날씨',
    prompts: [
      '서울 미세먼지 PM10 ≥ 200 μg/m³가 3일 지속되면 5만 원 지급',
      '부산에 태풍 경보가 발령되면 3만 원 지급',
      '제주도 강수량이 하루 100mm 이상이면 2만 원 지급'
    ]
  },
  {
    category: '금융',
    prompts: [
      '비트코인이 24시간 내 15% 이상 하락하면 10만 원 지급',
      '코스피가 주간 -5% 이상 하락하면 5만 원 지급',
      'USD/KRW 환율이 1,400원을 넘으면 3만 원 지급'
    ]
  },
  {
    category: '스포츠',
    prompts: [
      '한국이 월드컵에서 16강에 진출하지 못하면 2만 원 지급',
      '프리미어리그에서 손흥민이 15골 이하면 1만 원 지급',
      'KBO 리그에서 두산이 4위 이하로 시즌을 마치면 3만 원 지급'
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
      setError('보험 아이디어를 입력해주세요.');
      return;
    }

    if (input.length > 80) {
      setError('80자 이내로 입력해주세요.');
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
        currency: 'KRW',
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
              <Text style={[InsuranceStyles.secondaryText, styles.backText]}>이전</Text>
            </Pressable>
            
            <View style={styles.headerCenter}>
              <Text style={[InsuranceStyles.gradientText, styles.headerTitle]}>
                Seeker 보험
              </Text>
              <Text style={[InsuranceStyles.mutedText, styles.headerSubtitle]}>
                아이디어 입력
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
                      보험 아이디어를 자연어로 설명해주세요
                    </Text>
                    <Text style={[InsuranceStyles.secondaryText, styles.instructionSubtitle]}>
                      "조건이 발생하면 얼마를 지급" 형태로 작성하면 더 정확해요
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
                    placeholder="예: 서울 미세먼지 PM10이 200 이상으로 3일 지속되면 5만 원 지급"
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
                        분석 중...
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
                        가능성 검증하기
                      </Text>
                    </View>
                  )}
                </Pressable>
              </View>

              {/* Example Prompts */}
              <View style={styles.examplesSection}>
                <Text style={[InsuranceStyles.primaryText, styles.sectionTitle]}>
                  예시 아이디어
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
                  💡 작성 팁
                </Text>
                <View style={styles.tipsList}>
                  <Text style={[InsuranceStyles.mutedText, styles.tipItem]}>
                    • 구체적인 조건과 수치를 포함해주세요
                  </Text>
                  <Text style={[InsuranceStyles.mutedText, styles.tipItem]}>
                    • 측정 가능한 지표를 사용해주세요
                  </Text>
                  <Text style={[InsuranceStyles.mutedText, styles.tipItem]}>
                    • 도박성 내용은 제한될 수 있어요
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