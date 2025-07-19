// test/openai-test.ts

import { prisma } from '../src/lib/prisma'
import { respondWithOpenAI } from '../src/domain/logic/responder/openai-responder'

async function main() {
  const chatId = 'default'

  // 1️⃣ Asegurarnos de que exista un participante de prueba
  const participant = await prisma.participant.upsert({
    where: { phone: 'test-user' },
    update: {},
    create: {
      phone: 'test-user',
      chatId
    }
  })

  // 2️⃣ Crear un mensaje de usuario de prueba
  const message = await prisma.message.create({
    data: {
      chatId,
      authorId: participant.id,
      content: 'Prueba de API OpenAI'
    }
  })
  console.log('📝 Mensaje de prueba creado:', message)

  // 3️⃣ Invocar directamente el responder de OpenAI
  await respondWithOpenAI(message)

  // 4️⃣ Recuperar los mensajes para ver la respuesta guardada
  const all = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' }
  })
  console.log('💬 Historial del chat:', all)
}

main()
  .catch((e) => {
    console.error('❌ Error en openai-test:', e)
  })
  .finally(() => process.exit())
