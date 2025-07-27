/** @jsxImportSource @kitajs/html */

import { MessageItem } from '@/ui/components/molecules/MessageItem'

export type Message = {
  role: 'user' | 'bot' | 'openai'
  text: string
}

export function renderMessageList(messages: Message[]) {
  return (
    <div class="flex flex-col gap-4">
      {messages.map((m) => MessageItem(m))}
    </div>
  )
}
