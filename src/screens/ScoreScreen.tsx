/**
 * Score Screen - Converted from dApp_UI ScoreResult.tsx
 * Insurance feasibility verification results
 */
import React from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { InsuranceStyles, InsuranceColors, GradientConfigs } from '../theme/insurance-styles';
import type { InsuranceData } from '../navigators/AppNavigator';

type RootStackParamList = {
  Score: { data: InsuranceData };
  Indicator: { data: InsuranceData };
  Chat: { data?: Partial<InsuranceData> };
};

type ScoreScreenRouteProp = RouteProp<RootStackParamList, 'Score'>;

export default function ScoreScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ScoreScreenRouteProp>();
  
  const insuranceData = route.params.data;

  const handleNext = () => {
    navigation.navigate('Indicator', { data: insuranceData });
  };

  const handleBack = () => {
    navigation.navigate('Chat', { data: insuranceData });
  };

  return (
    <SafeAreaView style={InsuranceStyles.safeArea}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={GradientConfigs.background.colors}
        start={GradientConfigs.background.start}
        end={GradientConfigs.background.end}
        style={InsuranceStyles.container}
      >
        {/* Header */}
        <View style={[InsuranceStyles.glassHeader, InsuranceStyles.padding]}>
          <View style={[InsuranceStyles.maxWidth, InsuranceStyles.spaceBetween]}>
            <Pressable onPress={handleBack}>
              <Ionicons name="arrow-back" size={20} color={InsuranceColors.text.primary} />
            </Pressable>
            
            <View style={InsuranceStyles.centerContent}>
              <Text style={[InsuranceStyles.gradientText, { fontSize: 18, fontWeight: '600' }]}>
                Seeker Insurance
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12 }]}>
                Feasibility Verification
              </Text>
            </View>
            
            <View style={{ width: 20 }} />
          </View>
          
          {/* Progress Bar */}
          <View style={[InsuranceStyles.maxWidth, { paddingTop: 12 }]}>
            <View style={InsuranceStyles.progressContainer}>
              <View 
                style={[
                  InsuranceStyles.progressFill,
                  { width: `${(2 / 6) * 100}%` } // Step 3 of 7
                ]}
              />
            </View>
          </View>
        </View>

        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={InsuranceStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth]}>
          
          {/* Score Result Card */}
          <Card style={[InsuranceStyles.glassCardWithShadow, { padding: 24, marginBottom: 24 }]}>
            <View style={InsuranceStyles.centerContent}>
              <View style={[
                InsuranceStyles.centerContent,
                { 
                  width: 80, 
                  height: 80, 
                  borderRadius: 40, 
                  backgroundColor: InsuranceColors.status.success + '20',
                  marginBottom: 16 
                }
              ]}>
                <Ionicons name="checkmark-circle" size={40} color={InsuranceColors.status.success} />
              </View>
              
              <Text style={[InsuranceStyles.gradientText, { fontSize: 24, fontWeight: '700', marginBottom: 8 }]}>
                Verification Complete!
              </Text>
              
              <Text style={[InsuranceStyles.secondaryText, { textAlign: 'center', marginBottom: 20 }]}>
                We've verified the feasibility of your insurance idea
              </Text>
              
              <View style={{ backgroundColor: InsuranceColors.glass.accent, padding: 16, borderRadius: 12, width: '100%' }}>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14, textAlign: 'center' }]}>
                  "{insuranceData.description}"
                </Text>
              </View>
            </View>
          </Card>

          {/* Feasibility Score */}
          <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
            <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
              Feasibility Score
            </Text>
            
            <View style={InsuranceStyles.spaceBetween}>
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                Data Availability
              </Text>
              <Text style={[InsuranceStyles.neonText, { fontSize: 14, fontWeight: '600' }]}>
                95%
              </Text>
            </View>
            
            <View style={[InsuranceStyles.spaceBetween, { marginTop: 8 }]}>
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                Market Demand
              </Text>
              <Text style={[InsuranceStyles.neonText, { fontSize: 14, fontWeight: '600' }]}>
                88%
              </Text>
            </View>
            
            <View style={[InsuranceStyles.spaceBetween, { marginTop: 8 }]}>
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                Risk Assessment
              </Text>
              <Text style={[InsuranceStyles.neonText, { fontSize: 14, fontWeight: '600' }]}>
                92%
              </Text>
            </View>
          </Card>

          <View style={{ flex: 1 }} />

          {/* Next Button */}
          <Pressable
            style={({ pressed }) => [
              InsuranceStyles.primaryButton,
              { minHeight: 52 },
              pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]}
            onPress={handleNext}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={InsuranceStyles.primaryButtonText}>
                Set Indicators
              </Text>
              <Ionicons name="arrow-forward" size={16} color={InsuranceColors.background.primary} />
            </View>
          </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}