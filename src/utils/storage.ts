import type { ChatMessage, SessionSummary } from '../api'

const SESSIONS_KEY_PREFIX = 'consultoria_sessions_'
const SESSION_MESSAGES_KEY_PREFIX = 'consultoria_session_messages_'

export function getSessionsKey(userId: string) {
  return `${SESSIONS_KEY_PREFIX}${userId}`
}

export function getMessagesKey(userId: string, sessionId: string) {
  return `${SESSION_MESSAGES_KEY_PREFIX}${userId}_${sessionId}`
}

export function loadSessionsFromStorage(userId: string): SessionSummary[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(getSessionsKey(userId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveSessionsToStorage(userId: string, sessions: SessionSummary[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(getSessionsKey(userId), JSON.stringify(sessions))
  } catch {
  }
}

export function loadMessagesFromStorage(userId: string, sessionId: string): ChatMessage[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(getMessagesKey(userId, sessionId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveMessagesToStorage(userId: string, sessionId: string, messages: ChatMessage[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(getMessagesKey(userId, sessionId), JSON.stringify(messages))
  } catch {
  }
}
