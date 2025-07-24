import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { 
  Switch, 
  Portal,
  Dialog,
  RadioButton
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import ClusterPickerFeature from "../components/cluster/cluster-picker-feature";
import { 
  CyberCard, 
  NeonButton,
  CyberText, 
  NeonText,
  TerminalText,
  GlitchText,
  useCyberpunkTheme 
} from '../components/cyberpunk';

export function SettingsScreen() {
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoInsurance, setAutoInsurance] = useState(false);
  const [batteryOptimization, setBatteryOptimization] = useState(true);
  const [locationAccuracy, setLocationAccuracy] = useState('high');
  const [themeMode, setThemeMode] = useState('cyberpunk');
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showAccuracyDialog, setShowAccuracyDialog] = useState(false);
  
  const { colors, spacing } = useCyberpunkTheme();
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Scanning animation
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleWalletConnect = () => {
    // 지갑 연결 로직
  };

  const handleBackup = () => {
    // 데이터 백업 로직
  };

  const handleExportData = () => {
    // 데이터 내보내기 로직
  };

  const CyberSwitch = ({ value, onValueChange, neonColor = 'cyan' }: {
    value: boolean;
    onValueChange: (value: boolean) => void;
    neonColor?: 'cyan' | 'lime' | 'red';
  }) => (
    <TouchableOpacity 
      onPress={() => onValueChange(!value)}
      style={styles.cyberSwitch}
    >
      <LinearGradient
        colors={value ? colors.gradients.neonPrimary : [colors.dark.shadow, colors.dark.deep]}
        style={styles.switchGradient}
      >
        <View style={[
          styles.switchIndicator,
          {
            backgroundColor: value ? colors.neon[neonColor] : colors.text.disabled,
            shadowColor: value ? colors.neon[neonColor] : 'transparent',
          }
        ]} />
      </LinearGradient>
    </TouchableOpacity>
  );

  const TerminalListItem = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    rightComponent,
    danger = false 
  }: {
    icon: string;
    title: string;
    description?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    danger?: boolean;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.terminalItem}>
      <View style={styles.terminalItemContent}>
        <View style={styles.terminalIcon}>
          <MaterialCommunityIcon 
            name={icon as any} 
            size={20} 
            color={danger ? colors.neon.red : colors.neon.lime} 
          />
        </View>
        <View style={styles.terminalText}>
          <TerminalText style={[
            styles.terminalTitle,
            { color: danger ? colors.neon.red : colors.text.primary }
          ]}>
            {title}
          </TerminalText>
          {description && (
            <CyberText variant="caption" color="tertiary" style={styles.terminalDescription}>
              {description}
            </CyberText>
          )}
        </View>
        {rightComponent && (
          <View style={styles.terminalRight}>
            {rightComponent}
          </View>
        )}
        {onPress && !rightComponent && (
          <MaterialCommunityIcon 
            name="chevron-right" 
            size={16} 
            color={colors.border.primary} 
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.dark.void }]}>
      {/* Terminal Background Pattern */}
      <View style={styles.terminalBackground}>
        <LinearGradient
          colors={[colors.dark.void, colors.dark.deep, colors.dark.void]}
          style={StyleSheet.absoluteFill}
        />
        {/* Scanning line */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              backgroundColor: colors.neon.lime,
              transform: [{
                translateY: scanAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-2, 800],
                })
              }]
            }
          ]}
        />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Terminal Header */}
          <CyberCard variant="glass" style={styles.headerCard}>
            <View style={styles.terminalHeader}>
              <GlitchText variant="h4" style={styles.terminalTitle}>
                SYSTEM_CONFIG.exe
              </GlitchText>
              <TerminalText style={styles.terminalPath}>
                root@neural_net:/config$
              </TerminalText>
            </View>
          </CyberCard>

          {/* User Profile Terminal */}
          <CyberCard variant="neon" glowColor="cyan" style={styles.sectionCard}>
            <View style={styles.profileSection}>
              <View style={styles.profileHeader}>
                <TerminalText style={styles.sectionLabel}>
                  >> USER_PROFILE.sys
                </TerminalText>
              </View>
              
              <View style={styles.profileContent}>
                {/* Holographic Avatar */}
                <View style={styles.holoAvatar}>
                  <LinearGradient
                    colors={colors.gradients.hologram}
                    style={styles.avatarGradient}
                  >
                    <MaterialCommunityIcon
                      name="account-circle"
                      size={48}
                      color={colors.dark.void}
                    />
                  </LinearGradient>
                  <View style={styles.avatarScan} />
                </View>
                
                <View style={styles.profileInfo}>
                  <NeonText neonColor="cyan" variant="h6">
                    NEURAL_USER_001
                  </NeonText>
                  <TerminalText style={styles.profileStatus}>
                    STATUS: WALLET_CONNECTED | ACCESS: AUTHORIZED
                  </TerminalText>
                </View>
                
                <NeonButton
                  title="MANAGE"
                  onPress={handleWalletConnect}
                  variant="terminal"
                  size="small"
                />
              </View>
            </View>
          </CyberCard>

          {/* Blockchain Configuration */}
          <CyberCard variant="glass" style={styles.sectionCard}>
            <View style={styles.terminalSection}>
              <TerminalText style={styles.sectionLabel}>
                >> BLOCKCHAIN_CONFIG.net
              </TerminalText>
              <View style={styles.clusterWrapper}>
                <ClusterPickerFeature />
              </View>
            </View>
          </CyberCard>

          {/* GPS & Location Configuration */}
          <CyberCard variant="hologram" glowColor="lime" style={styles.sectionCard}>
            <View style={styles.terminalSection}>
              <TerminalText style={styles.sectionLabel}>
                >> GPS_MATRIX.sys
              </TerminalText>
              
              <TerminalListItem
                icon="crosshairs-gps"
                title="GPS_TRACKING_PROTOCOL"
                description="GEOGRAPHIC RISK ASSESSMENT MODULE"
                rightComponent={
                  <CyberSwitch 
                    value={gpsEnabled} 
                    onValueChange={setGpsEnabled}
                    neonColor="lime"
                  />
                }
              />
              
              <TerminalListItem
                icon="target"
                title="LOCATION_ACCURACY"
                description={`MODE: ${locationAccuracy.toUpperCase()}_PRECISION`}
                onPress={() => setShowAccuracyDialog(true)}
              />
              
              <TerminalListItem
                icon="battery"
                title="POWER_OPTIMIZATION"
                description="BATTERY CONSERVATION PROTOCOL"
                rightComponent={
                  <CyberSwitch 
                    value={batteryOptimization} 
                    onValueChange={setBatteryOptimization}
                    neonColor="lime"
                  />
                }
              />
            </View>
          </CyberCard>

          {/* Insurance Protocol Configuration */}
          <CyberCard variant="neon" glowColor="magenta" style={styles.sectionCard}>
            <View style={styles.terminalSection}>
              <TerminalText style={styles.sectionLabel}>
                >> INSURANCE_PROTOCOL.exe
              </TerminalText>
              
              <TerminalListItem
                icon="shield-check"
                title="AUTO_DEPLOYMENT"
                description="LOCATION-BASED AUTONOMOUS INSURANCE"
                rightComponent={
                  <CyberSwitch 
                    value={autoInsurance} 
                    onValueChange={setAutoInsurance}
                    neonColor="cyan"
                  />
                }
              />
              
              <TerminalListItem
                icon="bell"
                title="NOTIFICATION_SYSTEM"
                description="INSURANCE ALERT PROTOCOL"
                rightComponent={
                  <CyberSwitch 
                    value={notificationsEnabled} 
                    onValueChange={setNotificationsEnabled}
                    neonColor="cyan"
                  />
                }
              />
              
              <TerminalListItem
                icon="history"
                title="COVERAGE_HISTORY"
                description="ACTIVE POLICIES DATABASE"
                onPress={() => {}}
              />
            </View>
          </CyberCard>

          {/* System Configuration */}
          <CyberCard variant="glass" style={styles.sectionCard}>
            <View style={styles.terminalSection}>
              <TerminalText style={styles.sectionLabel}>
                >> SYSTEM_SETTINGS.cfg
              </TerminalText>
              
              <TerminalListItem
                icon="palette"
                title="VISUAL_INTERFACE"
                description="MODE: CYBERPUNK_ENHANCED"
                onPress={() => setShowThemeDialog(true)}
              />
              
              <TerminalListItem
                icon="translate"
                title="LANGUAGE_PROTOCOL"
                description="LOCALE: KO_NEURAL"
                onPress={() => {}}
              />
              
              <TerminalListItem
                icon="backup-restore"
                title="DATA_BACKUP"
                description="CLOUD SYNCHRONIZATION MODULE"
                onPress={handleBackup}
              />
            </View>
          </CyberCard>

          {/* Security & Privacy */}
          <CyberCard variant="neon" glowColor="red" style={styles.sectionCard}>
            <View style={styles.terminalSection}>
              <TerminalText style={styles.sectionLabel}>
                >> SECURITY_PROTOCOLS.sec
              </TerminalText>
              
              <TerminalListItem
                icon="incognito"
                title="DATA_ANONYMIZATION"
                description="LOCATION PRIVACY ENCRYPTION"
                rightComponent={
                  <CyberSwitch 
                    value={true} 
                    onValueChange={() => {}}
                    neonColor="cyan"
                  />
                }
              />
              
              <TerminalListItem
                icon="download"
                title="DATA_EXPORT"
                description="NEURAL DATA EXTRACTION"
                onPress={handleExportData}
              />
              
              <View style={styles.dangerZone}>
                <TerminalText style={styles.dangerLabel}>
                  >> DANGER_ZONE.exe
                </TerminalText>
                <TerminalListItem
                  icon="delete"
                  title="ACCOUNT_TERMINATION"
                  description="PERMANENT DATA PURGE PROTOCOL"
                  onPress={() => {}}
                  danger
                />
              </View>
            </View>
          </CyberCard>

          {/* System Information */}
          <CyberCard variant="glass" style={styles.sectionCard}>
            <View style={styles.terminalSection}>
              <TerminalText style={styles.sectionLabel}>
                >> SYSTEM_INFO.log
              </TerminalText>
              
              <TerminalListItem
                icon="help-circle"
                title="HELP_DOCUMENTATION"
                description="USER MANUAL DATABASE"
                onPress={() => {}}
              />
              
              <TerminalListItem
                icon="shield-account"
                title="PRIVACY_POLICY"
                description="DATA PROTECTION PROTOCOLS"
                onPress={() => {}}
              />
              
              <TerminalListItem
                icon="file-document"
                title="SERVICE_TERMS"
                description="LEGAL FRAMEWORK DOCUMENTATION"
                onPress={() => {}}
              />
              
              <TerminalListItem
                icon="information"
                title="SYSTEM_VERSION"
                description="BUILD: v1.0.0_NEURAL_ALPHA"
              />
            </View>
          </CyberCard>
        </Animated.View>
      </ScrollView>

      {/* Cyberpunk Dialogs */}
      <Portal>
        <Dialog 
          visible={showThemeDialog} 
          onDismiss={() => setShowThemeDialog(false)}
          style={styles.cyberDialog}
        >
          <View style={styles.dialogContent}>
            <GlitchText variant="h6" style={styles.dialogTitle}>
              VISUAL_INTERFACE_SELECT
            </GlitchText>
            <RadioButton.Group onValueChange={setThemeMode} value={themeMode}>
              <View style={styles.radioOption}>
                <RadioButton value="cyberpunk" color={colors.neon.cyan} />
                <TerminalText style={styles.radioLabel}>CYBERPUNK_MODE</TerminalText>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="matrix" color={colors.neon.lime} />
                <TerminalText style={styles.radioLabel}>MATRIX_MODE</TerminalText>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="neon" color={colors.neon.magenta} />
                <TerminalText style={styles.radioLabel}>NEON_MODE</TerminalText>
              </View>
            </RadioButton.Group>
            <NeonButton
              title="EXECUTE"
              onPress={() => setShowThemeDialog(false)}
              variant="primary"
              size="small"
              style={styles.dialogButton}
            />
          </View>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog 
          visible={showAccuracyDialog} 
          onDismiss={() => setShowAccuracyDialog(false)}
          style={styles.cyberDialog}
        >
          <View style={styles.dialogContent}>
            <GlitchText variant="h6" style={styles.dialogTitle}>
              GPS_PRECISION_CONFIG
            </GlitchText>
            <RadioButton.Group onValueChange={setLocationAccuracy} value={locationAccuracy}>
              <View style={styles.radioOption}>
                <RadioButton value="high" color={colors.neon.lime} />
                <TerminalText style={styles.radioLabel}>HIGH_PRECISION [POWER_DRAIN: MAX]</TerminalText>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="medium" color={colors.neon.cyan} />
                <TerminalText style={styles.radioLabel}>MEDIUM_PRECISION [POWER_DRAIN: MID]</TerminalText>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="low" color={colors.neon.red} />
                <TerminalText style={styles.radioLabel}>LOW_PRECISION [POWER_DRAIN: MIN]</TerminalText>
              </View>
            </RadioButton.Group>
            <NeonButton
              title="APPLY_CONFIG"
              onPress={() => setShowAccuracyDialog(false)}
              variant="terminal"
              size="small"
              style={styles.dialogButton}
            />
          </View>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  terminalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.7,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  // Header styles
  headerCard: {
    marginTop: 20,
    marginBottom: 16,
  },
  terminalHeader: {
    padding: 20,
    alignItems: 'center',
  },
  terminalTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  terminalPath: {
    fontSize: 12,
    opacity: 0.7,
  },
  
  // Section styles
  sectionCard: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  terminalSection: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 12,
    marginBottom: 16,
    letterSpacing: 1,
    opacity: 0.8,
  },
  
  // Profile section
  profileSection: {
    padding: 16,
  },
  profileHeader: {
    marginBottom: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  holoAvatar: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarScan: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0, 255, 255, 0.8)',
  },
  profileInfo: {
    flex: 1,
  },
  profileStatus: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.8,
  },
  
  // Terminal list item styles
  terminalItem: {
    marginVertical: 2,
  },
  terminalItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  terminalIcon: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  terminalText: {
    flex: 1,
  },
  terminalTitle: {
    fontSize: 14,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  terminalDescription: {
    fontSize: 11,
    lineHeight: 14,
  },
  terminalRight: {
    marginLeft: 12,
  },
  
  // Cyber switch styles
  cyberSwitch: {
    width: 50,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  switchGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  
  // Cluster wrapper
  clusterWrapper: {
    marginTop: 8,
  },
  
  // Danger zone
  dangerZone: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 0, 64, 0.3)',
  },
  dangerLabel: {
    fontSize: 12,
    marginBottom: 12,
    letterSpacing: 1,
    color: '#FF0040',
    opacity: 0.9,
  },
  
  // Dialog styles
  cyberDialog: {
    backgroundColor: 'rgba(15, 15, 31, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  dialogContent: {
    padding: 24,
    backgroundColor: 'rgba(15, 15, 31, 0.9)',
  },
  dialogTitle: {
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 4,
  },
  radioLabel: {
    marginLeft: 12,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  dialogButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
