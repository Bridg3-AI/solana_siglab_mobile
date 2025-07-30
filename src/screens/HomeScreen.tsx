import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { InsuranceStyles, InsuranceColors, GradientConfigs } from "../theme/insurance-styles";
import { Card } from "react-native-paper";

type RootStackParamList = {
  InsuranceHome: undefined;
  Chat: undefined;
  Map: undefined;
};

const { width, height } = Dimensions.get('window');

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGoToFestivalInsurance = () => {
    navigation.navigate('Chat' as any);
  };

  const handleExploreMap = () => {
    navigation.navigate('Map' as any);
  };

  return (
    <LinearGradient
      colors={GradientConfigs.background.colors}
      start={GradientConfigs.background.start}
      end={GradientConfigs.background.end}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Festival Background Overlay */}
        <View style={styles.backgroundOverlay}>
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.brandName}>Siglab AI</Text>
            <Text style={styles.tagline}>Festival Insurance Platform</Text>
          </View>
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons name="clock-outline" size={16} color={InsuranceColors.text.secondary} />
            <Text style={styles.timeText}>
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Festival Card */}
          <Card style={[InsuranceStyles.glassCard, styles.festivalCard]}>
            <LinearGradient
              colors={['#FF6B6B20', '#FF6B6B10']}
              style={styles.festivalGradient}
            />
            <View style={styles.festivalHeader}>
              <View style={styles.festivalBadge}>
                <MaterialCommunityIcons name="music-box-multiple" size={24} color="#FF6B6B" />
              </View>
              <View style={styles.festivalInfo}>
                <Text style={styles.festivalName}>Fuji Rock Festival 2025</Text>
                <Text style={styles.festivalDate}>July 25-27 • Naeba Ski Resort</Text>
              </View>
            </View>
            
            <View style={styles.festivalStats}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="ticket" size={16} color={InsuranceColors.primary.teal} />
                <Text style={styles.statText}>3-Day Pass</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="account-group" size={16} color={InsuranceColors.primary.teal} />
                <Text style={styles.statText}>150k Attendees</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="weather-partly-cloudy" size={16} color={InsuranceColors.primary.teal} />
                <Text style={styles.statText}>Rain Expected</Text>
              </View>
            </View>

            <Text style={styles.festivalDescription}>
              Asia's premier rock festival featuring Fred Again, Vampire Weekend, and 200+ artists
            </Text>
          </Card>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                styles.primaryAction,
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
              ]}
              onPress={handleGoToFestivalInsurance}
            >
              <MaterialCommunityIcons name="shield-plus" size={32} color="#FFF" />
              <Text style={styles.actionTitle}>Get Festival Insurance</Text>
              <Text style={styles.actionDescription}>AI-powered coverage in seconds</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                styles.secondaryAction,
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
              ]}
              onPress={handleExploreMap}
            >
              <MaterialCommunityIcons name="map-marker-radius" size={32} color={InsuranceColors.primary.teal} />
              <Text style={[styles.actionTitle, { color: InsuranceColors.text.primary }]}>Explore Venue</Text>
              <Text style={[styles.actionDescription, { color: InsuranceColors.text.secondary }]}>View coverage zones</Text>
            </Pressable>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <Card style={[InsuranceStyles.glassCard, styles.infoCard]}>
              <MaterialCommunityIcons name="lightning-bolt" size={20} color={InsuranceColors.status.warning} />
              <Text style={styles.infoText}>Instant activation when you enter the festival grounds</Text>
            </Card>
            
            <Card style={[InsuranceStyles.glassCard, styles.infoCard]}>
              <MaterialCommunityIcons name="shield-check" size={20} color={InsuranceColors.status.success} />
              <Text style={styles.infoText}>Covers medical, theft, cancellation & weather delays</Text>
            </Card>
          </View>

          {/* Bottom Features */}
          <View style={styles.bottomFeatures}>
            <Text style={styles.featuresTitle}>Why Festival Insurance?</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons name="hospital-box" size={16} color={InsuranceColors.primary.teal} />
                <Text style={styles.featureText}>On-site medical emergencies</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons name="bag-personal" size={16} color={InsuranceColors.primary.teal} />
                <Text style={styles.featureText}>Gear theft protection</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons name="weather-lightning-rainy" size={16} color={InsuranceColors.primary.teal} />
                <Text style={styles.featureText}>Weather cancellation</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 100,
  },
  
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
  },
  
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  
  headerContent: {
    flex: 1,
  },
  
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: InsuranceColors.primary.teal,
    marginBottom: 4,
  },
  
  tagline: {
    fontSize: 14,
    color: InsuranceColors.text.secondary,
  },
  
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: InsuranceColors.glass.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  
  timeText: {
    fontSize: 12,
    color: InsuranceColors.text.secondary,
  },
  
  mainContent: {
    paddingHorizontal: 24,
  },
  
  festivalCard: {
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  
  festivalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  festivalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  festivalBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B6B20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  festivalInfo: {
    flex: 1,
  },
  
  festivalName: {
    fontSize: 18,
    fontWeight: '600',
    color: InsuranceColors.text.primary,
    marginBottom: 4,
  },
  
  festivalDate: {
    fontSize: 14,
    color: InsuranceColors.text.secondary,
  },
  
  festivalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: InsuranceColors.glass.border,
    marginBottom: 16,
  },
  
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  
  statText: {
    fontSize: 12,
    color: InsuranceColors.text.secondary,
  },
  
  festivalDescription: {
    fontSize: 14,
    color: InsuranceColors.text.secondary,
    lineHeight: 20,
  },
  
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  
  primaryAction: {
    backgroundColor: InsuranceColors.primary.teal,
  },
  
  secondaryAction: {
    backgroundColor: InsuranceColors.glass.background,
    borderWidth: 1,
    borderColor: InsuranceColors.glass.border,
  },
  
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginTop: 8,
    marginBottom: 4,
  },
  
  actionDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  
  infoCards: {
    gap: 12,
    marginBottom: 20,
  },
  
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  
  infoText: {
    flex: 1,
    fontSize: 13,
    color: InsuranceColors.text.secondary,
    lineHeight: 18,
  },
  
  bottomFeatures: {
    marginTop: 20,
  },
  
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: InsuranceColors.text.primary,
    marginBottom: 12,
  },
  
  featuresList: {
    gap: 8,
  },
  
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  featureText: {
    fontSize: 12,
    color: InsuranceColors.text.secondary,
  },
});