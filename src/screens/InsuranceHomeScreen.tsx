/**
 * Insurance Home Screen - Converted from dApp_UI HomeScreen.tsx
 * Main entry point for insurance creation flow
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { InsuranceStyles, InsuranceColors, GradientConfigs } from '../theme/insurance-styles';
import type { InsuranceData } from '../navigators/AppNavigator';

const { width } = Dimensions.get('window');

// Popular Insurance Data (from dApp_UI)
const popularInsurances = [
  {
    id: '1',
    title: '서울 미세먼지 보험',
    description: 'PM10 ≥ 200 μg/m³가 3일 지속시',
    payout: '50,000 KRW',
    premium: '2,000 KRW',
    reliability: 92,
    subscribers: 1234
  },
  {
    id: '2',
    title: '비트코인 급락 보험',
    description: 'BTC 가격이 24시간 내 -15% 하락시',
    payout: '100 USDC',
    premium: '5 USDC',
    reliability: 88,
    subscribers: 856
  },
  {
    id: '3',
    title: '태풍 경보 보험',
    description: '부산 태풍 경보 발령시',
    payout: '30,000 KRW',
    premium: '1,500 KRW',
    reliability: 95,
    subscribers: 642
  }
];

type RootStackParamList = {
  Chat: { data?: Partial<InsuranceData> };
};

export default function InsuranceHomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Get current time in Korean format
  const getCurrentTime = () => {
    return new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCreateInsurance = () => {
    navigation.navigate('Chat', {});
  };

  const handleSelectPopularInsurance = (insurance: typeof popularInsurances[0]) => {
    // Pre-fill data from popular insurance
    const prefilledData: Partial<InsuranceData> = {
      description: insurance.description,
      premium: parseInt(insurance.premium.replace(/[^0-9]/g, '')),
      maxPayout: parseInt(insurance.payout.replace(/[^0-9]/g, '')),
      reliability: insurance.reliability,
      currency: insurance.premium.includes('USDC') ? 'USDC' : 'KRW',
      status: 'draft'
    };
    
    navigation.navigate('Chat', { data: prefilledData });
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
        <ScrollView 
          style={InsuranceStyles.container}
          contentContainerStyle={InsuranceStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth]}>
            
            {/* Welcome Section */}
            <View style={[styles.welcomeSection, InsuranceStyles.centerContent]}>
              {/* Icon Container with Glassmorphism */}
              <View style={[styles.iconContainer, InsuranceStyles.glassCard, InsuranceStyles.neonBorder]}>
                <Ionicons 
                  name="shield-checkmark" 
                  size={40} 
                  color={InsuranceColors.primary.teal} 
                />
              </View>
              
              <View style={styles.welcomeText}>
                <Text style={[styles.welcomeTitle, InsuranceStyles.neonText]}>
                  안녕하세요!
                </Text>
                <Text style={[InsuranceStyles.secondaryText, styles.welcomeSubtitle]}>
                  나만의 맞춤형 보험을 만들어보세요
                </Text>
                <Text style={[InsuranceStyles.mutedText, styles.timeText]}>
                  {getCurrentTime()}
                </Text>
              </View>
            </View>

            {/* Main CTA Card */}
            <Card style={[InsuranceStyles.glassCardWithShadow, InsuranceStyles.accentCard, styles.ctaCard]}>
              <View style={InsuranceStyles.centerContent}>
                <Text style={[styles.ctaTitle, InsuranceStyles.gradientText]}>
                  나만의 보험 만들기
                </Text>
                <Text style={[InsuranceStyles.mutedText, styles.ctaDescription]}>
                  자연어로 설명하면 즉시 보험 상품을 생성해드려요
                </Text>
                
                <Pressable
                  style={({ pressed }) => [
                    InsuranceStyles.primaryButton,
                    styles.ctaButton,
                    pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
                  ]}
                  onPress={handleCreateInsurance}
                  android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <View style={styles.buttonContent}>
                    <Ionicons 
                      name="add" 
                      size={20} 
                      color={InsuranceColors.background.primary} 
                      style={styles.buttonIcon}
                    />
                    <Text style={InsuranceStyles.primaryButtonText}>
                      새 보험 설계하기
                    </Text>
                  </View>
                </Pressable>
              </View>
            </Card>

            {/* Popular Insurance Products */}
            <View style={styles.popularSection}>
              <View style={InsuranceStyles.spaceBetween}>
                <Text style={[InsuranceStyles.primaryText, styles.sectionTitle]}>
                  인기 보험 상품
                </Text>
                <Ionicons 
                  name="trending-up" 
                  size={20} 
                  color={InsuranceColors.primary.teal} 
                />
              </View>
              
              <View style={styles.insuranceList}>
                {popularInsurances.map((insurance) => (
                  <Pressable
                    key={insurance.id}
                    style={({ pressed }) => [
                      pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
                    ]}
                    onPress={() => handleSelectPopularInsurance(insurance)}
                  >
                    <Card style={[InsuranceStyles.glassCard, styles.insuranceCard]}>
                      <View style={styles.insuranceCardContent}>
                        {/* Header */}
                        <View style={InsuranceStyles.spaceBetween}>
                          <View style={styles.insuranceInfo}>
                            <Text style={[InsuranceStyles.primaryText, styles.insuranceTitle]}>
                              {insurance.title}
                            </Text>
                            <Text style={[InsuranceStyles.secondaryText, styles.insuranceDescription]}>
                              {insurance.description}
                            </Text>
                          </View>
                          
                          <View style={styles.reliabilityBadge}>
                            <Text style={[InsuranceStyles.mutedText, styles.badgeText]}>
                              신뢰도 {insurance.reliability}%
                            </Text>
                          </View>
                        </View>
                        
                        {/* Footer */}
                        <View style={InsuranceStyles.spaceBetween}>
                          <View style={styles.priceInfo}>
                            <View style={styles.priceItem}>
                              <Text style={[InsuranceStyles.mutedText, styles.priceLabel]}>
                                보험료
                              </Text>
                              <Text style={[InsuranceStyles.primaryText, styles.priceValue]}>
                                {insurance.premium}
                              </Text>
                            </View>
                            
                            <View style={styles.priceItem}>
                              <Text style={[InsuranceStyles.mutedText, styles.priceLabel]}>
                                최대 지급액
                              </Text>
                              <Text style={[InsuranceStyles.neonText, styles.priceValue]}>
                                {insurance.payout}
                              </Text>
                            </View>
                          </View>
                          
                          <View style={styles.subscriberInfo}>
                            <Ionicons 
                              name="time-outline" 
                              size={12} 
                              color={InsuranceColors.text.muted} 
                            />
                            <Text style={[InsuranceStyles.mutedText, styles.subscriberText]}>
                              {insurance.subscribers.toLocaleString()}명 가입
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Card>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsSection}>
              <View style={styles.statsRow}>
                <Card style={[InsuranceStyles.glassCard, styles.statCard]}>
                  <View style={InsuranceStyles.centerContent}>
                    <Text style={[InsuranceStyles.gradientText, styles.statValue]}>
                      2,847
                    </Text>
                    <Text style={[InsuranceStyles.mutedText, styles.statLabel]}>
                      활성 보험
                    </Text>
                  </View>
                </Card>
                
                <Card style={[InsuranceStyles.glassCard, styles.statCard]}>
                  <View style={InsuranceStyles.centerContent}>
                    <Text style={[InsuranceStyles.gradientText, styles.statValue]}>
                      ₩127M
                    </Text>
                    <Text style={[InsuranceStyles.mutedText, styles.statLabel]}>
                      총 지급액
                    </Text>
                  </View>
                </Card>
              </View>
            </View>

          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = {
  welcomeSection: {
    paddingVertical: 24,
    gap: 16,
  },
  
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  
  welcomeText: {
    alignItems: 'center' as const,
    gap: 4,
  },
  
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center' as const,
    marginTop: 4,
  },
  
  timeText: {
    fontSize: 12,
    marginTop: 8,
  },
  
  ctaCard: {
    padding: 24,
    marginBottom: 24,
  },
  
  ctaTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  
  ctaDescription: {
    fontSize: 14,
    textAlign: 'center' as const,
    marginBottom: 20,
    lineHeight: 20,
  },
  
  ctaButton: {
    width: '100%',
    minHeight: 52,
  },
  
  buttonContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  
  buttonIcon: {
    marginRight: 4,
  },
  
  popularSection: {
    marginBottom: 24,
    gap: 16,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  
  insuranceList: {
    gap: 12,
  },
  
  insuranceCard: {
    padding: 16,
  },
  
  insuranceCardContent: {
    gap: 12,
  },
  
  insuranceInfo: {
    flex: 1,
    marginRight: 12,
  },
  
  insuranceTitle: {
    fontSize: 14,
    fontWeight: '500' as const,
    marginBottom: 4,
  },
  
  insuranceDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  reliabilityBadge: {
    backgroundColor: InsuranceColors.glass.accent,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: InsuranceColors.primary.teal + '30',
  },
  
  badgeText: {
    fontSize: 10,
    color: InsuranceColors.primary.teal,
  },
  
  priceInfo: {
    flexDirection: 'row' as const,
    gap: 16,
  },
  
  priceItem: {
    gap: 2,
  },
  
  priceLabel: {
    fontSize: 10,
  },
  
  priceValue: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  
  subscriberInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  
  subscriberText: {
    fontSize: 10,
  },
  
  statsSection: {
    marginBottom: 24,
  },
  
  statsRow: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  
  statCard: {
    flex: 1,
    padding: 16,
  },
  
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 12,
  },
};