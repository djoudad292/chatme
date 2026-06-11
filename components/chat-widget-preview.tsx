'use client'

import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { getSocketUrl } from '@/lib/api'
import { MessageSquare, X, Send, Loader2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  senderType: 'user' | 'ai' | 'agent' | 'system'
  createdAt: string
}

export default function ChatWidgetPreview() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!open) return

    const s = io(getSocketUrl(), {
      transports: ['websocket', 'polling'],
    })

    s.on('connect', () => {
      setConnected(true)
      s.emit('start conversation', {
        userId: 'preview-user',
        userEmail: 'preview@demo.com',
        userName: 'Preview User',
      })
    })

    s.on('conversation created', (data: { conversationId: string }) => {
      setConversationId(data.conversationId)
      setMessages((prev) => [
        ...prev,
        {
          id: 'system-welcome',
          content: 'Welcome! This is a live preview of your chat widget. Type a message to test the AI.',
          senderType: 'system',
          createdAt: new Date().toISOString(),
        },
      ])
    })

    s.on('message', (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    })

    s.on('disconnect', () => {
      setConnected(false)
    })

    setSocket(s)

    return () => {
      s.disconnect()
      setSocket(null)
      setConnected(false)
      setConversationId(null)
    }
  }, [open])

  const sendMessage = () => {
    if (!input.trim() || !socket || !conversationId) return

    const msg = {
      content: input.trim(),
      senderType: 'user' as const,
    }

    socket.emit('send message', {
      conversationId,
      message: msg,
    })

    setMessages((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        content: input.trim(),
        senderType: 'user',
        createdAt: new Date().toISOString(),
      },
    ])

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 animate-pulse-glow"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      ) : (
        <div className="flex h-[500px] w-[380px] flex-col rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl border-b border-border bg-secondary px-4 py-3">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium text-foreground">Live Preview</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.senderType === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : msg.senderType === 'system'
                        ? 'bg-muted text-muted-foreground italic text-xs text-center w-full max-w-full rounded-md'
                        : 'bg-secondary text-foreground rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={!connected}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || !connected}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
