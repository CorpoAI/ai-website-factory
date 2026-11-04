'use client'

import { useState } from 'react'

export type LeadKind = 'contact' | 'quote' | 'reservation' | 'enrollment'
type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Shared submit logic for every lead-generating section (contact, quote, reservation). */
export function useLead(site: string, kind: LeadKind) {
  const [status, setStatus] = useState<Status>('idle')

  async function submit(form: HTMLFormElement, extra: Record<string, unknown> = {}) {
    setStatus('sending')
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site, kind, data: { ...data, ...extra } }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return { status, submit }
}
