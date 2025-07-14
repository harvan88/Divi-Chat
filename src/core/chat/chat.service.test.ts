import { describe, it, expect, vi } from 'vitest'

vi.mock('@/infra/prisma', () => {
  return {
    db: {
      message: {
        create: vi.fn()
      }
    }
  }
})

describe('ChatService', () => {
  it('should save an incoming message', async () => {
    const { ChatService } = await import('./chat.service')
    const { db } = await import('@/infra/prisma') as any

    const saved = { id: '1', from: 'alice', to: 'bob', text: 'hi', source: 'web', context: null }
    ;(db.message.create as any).mockResolvedValue(saved)

    const service = new ChatService()
    const result = await service.receiveMessage({ from: 'alice', toId: 'bob', text: 'hi', source: 'web' })

    expect(db.message.create).toHaveBeenCalledWith({
      data: {
        from: 'alice',
        to: 'bob',
        text: 'hi',
        source: 'web',
        context: undefined
      }
    })
    expect(result).toBe(saved)
  })
})
