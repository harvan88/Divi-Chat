import { db } from '@/infra/prisma'
import { Message } from '@prisma/client'

/**
 * ChatService se encarga de gestionar mensajes entrantes en el sistema.
 * Centraliza la lógica de creación, almacenamiento y análisis inicial.
 */
export class ChatService {
  /**
   * Recibe y guarda un mensaje entrante en el sistema de chat.
   * Este método puede ser invocado por distintos canales (WhatsApp, Web, Telegram, etc.)
   *
   * @param input - Estructura del mensaje recibido
   * @returns El mensaje persistido en la base de datos
   */
  async receiveMessage(input: {
    from: string
    text?: string
    source: string
    to?: string
    context?: Record<string, any>
  }): Promise<Message> {
    console.log('🟡 [ChatService] Recibiendo nuevo mensaje:')
    console.log('   ↳ De:', input.from)
    console.log('   ↳ A:', input.to ?? '(desconocido)')
    console.log('   ↳ Texto:', input.text ?? '(vacío)')
    console.log('   ↳ Fuente:', input.source)

    // Intentamos guardar el mensaje
    try {
      const message = await db.message.create({
        data: {
          from: input.from,
          to: input.to,
          text: input.text,
          source: input.source,
          context: input.context as any, // Prisma espera un tipo Json, casteamos para evitar errores TS
        }
      })

      console.log('✅ [ChatService] Mensaje guardado con ID:', message.id)
      return message
    } catch (error) {
      console.error('❌ [ChatService] Error guardando mensaje:', error)
      throw error
    }
  }
}
