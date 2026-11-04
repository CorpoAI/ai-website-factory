import type { ThemeConfig, ThemePreset } from './types'

/**
 * Theme = a set of CSS custom properties. Tailwind maps its `brand`, `ink`,
 * `bg` … colors to these variables (see tailwind.config.js), so every section
 * component works in every theme — including dark ones — without changes.
 */
interface ThemeTokens {
  bg: string
  bgAlt: string
  card: string
  ink: string
  inkMuted: string
  line: string
  brand: string
  brandInk: string
  accent: string
  radius: string
  fontDisplay: string
  fontBody: string
  /** Google Fonts families to load */
  fonts: string[]
}

export const PRESETS: Record<ThemePreset, ThemeTokens> = {
  // Construction: strong, practical — dark graphite + safety amber
  industrial: {
    bg: '#fafaf9',
    bgAlt: '#f0eeeb',
    card: '#ffffff',
    ink: '#1c1917',
    inkMuted: '#57534e',
    line: '#e7e5e4',
    brand: '#f59e0b',
    brandInk: '#1c1917',
    accent: '#292524',
    radius: '4px',
    fontDisplay: '"Archivo", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
    fonts: ['Archivo:wght@500;700;800', 'Inter:wght@400;500;600'],
  },
  // Construction: developer / modern houses — navy + warm orange
  'modern-build': {
    bg: '#ffffff',
    bgAlt: '#f1f5f9',
    card: '#ffffff',
    ink: '#0f172a',
    inkMuted: '#475569',
    line: '#e2e8f0',
    brand: '#1e40af',
    brandInk: '#ffffff',
    accent: '#ea580c',
    radius: '14px',
    fontDisplay: '"Manrope", system-ui, sans-serif',
    fontBody: '"Manrope", system-ui, sans-serif',
    fonts: ['Manrope:wght@400;500;600;700;800'],
  },
  // Restaurant: casual bistro / trattoria — cream + terracotta
  bistro: {
    bg: '#fdf8f1',
    bgAlt: '#f6ecdf',
    card: '#fffdf9',
    ink: '#2b1d14',
    inkMuted: '#6b5545',
    line: '#ead9c6',
    brand: '#b4441c',
    brandInk: '#ffffff',
    accent: '#3f5b3a',
    radius: '18px',
    fontDisplay: '"Fraunces", Georgia, serif',
    fontBody: '"Inter", system-ui, sans-serif',
    fonts: ['Fraunces:opsz,wght@9..144,500;9..144,700', 'Inter:wght@400;500;600'],
  },
  // Restaurant: fine dining / steakhouse — dark + gold
  'fine-dining': {
    bg: '#0f0d0b',
    bgAlt: '#18140f',
    card: '#1d1813',
    ink: '#f3ede4',
    inkMuted: '#b3a796',
    line: '#2f281f',
    brand: '#c8a96a',
    brandInk: '#0f0d0b',
    accent: '#7a2e2e',
    radius: '2px',
    fontDisplay: '"Cormorant Garamond", Georgia, serif',
    fontBody: '"Lato", system-ui, sans-serif',
    fonts: ['Cormorant+Garamond:wght@500;600;700', 'Lato:wght@400;700'],
  },
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

/** Pick black or white text for a given background color. */
function readableOn(hex: string): string {
  const [r, g, b] = hexToRgb(hex).split(' ').map(Number)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#111111' : '#ffffff'
}

export function resolveTheme(theme: ThemeConfig) {
  const base = PRESETS[theme.preset]
  const brand = theme.primary ?? base.brand
  const tokens: ThemeTokens = {
    ...base,
    brand,
    brandInk: theme.primary ? readableOn(theme.primary) : base.brandInk,
    accent: theme.accent ?? base.accent,
  }
  const style: Record<string, string> = {
    '--c-bg': hexToRgb(tokens.bg),
    '--c-bg-alt': hexToRgb(tokens.bgAlt),
    '--c-card': hexToRgb(tokens.card),
    '--c-ink': hexToRgb(tokens.ink),
    '--c-ink-muted': hexToRgb(tokens.inkMuted),
    '--c-line': hexToRgb(tokens.line),
    '--c-brand': hexToRgb(tokens.brand),
    '--c-brand-ink': hexToRgb(tokens.brandInk),
    '--c-accent': hexToRgb(tokens.accent),
    '--radius': tokens.radius,
    '--font-display': tokens.fontDisplay,
    '--font-body': tokens.fontBody,
  }
  const fontsHref = `https://fonts.googleapis.com/css2?${tokens.fonts
    .map((f) => `family=${f}`)
    .join('&')}&display=swap`
  return { style, fontsHref }
}
