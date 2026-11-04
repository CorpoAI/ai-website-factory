import type { ThemeConfig, ThemePreset } from './types'

/**
 * Theme = a set of CSS custom properties. Tailwind maps its `brand`, `ink`,
 * `bg` … colors to these variables (see tailwind.config.js), so every section
 * works in every theme — including dark ones — without changes.
 *
 * Each preset is a deliberate art direction, not a color swap:
 * typography (family, weight, case, tracking) carries most of the character.
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
  /** Section with inverted colors (dark band) */
  inverse: string
  inverseInk: string
  radius: string
  fontDisplay: string
  fontBody: string
  displayWeight: string
  displayCase: 'uppercase' | 'none'
  displayTracking: string
  displayLeading: string
  /** How *emphasis* in titles renders: italic for serifs, upright for condensed caps */
  emStyle: 'italic' | 'normal'
  /** Lift dark brand colors when *emphasis* sits on a dark hero photo */
  heroEmFilter: string
}

export const PRESETS: Record<ThemePreset, ThemeTokens> = {
  // Construction — signage & site-hoarding: condensed caps, concrete paper, signal yellow
  industrial: {
    bg: '#f1efe9',
    bgAlt: '#e7e4dc',
    card: '#faf9f6',
    ink: '#121212',
    inkMuted: '#55524c',
    line: '#cfcac0',
    brand: '#f2b705',
    brandInk: '#121212',
    accent: '#1b1b1b',
    inverse: '#141414',
    inverseInk: '#f1efe9',
    radius: '0px',
    fontDisplay: '"Big Shoulders Display", "Arial Narrow", sans-serif',
    fontBody: '"IBM Plex Sans", system-ui, sans-serif',
    displayWeight: '800',
    displayCase: 'uppercase',
    displayTracking: '-0.01em',
    displayLeading: '0.9',
    emStyle: 'normal',
    heroEmFilter: 'none',
  },
  // Construction / interiors — architecture-studio editorial: serif display, quiet neutrals
  'modern-build': {
    bg: '#f6f4ef',
    bgAlt: '#ece8df',
    card: '#fcfbf8',
    ink: '#1a1a17',
    inkMuted: '#5d5b54',
    line: '#d9d4c8',
    brand: '#2f5d50',
    brandInk: '#ffffff',
    accent: '#1f2a26',
    inverse: '#1c211f',
    inverseInk: '#f6f4ef',
    radius: '2px',
    fontDisplay: '"Instrument Serif", Georgia, serif',
    fontBody: '"Instrument Sans", system-ui, sans-serif',
    displayWeight: '400',
    displayCase: 'none',
    displayTracking: '-0.015em',
    displayLeading: '0.98',
    emStyle: 'italic',
    heroEmFilter: 'brightness(1.7) saturate(1.1)',
  },
  // Restaurant — trattoria / bistro: warm paper, high-contrast serif, terracotta + olive
  bistro: {
    bg: '#f3ebdd',
    bgAlt: '#eadfcb',
    card: '#f8f2e7',
    ink: '#271812',
    inkMuted: '#6c5547',
    line: '#d8c7ad',
    brand: '#a8401f',
    brandInk: '#fbf6ee',
    accent: '#34482c',
    inverse: '#2a1b13',
    inverseInk: '#f3ebdd',
    radius: '2px',
    fontDisplay: '"Gloock", Georgia, serif',
    fontBody: '"Hanken Grotesk", system-ui, sans-serif',
    displayWeight: '400',
    displayCase: 'none',
    displayTracking: '-0.02em',
    displayLeading: '0.95',
    emStyle: 'italic',
    heroEmFilter: 'brightness(1.55) saturate(1.15)',
  },
  // Restaurant — fine dining / steakhouse: near-black, brass, classic Garamond
  'fine-dining': {
    bg: '#0e0c0a',
    bgAlt: '#16130f',
    card: '#1b1713',
    ink: '#eee6d8',
    inkMuted: '#a59a88',
    line: '#2e2820',
    brand: '#c9a45c',
    brandInk: '#0e0c0a',
    accent: '#7d2a22',
    inverse: '#eee6d8',
    inverseInk: '#0e0c0a',
    radius: '0px',
    fontDisplay: '"Cormorant Garamond", Georgia, serif',
    fontBody: '"Jost", system-ui, sans-serif',
    displayWeight: '500',
    displayCase: 'none',
    displayTracking: '-0.01em',
    displayLeading: '0.95',
    emStyle: 'italic',
    heroEmFilter: 'none',
  },
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

/** Pick near-black or white text for a given background color. */
function readableOn(hex: string): string {
  const [r, g, b] = hexToRgb(hex).split(' ').map(Number)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#111111' : '#ffffff'
}

export function resolveTheme(theme: ThemeConfig) {
  const base = PRESETS[theme.preset]
  const t: ThemeTokens = {
    ...base,
    brand: theme.primary ?? base.brand,
    brandInk: theme.primary ? readableOn(theme.primary) : base.brandInk,
    accent: theme.accent ?? base.accent,
  }
  const style: Record<string, string> = {
    '--c-bg': hexToRgb(t.bg),
    '--c-bg-alt': hexToRgb(t.bgAlt),
    '--c-card': hexToRgb(t.card),
    '--c-ink': hexToRgb(t.ink),
    '--c-ink-muted': hexToRgb(t.inkMuted),
    '--c-line': hexToRgb(t.line),
    '--c-brand': hexToRgb(t.brand),
    '--c-brand-ink': hexToRgb(t.brandInk),
    '--c-accent': hexToRgb(t.accent),
    '--c-inverse': hexToRgb(t.inverse),
    '--c-inverse-ink': hexToRgb(t.inverseInk),
    '--radius': t.radius,
    '--font-display': t.fontDisplay,
    '--font-body': t.fontBody,
    '--display-weight': t.displayWeight,
    '--display-case': t.displayCase,
    '--display-tracking': t.displayTracking,
    '--display-leading': t.displayLeading,
    '--em-style': t.emStyle,
    '--hero-em-filter': t.heroEmFilter,
  }
  return { style }
}
