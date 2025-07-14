# 📦 Módulos Principales

Breve referencia de las carpetas y archivos clave dentro de `src/`.

---

| Ruta | Responsabilidad |
| ---- | --------------- |
| `src/app.ts` | Punto de entrada que inicia Elysia y registra los plugins. |
| `src/ui/plugins/whatsapp-incoming.plugin.ts` | Maneja `GET` y `POST /webhook` para interactuar con WhatsApp. |
| `src/core/chat/chat.service.ts` | Servicio central que procesa y almacena mensajes. |
| `src/domain/services` | Funciones de dominio, como guardar y obtener mensajes. |
| `src/domain/types` | Definiciones de tipos para payloads externos. |
| `src/lib/prisma.ts` | Cliente de Prisma compartido para la base de datos. |
| `src/shared` | Tipos o constantes reutilizables en todo el proyecto. |
| `src/generated/prisma` | Código generado automáticamente; no se edita manualmente. |

Estos módulos colaboran para mantener separadas las responsabilidades y facilitar la ampliación del sistema.