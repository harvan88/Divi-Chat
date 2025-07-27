import { Elysia } from 'elysia'
import { MessageService } from './domain/services/message.service'
import { renderMessageItem } from './ui/fragments/render-message-item'
import { renderMessageList } from './ui/fragments/render-message-list'
import { componentPreviewPlugin } from './ui/plugins/component-preview.plugin'
import { renderChatPage } from './ui/fragments/render-chat-page'

const app = new Elysia()

  .use(componentPreviewPlugin)

  // ✅ Ruta para enviar mensaje y recibir la burbuja HTML
  .post('/debug/send', async ({ body }: { body: { phone: string; text: string } }) => {
    const { phone, text } = body

    await MessageService.saveMessage(phone, text)

    const messages = await MessageService.getMessages(phone)
    const last = messages.at(-1)

    if (!last) {
      return '<div class="text-gray-400 italic">Sin mensajes</div>'
    }

    const role = (last.responder ?? 'bot') as 'user' | 'bot' | 'openai'
    return renderMessageItem(role, last.content)
  })

  // ✅ Ruta para mostrar toda la interfaz del chat
  .get('/chat/:phone', async ({ params }) => {
    const messages = await MessageService.getMessages(params.phone)
    const html = renderChatPage(params.phone, messages)
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  })

app.listen(3001)
console.log('🚀 Webhook y API escuchando en http://localhost:3001')
