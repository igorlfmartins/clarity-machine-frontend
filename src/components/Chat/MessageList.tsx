import { useRef, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MessageItem } from './MessageItem'

type Message = {
  id: string
  text: string
  sender: 'user' | 'ai'
}

type FocusArea = {
  id: string
  label: string
}

type MessageListProps = {
  messages: Message[]
  isLoading: boolean
  error: string | null
  focusAreas: FocusArea[]
  onDeepDive: (area: FocusArea) => void
}

export function MessageList({ messages, isLoading, error, focusAreas, onDeepDive }: MessageListProps) {
  const { t } = useTranslation()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!messagesEndRef.current) return
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length])

  if (messages.length === 0 && !isLoading) {
    return null
  }

  return (
    <>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          focusAreas={message.sender === 'ai' ? focusAreas : undefined}
          onDeepDive={message.sender === 'ai' ? onDeepDive : undefined}
        />
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-bio-lime p-4 flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-bio-deep" />
            <span className="text-xs font-bold uppercase tracking-widest text-bio-deep font-mono">{t('chat.body.processing')}</span>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-500 font-mono mt-4">{error}</p>}
      <div ref={messagesEndRef} />
    </>
  )
}
