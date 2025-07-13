import { Elysia } from 'elysia'
import { whatsappIncomingPlugin } from './ui/plugins/whatsapp-incoming.plugin'

const app = new Elysia()
  .use(whatsappIncomingPlugin)
  .listen(3001)

console.log('🚀 Webhook escuchando en http://localhost:3001/webhook')
