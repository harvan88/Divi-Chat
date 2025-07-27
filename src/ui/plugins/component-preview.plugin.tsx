import { Elysia } from 'elysia'
import { previewMap } from './previewMap.generated' // importás el mapa generado dinámicamente

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
          {typeof render === 'function' ? render() : (
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
    status: typeof render === 'function' ? 200 : 404
  })
})
