import React, { createContext, useContext, ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { CyberpunkTheme, CyberpunkTheme as CyberpunkThemeType } from './cyberpunk-theme';

interface CyberpunkThemeContextType {
  theme: CyberpunkThemeType;
  colors: typeof CyberpunkTheme.cyberpunk.colors;
  typography: typeof CyberpunkTheme.cyberpunk.typography;
  spacing: typeof CyberpunkTheme.cyberpunk.spacing;
}

const CyberpunkThemeContext = createContext<CyberpunkThemeContextType | undefined>(undefined);

interface CyberpunkThemeProviderProps {
  children: ReactNode;
}

export const CyberpunkThemeProvider: React.FC<CyberpunkThemeProviderProps> = ({ children }) => {
  const contextValue: CyberpunkThemeContextType = {
    theme: CyberpunkTheme,
    colors: CyberpunkTheme.cyberpunk.colors,
    typography: CyberpunkTheme.cyberpunk.typography,
    spacing: CyberpunkTheme.cyberpunk.spacing,
  };

  return (
    <CyberpunkThemeContext.Provider value={contextValue}>
      <PaperProvider theme={CyberpunkTheme}>
        <StatusBar style="light" backgroundColor={CyberpunkTheme.colors.background} />
        {children}
      </PaperProvider>
    </CyberpunkThemeContext.Provider>
  );
};

// Custom hook to use cyberpunk theme
export const useCyberpunkTheme = (): CyberpunkThemeContextType => {
  const context = useContext(CyberpunkThemeContext);
  if (!context) {
    throw new Error('useCyberpunkTheme must be used within a CyberpunkThemeProvider');
  }
  return context;
};

// Individual hooks for specific parts of the theme
export const useCyberpunkColors = () => {
  const { colors } = useCyberpunkTheme();
  return colors;
};

export const useCyberpunkTypography = () => {
  const { typography } = useCyberpunkTheme();
  return typography;
};

export const useCyberpunkSpacing = () => {
  const { spacing } = useCyberpunkTheme();
  return spacing;
};

export default CyberpunkThemeProvider;