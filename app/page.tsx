'use client'

import Link from 'next/link'
import { MessageSquare, Bot, Zap, BookOpen, Users, BarChart3, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import ChatWidgetPreview from '@/components/chat-widget-preview'

const features = [
  {
    icon: Bot,
    title: 'Multi-Tenant',
    description: 'Manage multiple companies and teams from a single dashboard with isolated data and configurations.',
  },
  {
    icon: Zap,
    title: 'AI-Powered',
    description: 'Intelligent chatbots that understand context and provide accurate responses to customer inquiries.',
  },
  {
    icon: MessageSquare,
    title: 'Real-Time Chat',
    description: 'Instant messaging with live typing indicators and WebSocket-powered real-time communication.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    description: 'Centralized knowledge management that AI references to provide accurate, consistent answers.',
  },
  {
    icon: Users,
    title: 'Human Handoff',
    description: 'Seamless escalation to human agents when AI encounters complex or sensitive issues.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Detailed insights into conversation volumes, AI performance, and team productivity.',
  },
]

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <MessageSquare className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">AI Support</span>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">DEMO</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="animate-fade-in-up text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              AI Customer Support
              <br />
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Platform
              </span>
            </h1>
            <p className="animate-fade-in-up-delay-1 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              A multi-tenant AI customer support platform with intelligent chatbots, real-time messaging,
              smart knowledge base management, and seamless human handoff.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Demo by{' '}
              <a href="https://djaouad.tech" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">djaouad.tech</a>
              {' '}&mdash; Built by{' '}
              <a href="https://djaouad.tech" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">djaouad frih</a>
            </p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              No database required &middot; Fully in-memory demo &middot; No data persists
            </p>
            <div className="animate-fade-in-up-delay-2 mt-10 flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <button
                onClick={() => {
                  setShowDemo(true)
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="rounded-xl border border-border px-8 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                Live Demo
              </button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="animate-fade-in-up text-center text-3xl font-bold text-foreground">
              Everything you need to scale support
            </h2>
            <p className="animate-fade-in-up-delay-1 mx-auto mt-4 max-w-xl text-center text-muted-foreground">
              Powerful features designed to help you deliver exceptional customer support at scale.
            </p>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className={`animate-fade-in-up-delay-${Math.min(i + 1, 3)} group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5`}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {showDemo && (
          <section id="demo" className="py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">
              <h2 className="text-3xl font-bold text-foreground">Live Demo</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Try the chat widget below. This is a live preview connected to the AI backend.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AI Support Platform &mdash; Demo by{' '}
          <a href="https://djaouad.tech" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">djaouad.tech</a>
          {' '}&mdash; Developer{' '}
          <a href="https://djaouad.tech" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">djaouad frih</a>
        </div>
      </footer>

      {showDemo && <ChatWidgetPreview />}
    </div>
  )
}
