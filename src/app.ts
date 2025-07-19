// src/app.ts

import { Elysia } from 'elysia'
import { whatsappIncomingPlugin } from './ui/plugins/whatsapp-incoming.plugin'
import { MessageService } from './domain/services/message.service'

const app = new Elysia()

  .use(whatsappIncomingPlugin)

  .post('/debug/send', async ({ body }: { body: { phone: string; text: string } }) => {
    // 1. Guardar y despachar mensaje de usuario
    await MessageService.saveMessage(body.phone, body.text)

    // 2. Recuperar todo el historial de ese chat
    const messages = await MessageService.getMessages(body.phone)

    // 3. Devolver ambos mensajes (usuario + IA)
    return { ok: true, messages }
  })

  .get('/debug/messages/:phone', async ({ params }) => {
    const messages = await MessageService.getMessages(params.phone)
    return { messages }
  })

  .listen(3001)

console.log('🚀 Webhook y API escuchando en http://localhost:3001')
