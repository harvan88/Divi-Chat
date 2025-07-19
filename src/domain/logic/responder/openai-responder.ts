import { prisma } from '@/lib/prisma'
import type { Message } from '@prisma/client'
import type { OpenAIChatResponse } from '@/shared/types/openai'

const OPENAI_API_KEY = Bun.env.OPENAI_API_KEY
const OPENAI_MODEL = 'gpt-3.5-turbo' // podés cambiar a 'gpt-4o' si tenés acceso

export async function respondWithOpenAI(originalMessage: Message) {
  console.log('[OpenAI] --> Entró al responder IA con mensaje:', originalMessage.content)
  const chatId = originalMessage.chatId

  const bot = await prisma.participant.upsert({
    where: { phone: 'openai' },
    update: {},
    create: {
      phone: 'openai',
      chatId
    }
  })

  let reply = ''

  try {
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: 'user', content: originalMessage.content }
        ]
      })
    }).then(res => res.json() as Promise<OpenAIChatResponse>)

    reply = completion.choices?.[0]?.message?.content?.trim() || ''
    console.log('[OpenAI] Respuesta IA:', reply)
  } catch (error) {
    console.error('[OpenAI] ERROR:', error)
    console.error('[OpenAI] ERROR atrapado al llamar a la API:')

  }

  if (!reply) {
    reply = '🧠 No pude generar una respuesta automática en este momento. Un operador humano te responderá pronto.'
    console.warn('[OpenAI] Usando respuesta fallback.')
  }

  await prisma.message.create({
    data: {
      chatId,
      authorId: bot.id,
      toId: originalMessage.authorId ?? null,
      content: reply
    }
  })

  console.log('[OpenAI] Respuesta guardada.')
}
