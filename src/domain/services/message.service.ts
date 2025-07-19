import { prisma } from '@/lib/prisma'
import { handleMessageDispatch } from '@/domain/logic/message-dispatcher'

export const MessageService = {
  async saveMessage(phone: string, content: string) {
    // Buscar o crear un chat genérico sin sobrescribir responder
    let chat = await prisma.chat.findUnique({ where: { id: 'default' } })

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          id: 'default',
          responder: 'openai' // o 'human' o null, según quieras inicializarlo
        }
      })
    }

    // Buscar o crear participante por teléfono
    const participant = await prisma.participant.upsert({
      where: { phone },
      update: {},
      create: {
        phone,
        chatId: chat.id
      }
    })

    // Crear el mensaje
    const message = await prisma.message.create({
      data: {
        chatId: chat.id,
        authorId: participant.id,
        content
      }
    })

    // Despachar lógica de respuesta (IA, bot, humana)
    await handleMessageDispatch(message)

    return message
  },

  async getMessages(phone: string) {
    const participant = await prisma.participant.findUnique({
      where: { phone },
      include: { chat: true }
    })

    if (!participant) return []

    return prisma.message.findMany({
      where: {
        chatId: participant.chatId
      },
      orderBy: { createdAt: 'asc' }
    })
  }
}
