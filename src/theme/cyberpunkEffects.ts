import { ViewStyle, TextStyle } from 'react-native';
import { CyberpunkColors } from './cyberpunkTheme';

export const cyberpunkEffects = {
  neonGlow: (color: string): ViewStyle => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  }),

  cardGlow: (): ViewStyle => ({
    shadowColor: CyberpunkColors.neonBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: `${CyberpunkColors.neonBlue}40`,
  }),

  textGlow: (color: string = CyberpunkColors.textGlow): TextStyle => ({
    textShadowColor: color,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  }),

  holographicCard: (): ViewStyle => ({
    backgroundColor: `${CyberpunkColors.darkCard}CC`,
    borderWidth: 1,
    borderColor: `${CyberpunkColors.neonBlue}60`,
    shadowColor: CyberpunkColors.glowBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 12,
  }),

  glowingButton: (color: string): ViewStyle => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: `${color}80`,
  }),

  matrixText: (): TextStyle => ({
    textShadowColor: CyberpunkColors.matrixGreen,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    fontWeight: '600',
  }),
};
