import { prisma } from '@/lib/prisma'

export const MessageService = {
  async saveMessage(phone: string, content: string) {
    const session = await prisma.chatSession.upsert({
      where: { phone },
      update: {},
      create: { phone }
    })

    return prisma.message.create({
      data: {
        sessionId: session.id,
        from: 'USER',
        content
      }
    })
  },

  async getMessages(phone: string) {
    return prisma.message.findMany({
      where: {
        session: { phone }
      },
      orderBy: { createdAt: 'asc' }
    })
  }
}
