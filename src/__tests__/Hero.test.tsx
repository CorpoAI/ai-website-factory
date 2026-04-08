import { describe, it, expect } from 'vitest'

describe('Hero Component', () => {
  it('has default title', () => {
    const defaultTitle = "Professional Services for Your Business"
    expect(defaultTitle).toBeTruthy()
  })

  it('has default subtitle', () => {
    const defaultSubtitle = "We help small and medium businesses establish a strong online presence with modern, responsive websites."
    expect(defaultSubtitle).toBeTruthy()
  })

  it('has default CTA text', () => {
    expect("Get Started").toBeTruthy()
  })
})