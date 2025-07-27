/**
 * Policy Screen - Converted from dApp_UI PolicyPreview.tsx
 * Insurance policy preview and confirmation
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
  Policy: { data: InsuranceData };
  Monitoring: { data: InsuranceData };
  Premium: { data: InsuranceData };
};

type PolicyScreenRouteProp = RouteProp<RootStackParamList, 'Policy'>;

export default function PolicyScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PolicyScreenRouteProp>();
  
  const insuranceData = route.params.data;

  const handleConfirm = () => {
    const finalData: InsuranceData = {
      ...insuranceData,
      status: 'active',
      id: Date.now().toString(),
    };
    navigation.navigate('Monitoring', { data: finalData });
  };

  const handleBack = () => {
    navigation.navigate('Premium', { data: insuranceData });
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
                정책 미리보기
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
                  { width: `${(5 / 6) * 100}%` } // Step 6 of 7
                ]}
              />
            </View>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth]}>
            
            {/* Policy Summary */}
            <Card style={[InsuranceStyles.glassCardWithShadow, { padding: 24, marginBottom: 24 }]}>
              <View style={InsuranceStyles.centerContent}>
                <Ionicons 
                  name="document-text" 
                  size={32} 
                  color={InsuranceColors.primary.teal} 
                  style={{ marginBottom: 16 }} 
                />
                
                <Text style={[InsuranceStyles.primaryText, { fontSize: 18, fontWeight: '600', marginBottom: 8 }]}>
                  보험 정책 요약
                </Text>
                
                <View style={{ 
                  backgroundColor: InsuranceColors.glass.accent, 
                  padding: 16, 
                  borderRadius: 12, 
                  width: '100%',
                  marginBottom: 20 
                }}>
                  <Text style={[InsuranceStyles.primaryText, { fontSize: 14, textAlign: 'center' }]}>
                    {insuranceData.description}
                  </Text>
                </View>
              </View>
            </Card>

            {/* Policy Details */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                보험 상세 정보
              </Text>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  측정 지표
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.indicator}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  임계값
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.threshold}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  지속 기간
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.period}일
                </Text>
              </View>
            </Card>

            {/* Financial Terms */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                보험료 및 보상
              </Text>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  월 보험료
                </Text>
                <Text style={[InsuranceStyles.neonText, { fontSize: 16, fontWeight: '600' }]}>
                  {insuranceData.premium?.toLocaleString()} {insuranceData.currency}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  최대 지급액
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600' }]}>
                  {insuranceData.maxPayout?.toLocaleString()} {insuranceData.currency}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  신뢰도
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600' }]}>
                  {insuranceData.reliability}%
                </Text>
              </View>
            </Card>

            {/* Terms and Conditions */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                이용 약관
              </Text>
              
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • 보험료는 매월 자동으로 차감됩니다
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • 조건 충족 시 자동으로 보상이 지급됩니다
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • 언제든지 보험을 해지할 수 있습니다
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16 }]}>
                • 데이터는 공인된 API에서 실시간으로 수집됩니다
              </Text>
            </Card>

            {/* Confirm Button */}
            <Pressable
              style={({ pressed }) => [
                InsuranceStyles.primaryButton,
                { minHeight: 52, marginBottom: 24 },
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
              ]}
              onPress={handleConfirm}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="checkmark-circle" size={20} color={InsuranceColors.background.primary} />
                <Text style={InsuranceStyles.primaryButtonText}>
                  보험 가입하기
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}