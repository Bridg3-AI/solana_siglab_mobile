import React, { createContext, useContext } from 'react';
import { SeekerTheme, SeekerThemeType } from './theme';

interface SeekerThemeContextType {
  theme: SeekerThemeType;
}

const SeekerThemeContext = createContext<SeekerThemeContextType | undefined>(undefined);

export interface SeekerThemeProviderProps {
  children: React.ReactNode;
  theme?: SeekerThemeType;
}

export const SeekerThemeProvider: React.FC<SeekerThemeProviderProps> = ({
  children,
  theme = SeekerTheme,
}) => {
  return (
    <SeekerThemeContext.Provider value={{ theme }}>
      {children}
    </SeekerThemeContext.Provider>
  );
};

export const useSeekerTheme = (): SeekerThemeContextType => {
  const context = useContext(SeekerThemeContext);
  if (!context) {
    throw new Error('useSeekerTheme must be used within a SeekerThemeProvider');
  }
  return context;
};