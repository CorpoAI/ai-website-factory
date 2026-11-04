import type { Industry, PlacedSection, Section, SiteConfig, SiteInput, ThemePreset } from './types'
import { constructionDefaults } from './industries/construction'
import { drivingSchoolDefaults } from './industries/driving-school'
import { funeralDefaults } from './industries/funeral'
import { restaurantDefaults } from './industries/restaurant'

const DEFAULT_PRESET: Record<Industry, ThemePreset> = {
  construction: 'industrial',
  restaurant: 'bistro',
  'driving-school': 'road',
  funeral: 'serene',
}

const TEMPLATES: Record<Industry, typeof constructionDefaults> = {
  construction: constructionDefaults,
  restaurant: restaurantDefaults,
  'driving-school': drivingSchoolDefaults,
  funeral: funeralDefaults,
}

/**
 * Build a full SiteConfig from a (usually small) input:
 *   1. take the industry's default sections (filled with business data),
 *   2. or the author's own `sections` list if given,
 *   3. drop `hide`, shallow-merge `overrides` per section type.
 */
export function defineSite(input: SiteInput): SiteConfig {
  const { overrides, hide, sections, theme, ...rest } = input
  const base: PlacedSection[] = sections ?? TEMPLATES[input.industry](input.business)

  const merged = base
    .filter((s) => !hide?.includes(s.type))
    .map((s) => {
      const patch = overrides?.[s.type] as Partial<Section> | undefined
      return (patch ? { ...s, ...patch } : s) as PlacedSection
    })

  return {
    ...rest,
    theme: { preset: DEFAULT_PRESET[input.industry], ...theme },
    sections: merged,
  }
}
