# Frontend Replacement Plan: dApp_UI → React Native Mobile

## 📋 Overview
Replace current React Native mobile frontend with dApp_UI's insurance creation flow while preserving all Solana Mobile Wallet Adapter integration.

## 🔍 Analysis Summary

### Current State
- **Platform**: React Native/Expo mobile app with Android-focused Solana integration
- **Architecture**: Stack navigation with Seeker design system
- **Key Features**: Mobile Wallet Adapter, blockchain transactions, cluster management

### Target State (dApp_UI)
- **Platform**: Web-based React application 
- **Flow**: 7-step insurance creation process
- **Design**: Glassmorphism with Seeker theme (#0a0b14 background, #00d4d4 accent)
- **Language**: Korean interface

## ⚠️ Critical Preservation Requirements

### MUST PRESERVE - Solana Mobile Integration
```typescript
// Essential mobile wallet functionality 
- useMobileWallet() hook with Android platform checks
- useAuthorization() with AsyncStorage caching  
- Mobile Wallet Adapter Protocol integration
- Transaction signing: signAndSendTransaction()
- Account management with PublicKey handling
- Provider architecture: QueryClient + ConnectionProvider + ClusterProvider
```

### MUST PRESERVE - Project Structure
```
- App.tsx (provider hierarchy)
- src/utils/ (wallet utilities)
- src/navigators/ (navigation structure)
- package.json dependencies (Solana, Expo, React Native)
- Android configuration
```

## 🔄 Component Conversion Strategy

| dApp_UI (Web) | React Native Equivalent | Action Required |
|---------------|-------------------------|-----------------|
| `App.tsx` (web step flow) | Stack Navigation screens | Replace div flow with navigation |
| `HomeScreen.tsx` | Mobile HomeScreen | Convert HTML → React Native Views |
| `ChatInput.tsx` | Mobile ChatScreen | Convert textarea → TextInput |
| `ScoreResult.tsx` | ScoreScreen | Convert web card → Paper Card |
| `IndicatorSetup.tsx` | IndicatorScreen | Convert form → React Native form |
| `PremiumCalculation.tsx` | PremiumScreen | Convert calculations → mobile UI |
| `PolicyPreview.tsx` | PolicyScreen | Convert preview → mobile layout |
| `MonitoringDashboard.tsx` | MonitoringScreen | Convert dashboard → mobile views |
| shadcn/ui components | React Native Paper | Replace 30+ web UI components |
| CSS glassmorphism | Custom StyleSheet | Implement mobile glass effects |
| lucide-react icons | @expo/vector-icons | Replace web icons |

## 🎨 Visual Design Conversion

### Theme Preservation
- **Background**: Linear gradient from #0a0b14 to #1a1b2e to #16213e
- **Primary Color**: #00d4d4 (Seeker teal)
- **Glassmorphism**: rgba(255, 255, 255, 0.05) with blur effects
- **Typography**: Korean-optimized fonts
- **Components**: Glass cards, neon borders, gradient text

### StyleSheet Conversion
```typescript
// FROM: CSS classes
.glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }
.neon-text { color: #00d4d4; text-shadow: 0 0 10px rgba(0, 212, 212, 0.5); }

// TO: React Native StyleSheet
const styles = StyleSheet.create({
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  neonText: {
    color: '#00d4d4',
    // Note: text-shadow requires custom implementation
  }
})
```

## 📱 Navigation Flow Conversion

### FROM: Web Step Flow (dApp_UI)
```typescript
const [currentStep, setCurrentStep] = useState(0);
const steps = [
  { name: '홈', component: HomeScreen },
  { name: '아이디어 입력', component: ChatInput },
  { name: '가능성 검증', component: ScoreResult },
  { name: '지표 설정', component: IndicatorSetup },
  { name: '프리미엄 계산', component: PremiumCalculation },
  { name: '정책 미리보기', component: PolicyPreview },
  { name: '모니터링', component: MonitoringDashboard }
];
```

### TO: React Native Stack Navigation
```typescript
// AppNavigator.tsx
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Chat" component={ChatScreen} />
  <Stack.Screen name="Score" component={ScoreScreen} />
  <Stack.Screen name="Indicator" component={IndicatorScreen} />
  <Stack.Screen name="Premium" component={PremiumScreen} />
  <Stack.Screen name="Policy" component={PolicyScreen} />
  <Stack.Screen name="Monitoring" component={MonitoringScreen} />
</Stack.Navigator>
```

## 🔧 Dependencies Conversion

### Add Required Dependencies
```json
{
  "dependencies": {
    "@expo/vector-icons": "^14.1.0", // Replace lucide-react
    "react-native-linear-gradient": "^2.8.3", // For gradients
    "react-native-blur": "^4.3.2", // For glassmorphism effects
    "react-native-reanimated": "^3.6.2", // For animations
  }
}
```

### Remove Web Dependencies (from dApp_UI)
- lucide-react → @expo/vector-icons
- class-variance-authority → removed
- clsx/tailwind-merge → removed
- @radix-ui components → React Native Paper equivalents

## 📂 File Structure Changes

### Replace Files
```
App.tsx ← dApp_UI/App.tsx (converted to RN)
src/screens/
  ├── HomeScreen.tsx ← dApp_UI/components/HomeScreen.tsx
  ├── ChatScreen.tsx ← dApp_UI/components/ChatInput.tsx
  ├── ScoreScreen.tsx ← dApp_UI/components/ScoreResult.tsx
  ├── IndicatorScreen.tsx ← dApp_UI/components/IndicatorSetup.tsx
  ├── PremiumScreen.tsx ← dApp_UI/components/PremiumCalculation.tsx
  ├── PolicyScreen.tsx ← dApp_UI/components/PolicyPreview.tsx
  └── MonitoringScreen.tsx ← dApp_UI/components/MonitoringDashboard.tsx
```

### Preserve Files
```
src/utils/ (ALL wallet utilities)
src/navigators/ (navigation structure)
src/polyfills.ts
package.json (Solana dependencies)
android/ (mobile configuration)
ios/ (mobile configuration)
```

## 🚀 Implementation Steps

### Phase 1: Core Conversion
1. ✅ Document replacement plan
2. Convert main App.tsx with navigation
3. Convert HomeScreen component
4. Set up glassmorphism styling system

### Phase 2: Screen Conversion
5. Convert ChatInput → ChatScreen
6. Convert ScoreResult → ScoreScreen  
7. Convert IndicatorSetup → IndicatorScreen
8. Convert remaining screens

### Phase 3: Integration & Testing
9. Integrate wallet functionality
10. Test on Android device
11. Verify insurance flow functionality

## 🔒 Security Considerations
- Preserve all wallet security patterns
- Maintain Android-only wallet adapter checks
- Keep AsyncStorage encryption patterns
- Preserve transaction signing security

## 📝 Success Criteria
- [ ] All 7 insurance creation screens functional
- [ ] Solana Mobile Wallet Adapter working
- [ ] Visual design matches dApp_UI
- [ ] Korean language preserved
- [ ] Android mobile wallet integration
- [ ] No regression in blockchain functionality

---
*This document serves as the master reference for the frontend replacement project.*