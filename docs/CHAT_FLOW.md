# 🔄 Flujo de Mensajes en `chat_divi`

Este documento describe de forma resumida cómo viajan los mensajes dentro del sistema.

---

1. **Recepción del webhook**
   * Los mensajes entran por `POST /webhook` desde WhatsApp.
   * El plugin `whatsapp-incoming.plugin.ts` valida y extrae el contenido relevante.
2. **Delegación al Chat Service**
   * Una vez obtenido el `from` y el `text`, se envía la información a `ChatService`.
   * Este servicio centraliza la lógica de almacenamiento y cualquier procesamiento adicional.
3. **Persistencia opcional**
   * `ChatService` utiliza Prisma (ver `src/lib/prisma.ts`) para guardar el mensaje si así se configura.
4. **Emisión o respuesta**
   * Tras procesar el mensaje, se pueden generar respuestas, emitir eventos o simplemente registrar la actividad.

Este flujo mantiene desacoplados los canales de entrada del núcleo del chat, facilitando agregar futuras integraciones.