import { Elysia } from 'elysia'
import { MessageService } from '@/domain/services/message.service'

const VERIFY_TOKEN = 'laconchadelalora'

const queue: { from: string, text: string }[] = []

const processQueue = async () => {
  while (queue.length > 0) {
    const { from, text } = queue.shift()!
    await MessageService.saveMessage(from, text)
    console.log(`✅ Guardado mensaje de ${from}: ${text}`)
  }
}

export const webhookPlugin = new Elysia()
  .get('/webhook', ({ query }) => {
    const mode = query['hub.mode']
    const token = query['hub.verify_token']
    const challenge = query['hub.challenge']

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 })
    }
    return new Response('Forbidden', { status: 403 })
  })
  .post('/webhook', async ({ body }) => {
    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
    const from = message?.from
    const text = message?.text?.body

    if (from && text) {
      queue.push({ from, text })
      processQueue().catch(console.error)
      return new Response(JSON.stringify({ status: 'ok' }), { status: 200 })
    }

    return new Response('Bad Request', { status: 400 })
  })

  