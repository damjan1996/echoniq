/**
 * Theme configuration for echoniq Label website
 * This file defines colors, typography, spacing, and other visual elements
 */

// Color palette
export const colors = {
  // Primary brand colors
  primary: {
    50: '#f3f3f3',
    100: '#e7e7e7',
    200: '#c4c4c4',
    300: '#a0a0a0',
    400: '#5c5c5c',
    500: '#171717', // Main primary color
    600: '#151515',
    700: '#121212',
    800: '#0e0e0e',
    900: '#0b0b0b',
    950: '#070707',
  },

  // Secondary brand colors - using a dark gray for contrast
  secondary: {
    50: '#f5f5f5',
    100: '#ebebeb',
    200: '#cccccc',
    300: '#adadad',
    400: '#707070',
    500: '#333333', // Main secondary color
    600: '#2e2e2e',
    700: '#262626',
    800: '#1f1f1f',
    900: '#191919',
    950: '#0d0d0d',
  },

  // Accent colors - an orange shade for highlights
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Main accent color
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },

  // Neutral colors for text and backgrounds
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Additional functional colors
  success: '#10b981', // green
  warning: '#f59e0b', // amber
  error: '#ef4444', // red
  info: '#3b82f6', // blue

  // Specific UI component colors
  background: {
    primary: '#121212',
    secondary: '#1a1a1a',
    tertiary: '#222222',
  },
  text: {
    primary: '#ffffff',
    secondary: '#e0e0e0',
    tertiary: '#a0a0a0',
    inverted: '#121212',
  },
  border: {
    light: '#333333',
    medium: '#444444',
    dark: '#555555',
  },
};

// Typography configuration
export const typography = {
  fontFamily: {
    sans: ['Outfit', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Roboto Mono', 'monospace'],
    display: ['Space Grotesk', 'sans-serif'],
  },

  // Font sizes using rem for better accessibility
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem', // 72px
    '8xl': '6rem', // 96px
    '9xl': '8rem', // 128px
  },

  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Spacing and sizing scale
export const spacing = {
  // Base spacing units in pixels (converted to rem in CSS)
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
};

// Border radius values
export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px', // Circular
};

// Box shadows
export const boxShadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  // Custom shadows for music player elements
  player: '0 4px 10px rgba(0, 0, 0, 0.4)',
  card: '0 8px 16px rgba(0, 0, 0, 0.3)',
};

// Z-index scale
export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  // Specific UI elements
  header: '100',
  dropdown: '200',
  modal: '300',
  player: '150',
  toast: '400',
  tooltip: '500',
};

// Transition durations
export const transitionDuration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
};

// Transition timing functions
export const transitionTimingFunction = {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Custom timing functions
  emphasis: 'cubic-bezier(0.19, 1, 0.22, 1)', // Emphasized easing
  bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Bounce effect
};

// Media query breakpoints
export const screens = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Container max widths
export const containers = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  // Custom containers for specific page sections
  content: '1200px',
  slim: '768px',
  wide: '1440px',
};

// Animation configuration
export const animation = {
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    veryFast: '100ms',
    verySlow: '1000ms',
  },
  curves: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    sharp: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
};

// Gradients for UI elements
export const gradients = {
  primary: 'linear-gradient(135deg, #171717 0%, #333333 100%)',
  accent: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  dark: 'linear-gradient(180deg, #121212 0%, #0a0a0a 100%)',
  overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
  playerBackground: 'linear-gradient(180deg, #171717 0%, #0f0f0f 100%)',
};

// Export the entire theme configuration
export default {
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  zIndex,
  transitionDuration,
  transitionTimingFunction,
  screens,
  containers,
  animation,
  gradients,
};
