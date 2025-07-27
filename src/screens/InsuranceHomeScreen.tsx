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
    title: 'LA Air Quality Insurance',
    description: 'AQI ≥ 150 for 3 consecutive days',
    payout: '$500',
    premium: '$20',
    reliability: 92,
    subscribers: 1234
  },
  {
    id: '2',
    title: 'Bitcoin Crash Insurance',
    description: 'BTC price drops -15% within 24 hours',
    payout: '100 USDC',
    premium: '5 USDC',
    reliability: 88,
    subscribers: 856
  },
  {
    id: '3',
    title: 'Hurricane Alert Insurance',
    description: 'Hurricane warning issued in Florida',
    payout: '$300',
    premium: '$15',
    reliability: 95,
    subscribers: 642
  }
];

type RootStackParamList = {
  Chat: { data?: Partial<InsuranceData> };
};

export default function InsuranceHomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Get current time in English format
  const getCurrentTime = () => {
    return new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
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
      currency: insurance.premium.includes('USDC') ? 'USDC' : 'USD',
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
                  Welcome!
                </Text>
                <Text style={[InsuranceStyles.secondaryText, styles.welcomeSubtitle]}>
                  Create your personalized insurance plan
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
                  Create Custom Insurance
                </Text>
                <Text style={[InsuranceStyles.mutedText, styles.ctaDescription]}>
                  Describe in plain language and we'll create your insurance instantly
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
                      Design New Insurance
                    </Text>
                  </View>
                </Pressable>
              </View>
            </Card>

            {/* Popular Insurance Products */}
            <View style={styles.popularSection}>
              <View style={InsuranceStyles.spaceBetween}>
                <Text style={[InsuranceStyles.primaryText, styles.sectionTitle]}>
                  Popular Insurance Products
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
                              Reliability {insurance.reliability}%
                            </Text>
                          </View>
                        </View>
                        
                        {/* Footer */}
                        <View style={InsuranceStyles.spaceBetween}>
                          <View style={styles.priceInfo}>
                            <View style={styles.priceItem}>
                              <Text style={[InsuranceStyles.mutedText, styles.priceLabel]}>
                                Premium
                              </Text>
                              <Text style={[InsuranceStyles.primaryText, styles.priceValue]}>
                                {insurance.premium}
                              </Text>
                            </View>
                            
                            <View style={styles.priceItem}>
                              <Text style={[InsuranceStyles.mutedText, styles.priceLabel]}>
                                Max Payout
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
                              {insurance.subscribers.toLocaleString()} subscribers
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
                      Active Policies
                    </Text>
                  </View>
                </Card>
                
                <Card style={[InsuranceStyles.glassCard, styles.statCard]}>
                  <View style={InsuranceStyles.centerContent}>
                    <Text style={[InsuranceStyles.gradientText, styles.statValue]}>
                      $1.27M
                    </Text>
                    <Text style={[InsuranceStyles.mutedText, styles.statLabel]}>
                      Total Payouts
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