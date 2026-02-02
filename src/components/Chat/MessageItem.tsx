import { memo } from 'react'
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

type MessageItemProps = {
  message: Message
  focusAreas?: FocusArea[]
  onDeepDive?: (area: FocusArea) => void
}

export const MessageItem = memo(({ message, focusAreas, onDeepDive }: MessageItemProps) => {
  const { t } = useTranslation()
  const isUser = message.sender === 'user'

  const containerClass = isUser ? 'justify-end' : 'justify-start'
  
  const bubbleClass = isUser
    ? 'bg-bio-deep text-bio-white dark:bg-transparent dark:text-white dark:border dark:border-white ml-4 sm:ml-12'
    : 'bg-white dark:bg-bio-deep/80 border border-bio-deep/10 dark:border-bio-white/10 text-bio-deep dark:text-bio-white mr-4 sm:mr-12'

  const labelColorClass = isUser 
    ? 'text-bio-lime' 
    : 'text-bio-deep dark:text-bio-white'

  const labelBgClass = isUser ? 'dark:bg-bio-deep' : ''

  const proseClass = isUser 
    ? 'prose-invert' 
    : 'dark:prose-invert prose-headings:font-mono prose-headings:uppercase'

  return (
    <div className={`flex ${containerClass}`}>
      <div className={`max-w-3xl p-6 md:p-8 text-base font-medium relative ${bubbleClass}`}>
        <div className={`absolute -top-3 left-6 px-2 bg-inherit ${labelBgClass}`}>
          <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${labelColorClass}`}>
            {isUser ? t('chat.body.userInput') : t('chat.body.systemResponse')}
          </span>
        </div>
        
        <ReactMarkdown className={`prose max-w-none ${proseClass}`}>
          {message.text}
        </ReactMarkdown>

        {!isUser && focusAreas && onDeepDive && (
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
})

MessageItem.displayName = 'MessageItem'
