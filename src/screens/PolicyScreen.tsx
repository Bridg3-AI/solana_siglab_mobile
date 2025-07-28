/**
 * Policy Screen - Converted from dApp_UI PolicyPreview.tsx
 * Insurance policy preview and confirmation
 */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useConnection } from '../utils/ConnectionProvider';

import { InsuranceStyles, InsuranceColors, GradientConfigs } from '../theme/insurance-styles';
import type { InsuranceData } from '../navigators/AppNavigator';
import { useMobileWallet } from '../utils/useMobileWallet';
import { useAuthorization } from '../utils/useAuthorization';
import { InsuranceProgram } from '../utils/insuranceProgram';

type RootStackParamList = {
  Policy: { data: InsuranceData };
  Monitoring: { data: InsuranceData };
  Premium: { data: InsuranceData };
};

type PolicyScreenRouteProp = RouteProp<RootStackParamList, 'Policy'>;

export default function PolicyScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<PolicyScreenRouteProp>();
  const { connection } = useConnection();
  const { connect, disconnect, signAndSendTransaction } = useMobileWallet();
  const { selectedAccount } = useAuthorization();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const insuranceData = route.params.data;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      
      // Check if wallet is connected
      let account = selectedAccount;
      if (!account) {
        // Connect wallet if not connected
        try {
          account = await connect();
        } catch (error) {
          Alert.alert(
            'Wallet Connection Required',
            'Please connect your Solana wallet to continue.',
            [{ text: 'OK' }]
          );
          setIsLoading(false);
          return;
        }
      }
      
      // Create insurance on blockchain
      const transaction = await InsuranceProgram.createInsurance(
        connection,
        account.publicKey,
        insuranceData
      );
      
      // Sign and send transaction
      try {
        const signature = await signAndSendTransaction(transaction, 0);
        console.log('Transaction signature:', signature);
        
        // Update insurance data with transaction details
        const finalData: InsuranceData = {
          ...insuranceData,
          status: 'active',
          id: Date.now().toString(),
          transactionSignature: signature,
        };
        
        // Navigate to monitoring screen
        navigation.navigate('Monitoring', { data: finalData });
      } catch (error: any) {
        console.error('Transaction error:', error);
        
        // Check if it's an auth token error
        if (error.message?.includes('auth_token not valid')) {
          // Clear invalid auth and reconnect
          try {
            await disconnect();
            const newAccount = await connect();
            
            // Retry transaction with new connection
            const signature = await signAndSendTransaction(transaction, 0);
            
            const finalData: InsuranceData = {
              ...insuranceData,
              status: 'active',
              id: Date.now().toString(),
              transactionSignature: signature,
            };
            
            navigation.navigate('Monitoring', { data: finalData });
            return;
          } catch (retryError) {
            console.error('Retry error:', retryError);
            Alert.alert(
              'Connection Error',
              'Please disconnect and reconnect your wallet, then try again.',
              [{ text: 'OK' }]
            );
          }
        } else {
          Alert.alert(
            'Transaction Failed',
            'Failed to create insurance on blockchain. Please try again.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error creating insurance:', error);
      Alert.alert(
        'Error',
        'An error occurred while creating the insurance. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
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
                Seeker Insurance
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12 }]}>
                Policy Preview
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

        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={InsuranceStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[InsuranceStyles.padding, InsuranceStyles.maxWidth]}>
            
            {/* Wallet Status */}
            {!selectedAccount ? (
              <Card style={[InsuranceStyles.glassCard, { padding: 16, marginBottom: 16, backgroundColor: InsuranceColors.glass.warning }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Ionicons name="wallet-outline" size={20} color={InsuranceColors.text.primary} />
                  <Text style={[InsuranceStyles.primaryText, { fontSize: 14, flex: 1 }]}>
                    Wallet not connected
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      {
                        backgroundColor: InsuranceColors.primary.teal,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        opacity: isConnecting ? 0.7 : 1,
                      },
                      pressed && { opacity: 0.8 }
                    ]}
                    onPress={async () => {
                      if (isConnecting) return;
                      
                      try {
                        setIsConnecting(true);
                        await connect();
                      } catch (error) {
                        console.error('Connection error:', error);
                        Alert.alert('Connection Failed', 'Failed to connect wallet. Please make sure you have a Solana wallet installed.');
                      } finally {
                        setIsConnecting(false);
                      }
                    }}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <ActivityIndicator size="small" color={InsuranceColors.background.primary} />
                    ) : (
                      <Text style={{ color: InsuranceColors.background.primary, fontSize: 14, fontWeight: '600' }}>
                        Connect
                      </Text>
                    )}
                  </Pressable>
                </View>
              </Card>
            ) : (
              <Card style={[InsuranceStyles.glassCard, { padding: 16, marginBottom: 16, backgroundColor: InsuranceColors.glass.accent }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Ionicons name="checkmark-circle" size={20} color={InsuranceColors.primary.teal} />
                  <Text style={[InsuranceStyles.primaryText, { fontSize: 14, flex: 1 }]}>
                    Wallet connected: {selectedAccount.address.slice(0, 4)}...{selectedAccount.address.slice(-4)}
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: InsuranceColors.glass.border,
                      },
                      pressed && { opacity: 0.8 }
                    ]}
                    onPress={async () => {
                      try {
                        await disconnect();
                      } catch (error) {
                        console.error('Disconnect error:', error);
                      }
                    }}
                  >
                    <Text style={{ color: InsuranceColors.text.primary, fontSize: 12 }}>
                      Disconnect
                    </Text>
                  </Pressable>
                </View>
              </Card>
            )}
            
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
                  Insurance Policy Summary
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
                Insurance Details
              </Text>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Measurement Indicator
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.indicator}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Threshold Value
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.threshold}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Duration
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 14 }]}>
                  {insuranceData.period} days
                </Text>
              </View>
            </Card>

            {/* Financial Terms */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                Premium & Compensation
              </Text>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Monthly Premium
                </Text>
                <Text style={[InsuranceStyles.neonText, { fontSize: 16, fontWeight: '600' }]}>
                  {insuranceData.premium?.toLocaleString()} {insuranceData.currency}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Maximum Payout
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600' }]}>
                  {insuranceData.maxPayout?.toLocaleString()} {insuranceData.currency}
                </Text>
              </View>
              
              <View style={[InsuranceStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[InsuranceStyles.secondaryText, { fontSize: 14 }]}>
                  Reliability
                </Text>
                <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600' }]}>
                  {insuranceData.reliability}%
                </Text>
              </View>
            </Card>

            {/* Terms and Conditions */}
            <Card style={[InsuranceStyles.glassCard, { padding: 20, marginBottom: 24 }]}>
              <Text style={[InsuranceStyles.primaryText, { fontSize: 16, fontWeight: '600', marginBottom: 16 }]}>
                Terms and Conditions
              </Text>
              
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • Premium is automatically deducted monthly
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • Compensation is automatically paid when conditions are met
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16, marginBottom: 8 }]}>
                • You can cancel the insurance at any time
              </Text>
              <Text style={[InsuranceStyles.mutedText, { fontSize: 12, lineHeight: 16 }]}>
                • Data is collected in real-time from certified APIs
              </Text>
            </Card>

            {/* Confirm Button */}
            <Pressable
              style={({ pressed }) => [
                InsuranceStyles.primaryButton,
                { minHeight: 52, marginBottom: 24 },
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
                isLoading && { opacity: 0.7 }
              ]}
              onPress={handleConfirm}
              disabled={isLoading}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={InsuranceColors.background.primary} />
                ) : (
                  <Ionicons name="checkmark-circle" size={20} color={InsuranceColors.background.primary} />
                )}
                <Text style={InsuranceStyles.primaryButtonText}>
                  {isLoading ? 'Processing...' : 'Subscribe to Insurance'}
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}