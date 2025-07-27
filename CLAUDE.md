# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `yarn start` - Start Expo development server
- `yarn android` - Start on Android device/emulator
- `yarn ios` - Start on iOS device/emulator (limited functionality)
- `yarn web` - Start web version

### Build Commands
- `yarn build` - Build development APK using EAS Build for Android
- `yarn build:local` - Build development APK locally using EAS Build
- `npx eas build --profile development --platform android` - Direct EAS build command

### Testing
- `yarn test` - No tests configured (placeholder script)

## Project Architecture

### Core Technology Stack
- **React Native (v0.76)** with **Expo (v53)** - Mobile framework
- **TypeScript** - Primary language with strict mode enabled
- **Solana Mobile Wallet Adapter** - Blockchain integration for mobile wallets
- **React Navigation (v6)** - Navigation system
- **React Native Paper (v5.12)** - Material Design components
- **TanStack Query (v5.24)** - State management and data fetching

### Key Mobile Blockchain Features
- **Mobile Wallet Adapter Protocol** - Connects to Solana mobile wallets
- **Solana Web3.js** - Blockchain interactions
- **SPL Token support** - Token operations
- **Polyfills** - Required crypto and Buffer polyfills for React Native

### Application Structure

#### Main App Entry (`App.tsx`)
- Wraps app with providers: QueryClient, ClusterProvider, ConnectionProvider, PaperProvider
- Handles dark/light theme switching
- Integrates Material Design 3 themes with React Navigation

#### Key Providers & Contexts
- **ClusterProvider** (`src/components/cluster/cluster-data-access.tsx`) - Manages Solana cluster selection (devnet/testnet)
- **ConnectionProvider** (`src/utils/ConnectionProvider.tsx`) - Provides Solana RPC connection
- **useAuthorization** (`src/utils/useAuthorization.tsx`) - Manages wallet authorization and account state
- **useMobileWallet** (`src/utils/useMobileWallet.tsx`) - Core mobile wallet operations

#### Navigation Architecture
- **AppNavigator** (`src/navigators/AppNavigator.tsx`) - Root navigation container
- **HomeNavigator** (`src/navigators/HomeNavigator.tsx`) - Home stack navigation
- Stack-based navigation with TypeScript route definitions

#### Component Structure
- **Feature-based organization** under `src/components/`
- Each feature has data access, UI, and feature components
- Components follow `feature-name-type.tsx` naming convention

## Architecture Patterns

### Feature-based Architecture (Primary Pattern)
This project follows a **Feature-based Architecture** which is the most popular and maintainable pattern for React Native applications.

#### Directory Structure
```
src/
├── features/                 # Feature-based modules
│   ├── auth/                # Authentication feature
│   │   ├── components/      # Auth-specific components
│   │   ├── hooks/          # Auth-specific hooks
│   │   ├── services/       # Auth API calls
│   │   ├── types/          # Auth TypeScript types
│   │   └── index.ts        # Feature exports
│   ├── map/                # Map & location feature
│   │   ├── components/     # Map components (MapScreen, SearchBar)
│   │   ├── hooks/          # useLocation, useGeofencing
│   │   ├── services/       # Google Places API
│   │   └── types/          # Map-related types
│   ├── insurance/          # Insurance feature
│   │   ├── components/     # Insurance UI components
│   │   ├── hooks/          # Insurance business logic
│   │   ├── services/       # Insurance smart contract calls
│   │   └── types/          # Insurance types
│   └── chat/               # AI Agent chat feature
│       ├── components/     # Chat UI components
│       ├── hooks/          # useAIAgent, useChat
│       ├── services/       # AI API integration
│       └── types/          # Chat message types
├── shared/                 # Shared resources
│   ├── components/         # Reusable UI components
│   ├── hooks/             # Common hooks
│   ├── services/          # Shared API services
│   ├── types/             # Global types
│   ├── utils/             # Utility functions
│   └── constants/         # App constants
├── screens/               # Screen components (legacy, migrating to features)
├── navigators/            # Navigation configuration
└── providers/             # Global providers & contexts
```

#### Benefits of Feature-based Architecture
- **Scalability**: Easy to add new features without affecting others
- **Maintainability**: Each feature is self-contained and focused
- **Team Collaboration**: Multiple developers can work on different features
- **Code Reusability**: Shared components and utilities are clearly separated
- **Testing**: Feature-specific tests are isolated and manageable

### Modern React Native Stack (Current Implementation)

#### Core Architecture: Expo Router + TanStack Query + Zustand
This project uses the modern React Native stack that has become the industry standard for 2024+:

**Navigation: Expo Router (File-based Routing)**
- File-based routing system similar to Next.js
- TypeScript-first with automatic route typing
- Built-in deep linking and universal routing
- Simplified navigation state management

