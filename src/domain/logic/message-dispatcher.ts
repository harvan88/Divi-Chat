// src/domain/logic/message-dispatcher.ts

import { prisma } from '@/lib/prisma'
import type { Message } from '@prisma/client'
import { respondWithOpenAI } from './responder/openai-responder'

export async function handleMessageDispatch(message: Message) {
  const chat = await prisma.chat.findUnique({
    where: { id: message.chatId }
  })

  if (!chat) {
    console.warn(`[Dispatcher] No se encontró el chat con id ${message.chatId}`)
    return
  }

  const responder = chat.responder ?? 'human'

  switch (responder) {
    case 'openai':
      console.log(`[IA] El chat ${chat.id} requiere respuesta automática.`)
      await respondWithOpenAI(message)
      break

    case 'bot':
      console.log(`[BOT] El chat ${chat.id} será respondido por reglas.`)
      break

    case 'human':
    default:
      console.log(`[HUMANO] El chat ${chat.id} no tiene respuesta automática. Espera operador.`)
      break
  }
}
