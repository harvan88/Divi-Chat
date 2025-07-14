import { t, Elysia } from 'elysia'
import type { WhatsAppWebhookPayload } from '@/domain/types/whatsapp.webhook-payload'

export const whatsappIncomingPlugin = new Elysia({ prefix: '/webhook' })
  // Verificación del webhook de Meta
  .get('', ({ query }) => {
    const mode = query['hub.mode']
    const token = query['hub.verify_token']
    const challenge = query['hub.challenge']

    const VERIFY_TOKEN = Bun.env.VERIFY_TOKEN

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook verificado correctamente con Meta.')
      return new Response(challenge, { status: 200 })
    } else {
      console.warn('❌ Falló la verificación del webhook.')
      return new Response('Forbidden', { status: 403 })
    }
  })

  // Recepción de mensajes entrantes de WhatsApp
  .post(
    '',
    async ({ body }: { body: WhatsAppWebhookPayload }) => {
      const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
      const from = message?.from
      const text = message?.text?.body

      if (!from || !text) {
        console.warn('⚠️ Mensaje recibido sin "from" o sin "text.body"')
        return new Response('Bad Request', { status: 400 })
      }

      console.log(`📩 Mensaje recibido de ${from}: ${text}`)

      // Acá podés agregar lógica de encolado, IA, respuestas, etc.

      return new Response(JSON.stringify({ status: 'ok' }), { status: 200 })
    },
    {
      body: t.Object({}, { additionalProperties: true }) // se ignora la validación estricta, pero se puede mejorar luego
    }
  )
