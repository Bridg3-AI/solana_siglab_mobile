import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  Switch, 
  List, 
  Divider, 
  Button,
  useTheme,
  Avatar,
  Portal,
  Dialog,
  RadioButton
} from 'react-native-paper';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import ClusterPickerFeature from "../components/cluster/cluster-picker-feature";
import { cyberpunkEffects } from '../theme/cyberpunkEffects';
import { CyberpunkColors } from '../theme/cyberpunkTheme';

export function SettingsScreen() {
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoInsurance, setAutoInsurance] = useState(false);
  const [batteryOptimization, setBatteryOptimization] = useState(true);
  const [locationAccuracy, setLocationAccuracy] = useState('high');
  const [themeMode, setThemeMode] = useState('system');
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showAccuracyDialog, setShowAccuracyDialog] = useState(false);
  
  const theme = useTheme();

  const handleWalletConnect = () => {
    // 지갑 연결 로직
  };

  const handleBackup = () => {
    // 데이터 백업 로직
  };

  const handleExportData = () => {
    // 데이터 내보내기 로직
  };

  return (
    <ScrollView style={styles.container}>
      {/* 프로필 섹션 */}
      <Card style={[styles.profileCard, cyberpunkEffects.holographicCard()]}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Icon 
            size={60} 
            icon="account" 
            style={[cyberpunkEffects.neonGlow(CyberpunkColors.neonBlue)]}
          />
          <View style={styles.profileInfo}>
            <Text variant="titleLarge" style={[cyberpunkEffects.textGlow()]}>사용자</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              지갑 연결됨
            </Text>
          </View>
          <Button 
            mode="outlined" 
            onPress={handleWalletConnect}
            style={[cyberpunkEffects.glowingButton(CyberpunkColors.electricPurple)]}
            labelStyle={[cyberpunkEffects.textGlow()]}
          >
            지갑 관리
          </Button>
        </Card.Content>
      </Card>

      {/* Solana 클러스터 설정 */}
      <Card style={[styles.sectionCard, cyberpunkEffects.cardGlow()]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow()]}>
            블록체인 설정
          </Text>
          <ClusterPickerFeature />
        </Card.Content>
      </Card>

      {/* GPS 및 위치 설정 */}
      <Card style={[styles.sectionCard, cyberpunkEffects.cardGlow()]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow()]}>
            위치 및 GPS 설정
          </Text>
          
          <List.Item
            title="GPS 추적 활성화"
            description="보험 지역 감지를 위한 GPS 사용"
            left={props => <List.Icon {...props} icon="crosshairs-gps" />}
            right={() => (
              <Switch 
                value={gpsEnabled} 
                onValueChange={setGpsEnabled}
              />
            )}
          />
          
          <List.Item
            title="위치 정확도"
            description={`현재: ${locationAccuracy === 'high' ? '높음' : locationAccuracy === 'medium' ? '중간' : '낮음'}`}
            left={props => <List.Icon {...props} icon="target" />}
            onPress={() => setShowAccuracyDialog(true)}
          />
          
          <List.Item
            title="배터리 최적화"
            description="배터리 절약을 위한 GPS 사용량 조절"
            left={props => <List.Icon {...props} icon="battery" />}
            right={() => (
              <Switch 
                value={batteryOptimization} 
                onValueChange={setBatteryOptimization}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* 보험 설정 */}
      <Card style={[styles.sectionCard, cyberpunkEffects.cardGlow()]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow()]}>
            보험 설정
          </Text>
          
          <List.Item
            title="자동 보험 가입"
            description="위치 기반 자동 보험 추천 및 가입"
            left={props => <List.Icon {...props} icon="shield-check" />}
            right={() => (
              <Switch 
                value={autoInsurance} 
                onValueChange={setAutoInsurance}
              />
            )}
          />
          
          <List.Item
            title="알림 설정"
            description="보험 관련 알림 받기"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch 
                value={notificationsEnabled} 
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          
          <List.Item
            title="보험 내역"
            description="가입한 보험 목록 및 상태"
            left={props => <List.Icon {...props} icon="history" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>

      {/* 앱 설정 */}
      <Card style={[styles.sectionCard, cyberpunkEffects.cardGlow()]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow()]}>
            앱 설정
          </Text>
          
          <List.Item
            title="테마"
            description={`현재: ${themeMode === 'system' ? '시스템 설정' : themeMode === 'light' ? '라이트' : '다크'}`}
            left={props => <List.Icon {...props} icon="palette" />}
            onPress={() => setShowThemeDialog(true)}
          />
          
          <List.Item
            title="언어"
            description="한국어"
            left={props => <List.Icon {...props} icon="translate" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="데이터 백업"
            description="클라우드에 데이터 백업"
            left={props => <List.Icon {...props} icon="backup-restore" />}
            onPress={handleBackup}
          />
        </Card.Content>
      </Card>

      {/* 개인정보 및 보안 */}
      <Card style={[styles.sectionCard, cyberpunkEffects.cardGlow()]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow()]}>
            개인정보 및 보안
          </Text>
          
          <List.Item
            title="위치 데이터 익명화"
            description="위치 정보를 익명으로 저장"
            left={props => <List.Icon {...props} icon="incognito" />}
            right={() => <Switch value={true} onValueChange={() => {}} />}
          />
          
          <List.Item
            title="데이터 내보내기"
            description="내 데이터 다운로드"
            left={props => <List.Icon {...props} icon="download" />}
            onPress={handleExportData}
          />
          
          <List.Item
            title="계정 삭제"
            description="모든 데이터 영구 삭제"
            left={props => <List.Icon {...props} icon="delete" />}
            onPress={() => {}}
            titleStyle={{ color: theme.colors.error }}
          />
        </Card.Content>
      </Card>

      {/* 정보 */}
      <Card style={[styles.sectionCard, cyberpunkEffects.cardGlow()]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, cyberpunkEffects.textGlow()]}>
            정보
          </Text>
          
          <List.Item
            title="도움말"
            left={props => <List.Icon {...props} icon="help-circle" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="개인정보처리방침"
            left={props => <List.Icon {...props} icon="shield-account" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="서비스 약관"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={() => {}}
          />
          
          <List.Item
            title="앱 버전"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
        </Card.Content>
      </Card>

      {/* 테마 선택 다이얼로그 */}
      <Portal>
        <Dialog visible={showThemeDialog} onDismiss={() => setShowThemeDialog(false)}>
          <Dialog.Title>테마 선택</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={setThemeMode} value={themeMode}>
              <RadioButton.Item label="시스템 설정" value="system" />
              <RadioButton.Item label="라이트 모드" value="light" />
              <RadioButton.Item label="다크 모드" value="dark" />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowThemeDialog(false)}>확인</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* 위치 정확도 다이얼로그 */}
      <Portal>
        <Dialog visible={showAccuracyDialog} onDismiss={() => setShowAccuracyDialog(false)}>
          <Dialog.Title>위치 정확도</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={setLocationAccuracy} value={locationAccuracy}>
              <RadioButton.Item 
                label="높음 (배터리 소모 많음)" 
                value="high" 
              />
              <RadioButton.Item 
                label="중간 (균형)" 
                value="medium" 
              />
              <RadioButton.Item 
                label="낮음 (배터리 절약)" 
                value="low" 
              />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAccuracyDialog(false)}>확인</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileCard: {
    marginBottom: 15,
    elevation: 2,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  sectionCard: {
    marginBottom: 15,
    elevation: 1,
  },
  sectionTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
