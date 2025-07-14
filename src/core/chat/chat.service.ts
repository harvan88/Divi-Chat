import { type Message, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createMessage({
  from,
  to,
  chat,
  text,
}: {
  from: { id: string }
  to?: { id: string }
  chat: { id: string }
  text: string
}): Promise<Message> {
  return await prisma.message.create({
    data: {
      chatId: chat.id,
      content: text,
      authorId: from.id, // 'from' mapeado a 'authorId'
      toId: to?.id ?? null, // 'to' mapeado a 'toId'
    },
  })
}
