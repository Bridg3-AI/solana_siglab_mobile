/**
 * Indicator Screen - Converted from dApp_UI IndicatorSetup.tsx
 * Insurance indicator configuration
 */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { InsuranceStyles, InsuranceColors, GradientConfigs } from '../theme/insurance-styles';
import type { InsuranceData } from '../navigators/AppNavigator';

type RootStackParamList = {
  Indicator: { data: InsuranceData };
  Premium: { data: InsuranceData };
  Score: { data: InsuranceData };
};

type IndicatorScreenRouteProp = RouteProp<RootStackParamList, 'Indicator'>;

export default function IndicatorScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<IndicatorScreenRouteProp>();
  
  const [insuranceData, setInsuranceData] = useState(route.params.data);
  const [indicator, setIndicator] = useState(insuranceData.indicator || 'PM10 농도');
  const [threshold, setThreshold] = useState(insuranceData.threshold?.toString() || '200');
  const [period, setPeriod] = useState(insuranceData.period?.toString() || '3');

  const handleNext = () => {
    const updatedData: InsuranceData = {
      ...insuranceData,
      indicator,
      threshold: parseInt(threshold) || 0,
      period: parseInt(period) || 0,
    };
    navigation.navigate('Premium', { data: updatedData });
  };

  const handleBack = () => {
    navigation.navigate('Score', { data: insuranceData });
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
                Seeker 보험
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12 }]}>
                지표 설정
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
                  { width: `${(3 / 6) * 100}%` } // Step 4 of 7
                ]}
              />
            </View>
          </View>
        </View>

        <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth, { flex: 1 }]}>
          
          {/* Form Fields */}
          <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
            <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 20 }]}>
              보험 지표 설정
            </Text>
            
            {/* Indicator */}
            <View style={{ marginBottom: 16 }}>
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14, marginBottom: 8 }]}>
                측정 지표
              </Text>
              <TextInput
                value={indicator}
                onChangeText={setIndicator}
                style={[InsuranceStyles.textInput, { height: 48 }]}
                placeholder="예: PM10 농도"
                placeholderTextColor={InsuranceColors.text.muted}
              />
            </View>
            
            {/* Threshold */}
            <View style={{ marginBottom: 16 }}>
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14, marginBottom: 8 }]}>
                임계값
              </Text>
              <TextInput
                value={threshold}
                onChangeText={setThreshold}
                style={[InsuranceStyles.textInput, { height: 48 }]}
                placeholder="200"
                placeholderTextColor={InsuranceColors.text.muted}
                keyboardType="numeric"
              />
            </View>
            
            {/* Period */}
            <View style={{ marginBottom: 16 }}>
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14, marginBottom: 8 }]}>
                지속 기간 (일)
              </Text>
              <TextInput
                value={period}
                onChangeText={setPeriod}
                style={[InsuranceStyles.textInput, { height: 48 }]}
                placeholder="3"
                placeholderTextColor={InsuranceColors.text.muted}
                keyboardType="numeric"
              />
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
                프리미엄 계산하기
              </Text>
              <Ionicons name="arrow-forward" size={16} color={InsuranceColors.background.primary} />
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}