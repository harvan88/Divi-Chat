import { readdirSync, statSync, writeFileSync } from "fs";
import { join } from "path";

const IGNORADOS = [
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "bun.lockb",
  ".env",
  ".env.local",
  "estructura.txt"
];

const INDENT = "  ";

function recorrerDirectorio(dir: string, nivel: number = 0): string {
  let salida = "";
  const items = readdirSync(dir).filter(name => !IGNORADOS.includes(name));

  for (const item of items) {
    const ruta = join(dir, item);
    const stats = statSync(ruta);

    salida += INDENT.repeat(nivel) + "├── " + item + "\n";

    if (stats.isDirectory()) {
      salida += recorrerDirectorio(ruta, nivel + 1);
    }
  }

  return salida;
}

const estructura = recorrerDirectorio(".");
writeFileSync("estructura.txt", estructura);
console.log("✅ Archivo estructura.txt generado con éxito.");
