## 📁 Estructura del Proyecto: `chat_divi`

Este proyecto está inspirado en una arquitectura modular y escalable, siguiendo buenas prácticas de diseño y separación de responsabilidades. A continuación, se describe cada parte de la estructura:

---

### 🧠 Carpeta raíz

* `.gitignore`: excluye archivos/carpetas como `node_modules`, `dist`, etc. del control de versiones.
* `bun.lock`: archivo de bloqueo de dependencias generado por Bun.
* `index.ts`: archivo de entrada predeterminado (no utilizado en este proyecto, reemplazado por `src/app.ts`).
* `package.json`: contiene las dependencias y scripts del proyecto.
* `README.md`: documentación principal del proyecto.
* `tsconfig.json`: configuración de TypeScript, incluyendo paths y alias.
* `ngrok.exe`: binario para exponer puertos locales públicamente (útil para pruebas de webhooks).
* `ngrok_recovery_codes (1).txt`: posiblemente tokens de recuperación para ngrok.
* `docs/`: carpeta reservada para documentación adicional.
* `scripts/estructura.ts`: script auxiliar (se puede usar para inspección o documentación automatizada).

---

### 🧬 Prisma

* `prisma/schema.prisma`: define los modelos de datos y conexión con la base de datos Supabase.
* `prisma/migrations/`: historial de migraciones de la base de datos.

---

### 💡 Carpeta `src/`

#### `src/app.ts`

Punto de entrada real del servidor Elysia. Inicializa los plugins y comienza a escuchar en el puerto 3001.

#### `src/core/chat/`

* `chat.service.ts`: servicio central que maneja la lógica de mensajes del sistema de chat. El servicio ya está implementado, gestiona el almacenamiento de mensajes y cuenta con logs y comentarios relevantes.

#### `src/domain/`

* `types/whatsapp.webhook-payload.ts`: definición de tipos para parsear y validar correctamente los webhooks entrantes desde WhatsApp.
* `services/message.service.ts`: servicio específico para tratar mensajes entrantes (desde WhatsApp en este caso). Se encargará de transformarlos, encolarlos, etc.

> 📌 Faltan aún `entities/`, `logic/` y `enums/`. Se pueden usar para representar entidades del dominio del chat, reglas de negocio y enumeraciones reutilizables.

#### `src/generated/prisma/`

Directorio generado automáticamente con el cliente de Prisma. No tocar manualmente.

#### `src/lib/prisma.ts`

Archivo que inicializa y exporta el cliente de Prisma centralizado.

#### `src/shared/types/`

Carpeta para tipos compartidos entre distintos módulos. Útil para normalizar estructuras transversales.

#### `src/ui/`

* `plugins/whatsapp-incoming.plugin.ts`: plugin de Elysia que maneja únicamente las entradas POST desde WhatsApp (webhook). Importa los tipos del dominio.
* `components/`: carpeta preparada para UI (HTMX, HTML directo o cualquier librería de front si se agrega).

---

## 📚 Documentación sugerida en `/docs`

Te recomiendo crear una serie de documentos breves:

| Archivo                 | Propósito                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| `/docs/ARCHITECTURE.md` | Documentar decisiones estructurales (dominio, plugin, separation of concerns, etc).                      |
| `/docs/CHAT_FLOW.md`    | Especificar cómo fluyen los mensajes dentro del sistema de chat (de entrada a persistencia y respuesta). |
| `/docs/WEBHOOKS.md`     | Documentar los endpoints entrantes (ej: WhatsApp), cómo se estructuran los payloads y ejemplos.          |
| `/docs/MODULES.md`      | Tabla de responsabilidades de cada módulo de `src/`.                                                     |
