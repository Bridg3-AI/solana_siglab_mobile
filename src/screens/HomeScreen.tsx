import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { InsuranceStyles, InsuranceColors } from "../theme/insurance-styles";

type RootStackParamList = {
  InsuranceHome: undefined;
};

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleGoToInsurance = () => {
    navigation.navigate('InsuranceHome');
  };

  return (
    <View style={[InsuranceStyles.container, InsuranceStyles.centerContent, InsuranceStyles.padding]}>
      <Text style={[InsuranceStyles.gradientText, { fontSize: 24, fontWeight: '700', marginBottom: 16 }]}>
        Seeker 보험
      </Text>
      <Text style={[InsuranceStyles.secondaryText, { textAlign: 'center', marginBottom: 32 }]}>
        GPS 기반 스마트 보험 플랫폼
      </Text>
      
      <Pressable
        style={({ pressed }) => [
          InsuranceStyles.primaryButton,
          { minHeight: 52, width: '100%' },
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
        ]}
        onPress={handleGoToInsurance}
      >
        <Text style={InsuranceStyles.primaryButtonText}>
          보험 만들기 시작
        </Text>
      </Pressable>
    </View>
  );
}
