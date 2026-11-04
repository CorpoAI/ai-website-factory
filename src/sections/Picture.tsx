'use client'

import { useState } from 'react'
import type { ImageRef } from '@/engine/types'

/**
 * Image with a designed fallback (also used when a remote photo fails to load).
 * Demos start with stock photos; swap `src` for the prospect's own photos.
 */
export function Picture({
  image,
  className = '',
  label,
  priority,
  sizes = 1600,
}: {
  image?: ImageRef
  className?: string
  label?: string
  priority?: boolean
  /** Requested width for CDN-resizable sources */
  sizes?: number
}) {
  const [failed, setFailed] = useState(false)
  const src = image?.src ? resize(image.src, sizes) : undefined

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={image?.alt ?? ''}
        className={`h-full w-full object-cover ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    )
  }
  const text = label ?? image?.alt
  return (
    <div className={`relative flex h-full w-full items-end bg-ink/90 ${className}`} role="img" aria-label={text ?? ''}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,rgb(var(--c-brand)/0.45),transparent_60%)]" />
      {text && <span className="relative m-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{text}</span>}
    </div>
  )
}

/** Unsplash & similar CDNs accept ?w= — request a sensible size instead of the original. */
function resize(src: string, w: number) {
  if (src.includes('images.unsplash.com')) {
    const url = new URL(src)
    url.searchParams.set('w', String(w))
    url.searchParams.set('q', url.searchParams.get('q') ?? '75')
    url.searchParams.set('auto', 'format')
    url.searchParams.set('fit', 'crop')
    return url.toString()
  }
  return src
}
