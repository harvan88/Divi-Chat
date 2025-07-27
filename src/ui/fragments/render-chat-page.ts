import { renderMessageList } from './render-message-list'
import type { Message } from './render-message-list'


/**
 * Recibe un número de teléfono y los mensajes desde la base de datos.
 * Convierte los mensajes a un formato visual (role/text) y devuelve un HTML.
 */
export function renderChatPage(phone: string, data: any[]): string {
  const messages: Message[] = data.map((m) => ({
    role: (m.responder ?? 'bot') as 'user' | 'bot' | 'openai',
    text: m.content
  }))

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Divi Chat</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet" />
        <script src="https://unpkg.com/htmx.org@1.9.6" defer></script>
        <script src="https://unpkg.com/alpinejs" defer></script>
      </head>
      <body class="h-screen bg-white text-gray-900 flex flex-col">
        <main class="flex-1 overflow-y-auto p-4" id="messages">
          ${renderMessageList(messages)}
        </main>
        <form 
          hx-post="/debug/send" 
          hx-target="#messages" 
          hx-swap="beforeend"
          class="flex p-4 border-t gap-2"
        >
          <input type="hidden" name="phone" value="${phone}" />
          <input 
            type="text" 
            name="text" 
            class="flex-1 border rounded px-4 py-2" 
            placeholder="Escribe un mensaje..." 
          />
          <button 
            type="submit" 
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Enviar
          </button>
        </form>
      </body>
    </html>
  `
}
