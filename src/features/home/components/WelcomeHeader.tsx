import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuthorization } from '../../../utils/useAuthorization';
import { 
  SeekerCard, 
  SeekerText, 
  SeekerHeading,
  useSeekerTheme 
} from '../../../components/seeker';

export const WelcomeHeader: React.FC = () => {
  const { theme } = useSeekerTheme();
  const { selectedAccount } = useAuthorization();

  return (
    <SeekerCard variant="gradient" style={styles.card} elevated>
      <View style={styles.content}>
        {/* Clean Professional Avatar */}
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={theme.colors.gradients.primary}
            style={styles.avatarBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialCommunityIcon
              name="shield-account"
              size={32}
              color={theme.colors.text.primary}
            />
          </LinearGradient>
        </View>
        
        <View style={styles.textContainer}>
          {selectedAccount ? (
            <>
              <SeekerHeading level={2} style={styles.title}>
                Seeker
              </SeekerHeading>
              <SeekerText variant="body" color="secondary" style={styles.subtitle}>
                GPS-based AI insurance agent ready for deployment
              </SeekerText>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: theme.colors.status.success }]} />
                <SeekerText variant="caption" color="accent" style={styles.status}>
                  Connected · Location Services Active
                </SeekerText>
              </View>
            </>
          ) : (
            <>
              <SeekerHeading level={2} style={styles.title}>
                Welcome to Seeker
              </SeekerHeading>
              <SeekerText variant="body" color="secondary" style={styles.subtitle}>
                Connect your wallet to access location-based insurance services
              </SeekerText>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: theme.colors.status.warning }]} />
                <SeekerText variant="caption" color="tertiary" style={styles.status}>
                  Wallet Disconnected · Limited Access
                </SeekerText>
              </View>
            </>
          )}
        </View>
      </View>
    </SeekerCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  
  // Avatar styles
  avatarContainer: {
    marginRight: 20,
  },
  avatarBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Text styles
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    marginBottom: 12,
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  status: {
    fontSize: 12,
  },
});