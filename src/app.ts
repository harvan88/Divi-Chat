import { Elysia } from 'elysia'
import { webhookPlugin } from './ui/plugins/webhook.plugin'

const app = new Elysia()
  .use(webhookPlugin)
  .listen(3001)

console.log('🚀 Webhook escuchando en http://localhost:3001/webhook')
