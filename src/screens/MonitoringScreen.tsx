/**
 * Monitoring Screen - Converted from dApp_UI MonitoringDashboard.tsx
 * Insurance monitoring dashboard and active policies
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
  Monitoring: { data: InsuranceData };
  InsuranceHome: undefined;
};

type MonitoringScreenRouteProp = RouteProp<RootStackParamList, 'Monitoring'>;

export default function MonitoringScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<MonitoringScreenRouteProp>();
  
  const insuranceData = route.params.data;

  const handleNewInsurance = () => {
    navigation.navigate('InsuranceHome');
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
          <View style={[InsuranceStyles.maxWidth, InsuranceStyles.centerContent]}>
            <Text style={[InsuranceStyles.gradientText, { fontSize: 18, fontWeight: '600' }]}>
              Seeker 보험
            </Text>
            <Text style={[InsuranceStyles.mutedText, { fontSize: 12 }]}>
              모니터링
            </Text>
          </View>
          
          {/* Progress Bar - Complete */}
          <View style={[InsuranceStyles.maxWidth, { paddingTop: 12 }]}>
            <View style={InsuranceStyles.progressContainer}>
              <View 
                style={[
                  InsuranceStyles.progressFill,
                  { width: '100%' } // Complete
                ]}
              />
            </View>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth]}>
            
            {/* Success Message */}
            <Card style={[InsuranceStyles.successCard, { padding: 24, marginBottom: 24 }]}>
              <View style={InsuranceStyles.centerContent}>
                <Ionicons 
                  name="checkmark-circle" 
                  size={48} 
                  color={InsuranceColors.status.success} 
                  style={{ marginBottom: 16 }} 
                />
                
                <Text style={[InsuranceStyles.primaryText, { fontSize: 20, fontWeight: '700', marginBottom: 8 }]}>
                  보험 가입 완료!
                </Text>
                
                <Text style={[InsuranceStyles.secondaryText, { textAlign: 'center', marginBottom: 16 }]}>
                  보험이 성공적으로 생성되었습니다. 이제 실시간으로 모니터링이 시작됩니다.
                </Text>
              </View>
            </Card>

            {/* Active Policy Card */}
            <Card style={[InsuranceStyles.glassCardWithShadow, { padding: 20, marginBottom: 24 }]}>
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 16 }]}>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600' }]}>
                  활성 보험
                </Text>
                <View style={{ 
                  backgroundColor: InsuranceColors.status.success + '20',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12
                }}>
                  <Text style={[{ color: InsuranceColors.status.success, fontSize: 10, fontWeight: '600' as const }]}>
                    ACTIVE
                  </Text>
                </View>
              </View>
              
              <Text style={[InsuranceStyles.secondaryText, { fontSize: 14, marginBottom: 16 }]}>
                {insuranceData.description}
              </Text>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={[InsuranceStyles.mutedText, { fontSize: 12 }]}>
                  보험 ID
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 12 }]}>
                  #{insuranceData.id}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={[InsuranceStyles.mutedText, { fontSize: 12 }]}>
                  월 보험료
                </Text>
                <Text style={[InsuranceStyles.neonText, { fontSize: 12, fontWeight: '600' }]}>
                  {insuranceData.premium?.toLocaleString()} {insuranceData.currency}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={[InsuranceStyles.mutedText, { fontSize: 12 }]}>
                  최대 지급액
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 12 }]}>
                  {insuranceData.maxPayout?.toLocaleString()} {insuranceData.currency}
                </Text>
              </View>
            </Card>

            {/* Current Status */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                현재 상태
              </Text>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  {insuranceData.indicator} 현재값
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14, fontWeight: '600' }]}>
                  120 μg/m³
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  임계값까지
                </Text>
                <Text style={[InsuranceStyles.status.success, { fontSize: 14, fontWeight: '600' }]}>
                  80 μg/m³ 여유
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  연속 지속 일수
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14, fontWeight: '600' }]}>
                  0일 / {insuranceData.period}일
                </Text>
              </View>
            </Card>

            {/* Recent Activity */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                최근 활동
              </Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: 4, 
                  backgroundColor: InsuranceColors.status.success,
                  marginRight: 12 
                }} />
                <View style={{ flex: 1 }}>
                  <Text style={[InsuranceStyles.secondaryText, { fontSize: 12 }]}>
                    보험 활성화됨
                  </Text>
                  <Text style={[InsuranceStyles.mutedText, { fontSize: 10 }]}>
                    방금 전
                  </Text>
                </View>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: 4, 
                  backgroundColor: InsuranceColors.primary.teal,
                  marginRight: 12 
                }} />
                <View style={{ flex: 1 }}>
                  <Text style={[InsuranceStyles.secondaryText, { fontSize: 12 }]}>
                    데이터 수집 시작
                  </Text>
                  <Text style={[InsuranceStyles.mutedText, { fontSize: 10 }]}>
                    방금 전
                  </Text>
                </View>
              </View>
            </Card>

            {/* Action Buttons */}
            <View style={{ gap: 12, marginBottom: 24 }}>
              <Pressable
                style={({ pressed }) => [
                  InsuranceStyles.primaryButton,
                  { minHeight: 48 },
                  pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
                ]}
                onPress={handleNewInsurance}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Ionicons name="add" size={20} color={InsuranceColors.background.primary} />
                  <Text style={InsuranceStyles.primaryButtonText}>
                    새 보험 만들기
                  </Text>
                </View>
              </Pressable>
              
              <Pressable
                style={({ pressed }) => [
                  InsuranceStyles.ghostButton,
                  { minHeight: 48 },
                  pressed && { opacity: 0.8 }
                ]}
              >
                <Text style={InsuranceStyles.ghostButtonText}>
                  보험 내역 보기
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}