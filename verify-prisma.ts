import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

console.log("Modelos disponibles:", Object.keys(prisma))
