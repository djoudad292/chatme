'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { apiFetch } from '@/lib/api'
import Sidebar from '@/components/sidebar'
import MobileSidebar from '@/components/mobile-sidebar'
import { useToast } from '@/components/toast'
import { Menu, Loader2, Copy, Check } from 'lucide-react'

interface CompanySettings {
  id?: string
  name?: string
  settings?: Record<string, any>
}

export default function SettingsPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()
  const router = useRouter()
  const { addToast } = useToast()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [company, setCompany] = useState<CompanySettings | null>(null)
  const [settingsJson, setSettingsJson] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/login')
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated && user?.companyId) {
      apiFetch('/companies/profile')
        .then((data) => {
          setCompany(data)
          setSettingsJson(JSON.stringify(data.settings || {}, null, 2))
        })
        .catch(() => addToast('Failed to load company settings', 'error'))
        .finally(() => setLoading(false))
    }
  }, [isAuthenticated, user?.companyId, addToast])

  const saveSettings = async () => {
    setSaving(true)
    try {
      let parsed: Record<string, any> = {}
      try {
        parsed = JSON.parse(settingsJson)
      } catch {
        addToast('Invalid JSON in settings', 'error')
        setSaving(false)
        return
      }
      await apiFetch('/companies/settings', {
        method: 'PATCH',
        body: JSON.stringify({ settings: parsed }),
      })
      addToast('Settings saved successfully', 'success')
    } catch (err: any) {
      addToast(err.message || 'Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  const embedCode = user?.companyId
    ? `<script src="${process.env.NEXT_PUBLIC_WIDGET_URL || 'http://localhost:4000'}/widget.js" data-company-id="${user.companyId}"></script>`
    : ''

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    addToast('Embed code copied to clipboard', 'success')
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 md:ml-64">
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-1.5 text-center text-[10px] text-amber-400">
          Demo &middot; In-memory &middot; Built by{' '}
          <a href="https://djaouad.tech" target="_blank" rel="noopener noreferrer" className="font-semibold underline">djaouad frih</a>
        </div>
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-4">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        </header>

        <div className="p-6 space-y-6 max-w-3xl">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold text-foreground mb-1">Company</h2>
                <p className="text-sm text-muted-foreground">{company?.name || 'Your Company'}</p>
                <p className="text-xs text-muted-foreground mt-0.5">ID: {user?.companyId}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold text-foreground mb-3">Company Settings</h2>
                <textarea
                  value={settingsJson}
                  onChange={(e) => setSettingsJson(e.target.value)}
                  rows={10}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
                <button
                  onClick={saveSettings}
                  disabled={saving}
                  className="mt-3 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Save Settings'}
                </button>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold text-foreground mb-1">Widget Embed Code</h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Add this script to your website to enable the chat widget.
                </p>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-xl border border-border bg-secondary p-4 text-xs font-mono text-foreground">
                    {embedCode || 'Loading...'}
                  </pre>
                  <button
                    onClick={copyEmbed}
                    disabled={!embedCode}
                    className="absolute right-2 top-2 rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
