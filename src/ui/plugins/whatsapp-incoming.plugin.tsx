/** @jsxImportSource @kitajs/html */
import { Elysia } from 'elysia'
import { Button } from '@/ui/components/atoms/Button'
import { Input } from '@/ui/components/atoms/Input'
import { MessageItem } from '@/ui/components/molecules/MessageItem'

const previewMap = {
  button: () => Button({ children: 'Enviar', class: 'bg-blue-600 text-white p-2 rounded' }),
  input: () => Input({ name: 'text', placeholder: 'Escribí...', class: 'w-full p-2 border rounded' }),
  'message-item': () => MessageItem({ role: 'bot', text: 'Hola desde el preview' }),
} as const

type ComponentKey = keyof typeof previewMap

export const componentPreviewPlugin = new Elysia().get('/preview/:component', ({ params }) => {
  const key = params.component.toLowerCase() as ComponentKey
  const render = previewMap[key]

  const html = (
    <html lang="es">
      <head>
        <title>Preview: {key}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body class="p-8 bg-white text-gray-900">
        <div class="max-w-lg mx-auto border p-4 rounded shadow">
          {render ? render() : (
            <h1 class="text-xl text-red-600">
              Componente <strong>{key}</strong> no encontrado.
            </h1>
          )}
        </div>
      </body>
    </html>
  ).toString()

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
    status: previewMap[key] ? 200 : 404
  })
})
