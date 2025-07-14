
## ✅ Checklist de Prisma para trabajar sin errores

### 🧱 1. Al crear o modificar el schema.prisma

* [ ] Verificá que los nombres de los campos y modelos sean correctos y estén en camelCase.
* [ ] Guardá el archivo `schema.prisma`.

---

### 🛠️ 2. Aplicar cambios al esquema

Si es un cambio nuevo (no inicial):

```bash
bunx prisma migrate dev --name descripcion-del-cambio
```

Si es la primera vez o querés empezar desde cero:

```bash
bunx prisma migrate reset
```

❗ Esto borra los datos en desarrollo.

---

### 🧬 3. Generar el cliente Prisma

Siempre hacelo después de migrar o modificar `schema.prisma`:

```bash
bunx prisma generate
```

✅ Esto actualiza `node_modules/@prisma/client`.

---

### 🔍 4. Verificar los modelos disponibles

Usá un archivo llamado por ejemplo `verify-prisma.ts`:

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

console.log("Modelos disponibles:", Object.keys(prisma))
```

Corrélo con:

```bash
bun run verify-prisma.ts
```

---

### 🧠 5. Al escribir servicios TypeScript

* [ ] Usá los nombres exactos del schema (`toId`, `authorId`, etc.).
* [ ] Si importás tipos, usá `import type`:

```ts
import type { Message } from '@prisma/client'
```

* [ ] Usá `connect` correctamente para relaciones:

```ts
to: { connect: { id: usuarioId } }
```

---

### 🧹 6. Si todo se rompe o no hay cambios visibles

1. Eliminá migraciones antiguas (opcional para limpiar):

   ```bash
   rm -Recurse -Force prisma/migrations
   ```

2. Borrá el cliente viejo:

   ```bash
   rm -Recurse -Force node_modules
   ```

3. Instalá de nuevo:

   ```bash
   bun install
   bunx prisma generate
   ```

4. Reset de base de datos (si es necesario):

   ```bash
   bunx prisma migrate reset
   ```

5. Reiniciá VS Code para limpiar cachés de TS y Prisma.

---

### 🧪 7. Bonus: Comprobá que realmente se actualizó index.d.ts

Buscá en:

```
node_modules/@prisma/client/index.d.ts
```

Verificá que los campos nuevos estén presentes (como `toId`, `authorId`, etc.).

