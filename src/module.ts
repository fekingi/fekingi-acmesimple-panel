import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addRadio({
      path: 'theme',
      name: 'Emoji Theme',
      description: 'Choose a predefined emoji theme',
      defaultValue: 'faces',
      settings: {
        options: [
          { value: 'faces', label: '😊 Faces' },
          { value: 'traffic', label: '🚦 Traffic Lights' },
          { value: 'weather', label: '🌤️ Weather' },
          { value: 'battery', label: '🔋 Battery' },
          { value: 'thumbs', label: '👍 Thumbs' },
          { value: 'hearts', label: '💚 Hearts' },
        ],
      },
      showIf: (config) => !config.useCustomEmojis,
    })
    .addBooleanSwitch({
      path: 'useCustomEmojis',
      name: 'Use Custom Emojis',
      description: 'Override theme with custom emojis',
      defaultValue: false,
    })
    
    .addTextInput({
      path: 'excellentEmoji',
      name: 'Excellent Emoji',
      defaultValue: '😍',
      showIf: (config) => config.useCustomEmojis,
    })
    .addTextInput({
      path: 'goodEmoji',
      name: 'Good Emoji',
      defaultValue: '😊',
      showIf: (config) => config.useCustomEmojis,
    })
    .addTextInput({
      path: 'okEmoji',
      name: 'OK Emoji',
      defaultValue: '😐',
      showIf: (config) => config.useCustomEmojis,
    })
    .addTextInput({
      path: 'warningEmoji',
      name: 'Warning Emoji',
      defaultValue: '😟',
      showIf: (config) => config.useCustomEmojis,
    })
    .addTextInput({
      path: 'criticalEmoji',
      name: 'Critical Emoji',
      defaultValue: '😱',
      showIf: (config) => config.useCustomEmojis,
    })
    
    .addNumberInput({
      path: 'excellentThreshold',
      name: 'Excellent Threshold',
      description: 'Minimum value for excellent status',
      defaultValue: 95,
      settings: {
        min: 0,
        max: 100,
      },
    })
    .addNumberInput({
      path: 'goodThreshold',
      name: 'Good Threshold',
      description: 'Minimum value for good status',
      defaultValue: 80,
      settings: {
        min: 0,
        max: 100,
      },
    })
    .addNumberInput({
      path: 'okThreshold',
      name: 'OK Threshold',
      description: 'Minimum value for ok status',
      defaultValue: 60,
      settings: {
        min: 0,
        max: 100,
      },
    })
    .addNumberInput({
      path: 'warningThreshold',
      name: 'Warning Threshold',
      description: 'Minimum value for warning status',
      defaultValue: 40,
      settings: {
        min: 0,
        max: 100,
      },
    })
    
    .addRadio({
      path: 'displayMode',
      name: 'Display Mode',
      description: 'How to display multiple metrics',
      defaultValue: 'single',
      settings: {
        options: [
          { value: 'single', label: 'Single Metric' },
          { value: 'grid', label: 'Grid Layout' },
          { value: 'list', label: 'List Layout' },
        ],
      },
    })
    .addNumberInput({
      path: 'emojiSize',
      name: 'Emoji Size',
      description: 'Size of the emoji in pixels',
      defaultValue: 100,
      settings: {
        min: 20,
        max: 300,
      },
    })
    .addNumberInput({
      path: 'fontSize',
      name: 'Font Size',
      description: 'Size of the value text',
      defaultValue: 24,
      settings: {
        min: 10,
        max: 100,
      },
    })
    .addNumberInput({
      path: 'decimals',
      name: 'Decimals',
      description: 'Number of decimal places',
      defaultValue: 1,
      settings: {
        min: 0,
        max: 5,
      },
    })
    
    .addBooleanSwitch({
      path: 'showValue',
      name: 'Show Value',
      description: 'Display the numeric value',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'showLabel',
      name: 'Show Label',
      description: 'Display a label',
      defaultValue: true,
    })
    .addTextInput({
      path: 'label',
      name: 'Label',
      description: 'Label text',
      defaultValue: 'Status',
      showIf: (config) => config.showLabel,
    })
    .addBooleanSwitch({
      path: 'showTrend',
      name: 'Show Trend',
      description: 'Display trend indicator',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'higherIsBetter',
      name: 'Higher is Better',
      description: 'Is a higher value considered better?',
      defaultValue: true,
      showIf: (config) => config.showTrend,
    })
    .addBooleanSwitch({
      path: 'showHistory',
      name: 'Show History',
      description: 'Display historical performance bar',
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'showStatistics',
      name: 'Show Statistics',
      description: 'Display min/max/avg statistics',
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'showComparison',
      name: 'Show Comparison',
      description: 'Compare against target or previous value',
      defaultValue: false,
    })
    .addRadio({
      path: 'comparisonMode',
      name: 'Comparison Mode',
      defaultValue: 'target',
      settings: {
        options: [
          { value: 'target', label: 'Compare to Target' },
          { value: 'previous', label: 'Compare to Previous' },
        ],
      },
      showIf: (config) => config.showComparison,
    })
    .addNumberInput({
      path: 'targetValue',
      name: 'Target Value',
      description: 'Target value for comparison',
      defaultValue: 80,
      showIf: (config) => config.showComparison && config.comparisonMode === 'target',
    })
    
    .addColorPicker({
      path: 'textColor',
      name: 'Text Color',
      defaultValue: '#ffffff',
    })
    .addColorPicker({
      path: 'backgroundColor',
      name: 'Background Color',
      defaultValue: 'transparent',
    })
    
    .addBooleanSwitch({
      path: 'enableAnimation',
      name: 'Enable Animation',
      description: 'Animate emoji on change',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'pulseOnCritical',
      name: 'Pulse on Critical',
      description: 'Pulse animation for critical states',
      defaultValue: true,
    })
    
    .addBooleanSwitch({
      path: 'showAlertOnCritical',
      name: 'Show Alert on Critical',
      description: 'Display alert message for critical values',
      defaultValue: false,
    })
    .addTextInput({
      path: 'alertMessage',
      name: 'Alert Message',
      description: 'Message to display on critical',
      defaultValue: '⚠️ Critical Status!',
      showIf: (config) => config.showAlertOnCritical,
    })
    
    .addBooleanSwitch({
      path: 'enableDrilldown',
      name: 'Enable Drilldown',
      description: 'Click to show detailed statistics',
      defaultValue: false,
    });
});