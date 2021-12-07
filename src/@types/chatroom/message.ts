import type { DocumentData, Timestamp } from 'firebase/firestore'

export interface ChatMessage {
  id: string
  username: string
  content: string
  createdAt: Date
}

export function chatMsgfromDoc(data: DocumentData): ChatMessage {
  const { id, username, content, createdAt } = data
  return { id, username, content, createdAt: (createdAt as Timestamp).toDate() }
}
