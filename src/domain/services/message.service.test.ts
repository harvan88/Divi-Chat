import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/prisma', () => {
  return {
    prisma: {
      participant: {
        upsert: vi.fn(),
        findUnique: vi.fn(),
      },
      message: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
    },
  }
})

beforeEach(() => {
  const { prisma } = require('@/lib/prisma') as any
  prisma.participant.upsert.mockReset()
  prisma.participant.findUnique.mockReset()
  prisma.message.create.mockReset()
  prisma.message.findMany.mockReset()
})

describe('MessageService', () => {
  it('saveMessage creates participant and message', async () => {
    const { MessageService } = await import('./message.service')
    const { prisma } = await import('@/lib/prisma') as any

    const participant = { id: '123', chatId: 'c1' }
    ;(prisma.participant.upsert as any).mockResolvedValue(participant)
    const saved = { id: 'm1' }
    ;(prisma.message.create as any).mockResolvedValue(saved)

    const result = await MessageService.saveMessage('123', 'hi')

    expect(prisma.participant.upsert).toHaveBeenCalledWith({
      where: { id: '123' },
      update: {},
      create: { id: '123', chat: { create: {} } },
    })
    expect(prisma.message.create).toHaveBeenCalledWith({
      data: { chatId: 'c1', authorId: '123', content: 'hi' },
    })
    expect(result).toBe(saved)
  })

  it('getMessages returns messages when participant exists', async () => {
    const { MessageService } = await import('./message.service')
    const { prisma } = await import('@/lib/prisma') as any

    ;(prisma.participant.findUnique as any).mockResolvedValue({ chatId: 'c1' })
    const msgs = [{ id: 'm1' }]
    ;(prisma.message.findMany as any).mockResolvedValue(msgs)

    const result = await MessageService.getMessages('123')

    expect(prisma.message.findMany).toHaveBeenCalledWith({
      where: { chatId: 'c1' },
      orderBy: { createdAt: 'asc' },
    })
    expect(result).toBe(msgs)
  })

  it('getMessages returns empty array when participant missing', async () => {
    const { MessageService } = await import('./message.service')
    const { prisma } = await import('@/lib/prisma') as any

    ;(prisma.participant.findUnique as any).mockResolvedValue(null)

    const result = await MessageService.getMessages('404')

    expect(prisma.message.findMany).not.toHaveBeenCalled()
    expect(result).toEqual([])
  })
})