
export const EMOJI_THEMES = {
  faces: {
    excellent: '😍',
    good: '😊',
    ok: '😐',
    warning: '😟',
    critical: '😱'
  },
  traffic: {
    excellent: '🟢',
    good: '🟢',
    ok: '🟡',
    warning: '🟠',
    critical: '🔴'
  },
  weather: {
    excellent: '☀️',
    good: '⛅',
    ok: '☁️',
    warning: '🌧️',
    critical: '⛈️'
  },
  battery: {
    excellent: '🔋',
    good: '🔋',
    ok: '🪫',
    warning: '🪫',
    critical: '⚠️'
  },
  thumbs: {
    excellent: '👍',
    good: '👍',
    ok: '👌',
    warning: '👎',
    critical: '👎'
  },
  hearts: {
    excellent: '💚',
    good: '💙',
    ok: '💛',
    warning: '🧡',
    critical: '❤️'
  }
};

export type EmojiTheme = keyof typeof EMOJI_THEMES;
export type EmojiLevel = keyof typeof EMOJI_THEMES.faces;