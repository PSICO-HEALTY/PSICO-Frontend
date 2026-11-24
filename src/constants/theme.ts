/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#f8fafc',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#0000009a',

    // Tarjetas flotantes (ej. "+500 profesionales")
    surface: '#f6f4f3',
    // Líneas divisorias suaves (borde del navbar, tarjetas, imagen)
    border: '#e8eef4',
    // Bordes que deben notarse más (botón outline)
    borderStrong: '#0000003d',
    // Color de marca: botones principales, checks e íconos
    accent: '#0090ff',
    // Fondo suave del badge "Psico Health · Cultiva tu bienestar"
    accentSoft: '#e5f3ff',
    // Texto e ícono del badge, legible sobre accentSoft
    accentSoftText: '#0067b8',
    // Fondo del recuadro de la imagen del hero
    heroImage: '#F6F3F2',
    // Color del brillo al pasar el mouse sobre los links del navbar
    linkGlow: '#0090ff',
  },
  dark: {
    text: '#ffffff',
    background: '#1b1b1b',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#ffffffde',

    // Mismos tokens que en light, con valores para fondo oscuro
    surface: '#242424',
    border: '#ffffff00',
    borderStrong: '#ffffff40',
    accent: '#0090ff',
    accentSoft: '#00264d',
    accentSoftText: '#66b8ff',
    heroImage: '#242424',
    linkGlow: '#ffffff',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

// Ancho máximo del contenido (navbar y hero) para que no se estire en pantallas grandes
export const MaxContentWidth = 1200;

// Anchos (px) donde cambia el layout: desde `tablet` se muestran los links del navbar y el hero va en 2 columnas;
// desde `desktop` las tarjetas de "¿Qué necesitas hoy?" pasan de 2 a 4 columnas
export const Breakpoints = {
  tablet: 768,
  desktop: 1024,
} as const;
