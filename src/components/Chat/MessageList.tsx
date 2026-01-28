import { useRef, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

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
      {messages.map((message) => {
        const isUser = message.sender === 'user'
        return (
          <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-3xl p-6 md:p-8 text-base font-medium relative ${
                isUser
                  ? 'bg-bio-deep text-bio-white dark:bg-bio-white dark:text-bio-deep ml-4 sm:ml-12'
                  : 'bg-white dark:bg-bio-deep/80 border border-bio-deep/10 dark:border-bio-white/10 text-bio-deep dark:text-bio-white mr-4 sm:mr-12'
              }`}
            >
              <div className="absolute -top-3 left-6 px-2 bg-inherit">
                <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${isUser ? 'text-bio-lime' : 'text-bio-deep dark:text-bio-white'}`}>
                  {isUser ? t('chat.body.userInput') : t('chat.body.systemResponse')}
                </span>
              </div>
              
              <ReactMarkdown className={`prose max-w-none ${isUser ? 'prose-invert' : 'dark:prose-invert prose-headings:font-mono prose-headings:uppercase'}`}>
                {message.text}
              </ReactMarkdown>

              {!isUser && (
                <div className="mt-6 pt-4 border-t-2 border-bio-deep/10 dark:border-bio-white/10 flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => onDeepDive(area)}
                      className="px-3 py-1 bg-bio-purple/10 hover:bg-bio-purple text-bio-deep dark:text-bio-white text-[10px] font-bold uppercase tracking-widest transition-colors font-mono"
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
      
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