**State Management: TanStack Query + Zustand**
- **TanStack Query (React Query)**: Server state management
  - Automatic caching, synchronization, and background updates
  - Optimistic updates and offline support
  - Perfect for API calls and remote data
- **Zustand**: Client state management
  - Lightweight alternative to Redux
  - TypeScript-friendly with minimal boilerplate
  - Perfect for UI state and local app state

**Data Flow Pattern:**
```typescript
// Server State (TanStack Query)
const { data: userLocation } = useQuery({
  queryKey: ['user-location'],
  queryFn: getCurrentLocation,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Client State (Zustand)
const useMapStore = create<MapState>((set) => ({
  selectedMarker: null,
  searchQuery: '',
  setSelectedMarker: (marker) => set({ selectedMarker: marker }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
```

#### Context Preservation Strategy
To maintain context between different AI conversations and user sessions:

**1. Persistent Context Storage**
```typescript
// Store user preferences and context
const useContextStore = create<ContextState>()(
  persist(
    (set, get) => ({
      userPreferences: {
        preferredInsuranceTypes: [],
        frequentLocations: [],
        riskTolerance: 'medium',
      },
      conversationHistory: [],
      currentSession: null,
      // Context preservation methods
      addToHistory: (message) => set((state) => ({
        conversationHistory: [...state.conversationHistory, message]
      })),
      updatePreferences: (prefs) => set({ userPreferences: prefs }),
    }),
    {
      name: 'user-context-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

**2. Feature-Specific Context**
```typescript
// Map feature context
const useMapContext = create<MapContext>((set) => ({
  currentLocation: null,
  searchHistory: [],
  favoriteLocations: [],
  geofences: [],
}));

// Insurance feature context
const useInsuranceContext = create<InsuranceContext>((set) => ({
  activeInsurances: [],
  claimHistory: [],
  riskProfile: null,
}));

// Chat feature context
const useChatContext = create<ChatContext>((set) => ({
  conversationId: null,
  messageHistory: [],
  userIntent: null,
  contextWindow: [],
}));
```

**3. Cross-Feature Communication**
```typescript
// Event-driven communication between features
const useGlobalEvents = create<EventStore>((set, get) => ({
  events: [],
  emit: (event: AppEvent) => {
    // Broadcast to all subscribed features
    set((state) => ({ events: [...state.events, event] }));
  },
  subscribe: (callback: (event: AppEvent) => void) => {
    // Subscribe to global events
  },
}));
```

#### Implementation Guidelines

**When to Use TanStack Query:**
- API calls (Google Places, weather data, insurance rates)
- Location services
- Blockchain interactions
- Any server-side data that needs caching

**When to Use Zustand:**
- UI state (modals, form inputs, selections)
- App preferences and settings
- Local feature state that doesn't need persistence
- Cross-component communication within a feature

**Context Preservation Rules:**
1. **Always persist user preferences** using Zustand + AsyncStorage
2. **Keep conversation history** for AI context continuity
3. **Cache location history** for better user experience
4. **Store frequent actions** to predict user intent
5. **Maintain session state** across app restarts

### Solana Integration Patterns

#### Wallet Connection Flow
1. User initiates connection through UI
2. `useMobileWallet.connect()` triggers Mobile Wallet Adapter
3. `useAuthorization` manages account state and persistence
4. Authorization cached in AsyncStorage

#### Transaction Signing
- Uses `signAndSendTransaction` from `useMobileWallet`
- Automatically handles wallet authorization
- Supports both Transaction and VersionedTransaction types

#### Cluster Management
- Defaults to devnet cluster
- Supports testnet and custom endpoints
- Explorer URLs generated automatically for transactions

### Mobile-Specific Considerations
- **Android-only functionality** - Mobile Wallet Adapter only works on Android
- **Polyfills required** - Crypto and Buffer polyfills in `src/polyfills.ts`
- **EAS Build required** - Cannot use Expo Go, must use development build
- **Metro configuration** - Custom metro config for React Native compatibility

### Development Workflow
1. Use `yarn start` to start development server
2. Use `--tunnel` flag if connection issues occur
3. Ensure Android device/emulator has MWA-compatible wallet installed
4. Use EAS Build for testing on physical devices

## Project Context

This is a **GPS-based AI agent insurance DApp** for Solana Mobile that provides location-aware micro-insurance products. The app focuses on:

- **Location-based insurance** - Travel, festival, and activity insurance triggered by GPS
- **AI agent interaction** - Natural language insurance creation and management
- **Geofencing automation** - Automatic insurance activation based on location
- **Mobile-first design** - Optimized for Android mobile wallet integration

The current implementation serves as a foundation template with Solana Mobile Wallet Adapter integration, React Navigation, and Material Design components ready for building the GPS-based insurance features.

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md
