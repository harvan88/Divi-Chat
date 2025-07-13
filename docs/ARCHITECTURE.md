# 🏗️ Arquitectura del Proyecto `chat_divi`

Este documento explica las decisiones de diseño y estructura del proyecto `chat_divi`, el cual está pensado para ser un sistema de chat modular, extensible y desacoplado de los canales de entrada como WhatsApp o Telegram.

---

## 🎯 Objetivos arquitectónicos

* **Escalabilidad**: poder agregar nuevos canales (ej. Telegram, API interna, Web UI) sin afectar la lógica central del chat.
* **Separación de responsabilidades**: cada módulo del proyecto tiene un propósito bien definido.
* **Tipado estricto**: mediante TypeScript y tipos compartidos se garantiza coherencia en todo el flujo de datos.
* **Eventual persistencia**: el sistema puede funcionar sin base de datos, pero permite persistencia con Prisma si se desea.

---

## 🧱 Estructura general

La organización del código sigue un patrón semidominio + responsabilidad. Algunas carpetas clave:

```
src/
├── app.ts                      # punto de entrada del servidor Elysia
├── core/                      # lógica de negocio
│   └── chat/chat.service.ts   # lógica central del sistema de chat
├── domain/                   # definición del dominio
│   ├── entities/              # definiciones de entidad como Message, Conversation
│   ├── types/                 # payloads específicos (ej. WhatsApp)
│   └── enums/                 # valores constantes del dominio
├── lib/                      # herramientas compartidas (ej. cliente Prisma)
├── shared/                   # tipos o constantes globales reutilizables
├── ui/                       # entrada/salida HTTP
│   ├── plugins/              # plugins de Elysia, incluyendo webhooks
│   └── components/           # si se usara UI (HTMX, HTML, etc)
└── generated/                # código generado automáticamente por Prisma
```

---

## 🔌 Plugins desacoplados

Cada canal de entrada se configura como un plugin Elysia independiente:

* `whatsapp-incoming.plugin.ts`: recibe webhooks entrantes de WhatsApp, convierte el payload a un mensaje interno y lo delega a `chat.service`.
* `chat-api.plugin.ts`: permite enviar mensajes desde interfaces internas (Postman, consola, UI propia).

De esta manera, el chat no depende de WhatsApp, sino que WhatsApp depende del chat.

---

## 💬 Chat Service (`chat.service.ts`)

Este es el núcleo del sistema. Se encarga de:

* recibir un mensaje
* opcionalmente verificar si hay una conversación activa
* almacenar (o no) el mensaje
* emitir el mensaje a otros consumidores (logs, respuestas, UI)

Esto permite desacoplar los canales y el almacenamiento. Ideal para futuras expansiones (chatbots, respuestas automáticas, etc).

---

## 🧪 Testing y debug

* Se usa Bun para ejecutar el servidor de manera simple
* Ngrok permite probar webhooks públicamente desde WhatsApp
* Postman puede enviar mensajes a través de `/chat/message`

---

## 🔮 Futuras mejoras

* Enrutamiento inteligente de conversaciones
* Identificación de usuarios y sesión
* Almacenamiento persistente con Prisma
* Emisión de eventos vía WebSocket o SSE
* Plugins de salida: responder por WhatsApp, Telegram, Email, etc.

---

Este esquema asegura que el proyecto sea extensible, mantenible y alineado con las mejores prácticas modernas.
