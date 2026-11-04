import { NextResponse } from 'next/server'
import { getSite } from '@/sites'

/**
 * Lead intake for every site (contact form, quote calculator, reservations).
 *
 * Delivery: if LEAD_WEBHOOK_URL is set, the lead is POSTed there as JSON
 * (Make/Zapier/n8n/Slack/CRM). Otherwise it is only logged — fine for demos.
 */
const KINDS = new Set(['contact', 'quote', 'reservation', 'enrollment'])

export async function POST(req: Request) {
  let body: { site?: string; kind?: string; data?: Record<string, unknown> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const site = body.site ? getSite(body.site) : undefined
  if (!site || !body.kind || !KINDS.has(body.kind) || typeof body.data !== 'object' || !body.data) {
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 })
  }

  const data = body.data
  // Honeypot: bots fill hidden "website" field. Pretend success.
  if (data.website) return NextResponse.json({ ok: true })

  const name = String(data.name ?? '').trim()
  const phone = String(data.phone ?? '').trim()
  if (name.length < 2 || phone.replace(/\D/g, '').length < 7) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 })
  }

  // Keep only short string values; drop honeypot.
  const clean = Object.fromEntries(
    Object.entries(data)
      .filter(([k]) => k !== 'website')
      .map(([k, v]) => [k.slice(0, 40), String(v).slice(0, 2000)]),
  )

  const lead = {
    site: site.slug,
    business: site.business.name,
    isDemo: Boolean(site.demo?.isDemo),
    kind: body.kind,
    data: clean,
    receivedAt: new Date().toISOString(),
  }

  const webhook = process.env.LEAD_WEBHOOK_URL
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
      if (!res.ok) throw new Error(`webhook ${res.status}`)
    } catch (err) {
      console.error('[lead] webhook failed', err)
      return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 })
    }
  } else {
    console.log('[lead]', JSON.stringify(lead))
  }

  return NextResponse.json({ ok: true })
}
