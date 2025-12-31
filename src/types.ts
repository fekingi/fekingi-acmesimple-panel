
import { EmojiTheme } from './constants';

export interface SimpleOptions {
  theme: EmojiTheme;
  useCustomEmojis: boolean;
  
  excellentEmoji: string;
  goodEmoji: string;
  okEmoji: string;
  warningEmoji: string;
  criticalEmoji: string;
  
  excellentThreshold: number;
  goodThreshold: number;
  okThreshold: number;
  warningThreshold: number;
  
  displayMode: 'single' | 'grid' | 'list';
  emojiSize: number;
  fontSize: number;
  decimals: number;
  
  showValue: boolean;
  showLabel: boolean;
  showTrend: boolean;
  showHistory: boolean;
  showStatistics: boolean;
  showComparison: boolean;
  
  label: string;
  
  textColor: string;
  backgroundColor: string;
  
  enableAnimation: boolean;
  pulseOnCritical: boolean;
  
  higherIsBetter: boolean;
  
  comparisonMode: 'target' | 'previous';
  targetValue: number;
  
  showAlertOnCritical: boolean;
  alertMessage: string;
  
  enableDrilldown: boolean;
}