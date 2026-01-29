import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL

if (!connectionString && process.env.NODE_ENV === 'production') {
    console.warn('DATABASE_URL is not defined in environment variables')
}

export const prisma =
    globalForPrisma.prisma ||
    (function () {
        if (!connectionString) {
            return new PrismaClient({ log: ['query', 'error', 'warn'] })
        }
        const adapter = new PrismaMariaDb(connectionString)
        return new PrismaClient({
            adapter,
            log: ['query', 'error', 'warn'],
        })
    })()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
