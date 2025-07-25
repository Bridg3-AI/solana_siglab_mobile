import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import ClusterPickerFeature from "../components/cluster/cluster-picker-feature";
import { 
  SeekerCard, 
  SeekerButton,
  SeekerText, 
  SeekerHeading,
  useSeekerTheme 
} from '../components/seeker';

export function SettingsScreen() {
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoInsurance, setAutoInsurance] = useState(false);
  const [batteryOptimization, setBatteryOptimization] = useState(true);
  const [locationAccuracy, setLocationAccuracy] = useState('high');
  
  const { theme } = useSeekerTheme();

  const SettingsItem = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    rightComponent,
    danger = false 
  }: {
    icon: keyof typeof MaterialCommunityIcon.glyphMap;
    title: string;
    description?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    danger?: boolean;
  }) => (
    <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
      <View style={styles.itemContent}>
        <View style={[
          styles.iconContainer, 
          { backgroundColor: danger ? theme.colors.status.error + '20' : theme.colors.primary.teal + '20' }
        ]}>
          <MaterialCommunityIcon 
            name={icon} 
            size={20} 
            color={danger ? theme.colors.status.error : theme.colors.primary.teal} 
          />
        </View>
        <View style={styles.textContent}>
          <SeekerText variant="body" color={danger ? "secondary" : "primary"} style={styles.itemTitle}>
            {title}
          </SeekerText>
          {description && (
            <SeekerText variant="caption" color="secondary" style={styles.itemDescription}>
              {description}
            </SeekerText>
          )}
        </View>
        {rightComponent && (
          <View style={styles.rightComponent}>
            {rightComponent}
          </View>
        )}
        {onPress && !rightComponent && (
          <MaterialCommunityIcon 
            name="chevron-right" 
            size={20} 
            color={theme.colors.text.tertiary} 
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <LinearGradient
        colors={theme.colors.gradients.hero}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <SeekerHeading level={1} style={styles.title}>
            Settings
          </SeekerHeading>
          <SeekerText variant="body" color="secondary" style={styles.subtitle}>
            Manage your account and app preferences
          </SeekerText>
        </View>

        {/* Profile Section */}
        <SeekerCard variant="gradient" style={styles.profileCard} elevated>
          <View style={styles.profileContent}>
            <LinearGradient
              colors={theme.colors.gradients.primary}
              style={styles.avatar}
            >
              <MaterialCommunityIcon
                name="account"
                size={32}
                color={theme.colors.text.primary}
              />
            </LinearGradient>
            
            <View style={styles.profileInfo}>
              <SeekerHeading level={3} style={styles.profileName}>
                Seeker User
              </SeekerHeading>
              <SeekerText variant="body" color="secondary" style={styles.profileStatus}>
                Wallet connected • Ready for coverage
              </SeekerText>
            </View>
            
            <SeekerButton
              title="Manage"
              variant="outline"
              size="sm"
              onPress={() => {}}
            />
          </View>
        </SeekerCard>

        {/* Blockchain Settings */}
        <SeekerCard variant="solid" style={styles.sectionCard} elevated>
          <View style={styles.sectionHeader}>
            <SeekerText variant="overline" color="tertiary" style={styles.sectionTitle}>
              Blockchain
            </SeekerText>
          </View>
          <View style={styles.clusterWrapper}>
            <ClusterPickerFeature />
          </View>
        </SeekerCard>

        {/* Location & GPS */}
        <SeekerCard variant="solid" style={styles.sectionCard} elevated>
          <View style={styles.sectionHeader}>
            <SeekerText variant="overline" color="tertiary" style={styles.sectionTitle}>
              Location & GPS
            </SeekerText>
          </View>
          
          <SettingsItem
            icon="crosshairs-gps"
            title="GPS Tracking"
            description="Enable location-based features"
            rightComponent={
              <Switch 
                value={gpsEnabled} 
                onValueChange={setGpsEnabled}
                thumbColor={gpsEnabled ? theme.colors.primary.teal : theme.colors.text.disabled}
                trackColor={{ 
                  false: theme.colors.background.tertiary, 
                  true: theme.colors.primary.teal + '40' 
                }}
              />
            }
          />
          
          <SettingsItem
            icon="target"
            title="Location Accuracy"
            description={`${locationAccuracy.charAt(0).toUpperCase() + locationAccuracy.slice(1)} precision mode`}
            onPress={() => {}}
          />
          
          <SettingsItem
            icon="battery"
            title="Battery Optimization"
            description="Optimize GPS for battery life"
            rightComponent={
              <Switch 
                value={batteryOptimization} 
                onValueChange={setBatteryOptimization}
                thumbColor={batteryOptimization ? theme.colors.primary.teal : theme.colors.text.disabled}
                trackColor={{ 
                  false: theme.colors.background.tertiary, 
                  true: theme.colors.primary.teal + '40' 
                }}
              />
            }
          />
        </SeekerCard>

        {/* Insurance Settings */}
        <SeekerCard variant="solid" style={styles.sectionCard} elevated>
          <View style={styles.sectionHeader}>
            <SeekerText variant="overline" color="tertiary" style={styles.sectionTitle}>
              Insurance
            </SeekerText>
          </View>
          
          <SettingsItem
            icon="shield-check"
            title="Auto Insurance"
            description="Automatically purchase coverage based on location"
            rightComponent={
              <Switch 
                value={autoInsurance} 
                onValueChange={setAutoInsurance}
                thumbColor={autoInsurance ? theme.colors.primary.teal : theme.colors.text.disabled}
                trackColor={{ 
                  false: theme.colors.background.tertiary, 
                  true: theme.colors.primary.teal + '40' 
                }}
              />
            }
          />
          
          <SettingsItem
            icon="bell"
            title="Notifications"
            description="Insurance alerts and updates"
            rightComponent={
              <Switch 
                value={notificationsEnabled} 
                onValueChange={setNotificationsEnabled}
                thumbColor={notificationsEnabled ? theme.colors.primary.teal : theme.colors.text.disabled}
                trackColor={{ 
                  false: theme.colors.background.tertiary, 
                  true: theme.colors.primary.teal + '40' 
                }}
              />
            }
          />
          
          <SettingsItem
            icon="history"
            title="Coverage History"
            description="View past and active policies"
            onPress={() => {}}
          />
        </SeekerCard>

        {/* App Settings */}
        <SeekerCard variant="solid" style={styles.sectionCard} elevated>
          <View style={styles.sectionHeader}>
            <SeekerText variant="overline" color="tertiary" style={styles.sectionTitle}>
              App Settings
            </SeekerText>
          </View>
          
          <SettingsItem
            icon="translate"
            title="Language"
            description="English"
            onPress={() => {}}
          />
          
          <SettingsItem
            icon="backup-restore"
            title="Backup & Sync"
            description="Cloud data synchronization"
            onPress={() => {}}
          />
          
          <SettingsItem
            icon="incognito"
            title="Privacy Mode"
            description="Enhanced location privacy"
            rightComponent={
              <Switch 
                value={true} 
                onValueChange={() => {}}
                thumbColor={theme.colors.primary.teal}
                trackColor={{ 
                  false: theme.colors.background.tertiary, 
                  true: theme.colors.primary.teal + '40' 
                }}
              />
            }
          />
        </SeekerCard>

        {/* Support & Legal */}
        <SeekerCard variant="solid" style={styles.sectionCard} elevated>
          <View style={styles.sectionHeader}>
            <SeekerText variant="overline" color="tertiary" style={styles.sectionTitle}>
              Support & Legal
            </SeekerText>
          </View>
          
          <SettingsItem
            icon="help-circle"
            title="Help & Support"
            description="Get help and documentation"
            onPress={() => {}}
          />
          
          <SettingsItem
            icon="shield-account"
            title="Privacy Policy"
            description="How we protect your data"
            onPress={() => {}}
          />
          
          <SettingsItem
            icon="file-document"
            title="Terms of Service"
            description="Legal terms and conditions"
            onPress={() => {}}
          />
          
          <SettingsItem
            icon="information"
            title="App Version"
            description="v1.0.0 (Seeker)"
          />
        </SeekerCard>

        {/* Danger Zone */}
        <SeekerCard variant="outline" style={styles.dangerCard}>
          <View style={styles.sectionHeader}>
            <SeekerText variant="overline" color="secondary" style={styles.dangerTitle}>
              Danger Zone
            </SeekerText>
          </View>
          
          <SettingsItem
            icon="download"
            title="Export Data"
            description="Download your account data"
            onPress={() => {}}
          />
          
          <SettingsItem
            icon="delete"
            title="Delete Account"
            description="Permanently delete your account and data"
            onPress={() => {}}
            danger
          />
        </SeekerCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  // Header styles
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  
  // Profile section
  profileCard: {
    marginBottom: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 14,
  },
  
  // Section styles
  sectionCard: {
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Settings item styles
  settingsItem: {
    marginVertical: 4,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  rightComponent: {
    marginLeft: 16,
  },
  
  // Cluster wrapper
  clusterWrapper: {
    marginTop: 8,
  },
  
  // Danger zone
  dangerCard: {
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  dangerTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
