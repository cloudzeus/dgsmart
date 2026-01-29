import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL

export const prisma =
    globalForPrisma.prisma ||
    (function () {
        if (!connectionString) {
            console.warn('DATABASE_URL is not defined, using default PrismaClient')
            return new PrismaClient({ log: ['query', 'error', 'warn'] })
        }

        try {
            // Parse URL to handle encoded characters and provide explicit config
            const url = new URL(connectionString)
            const adapter = new PrismaMariaDb({
                host: url.hostname,
                port: url.port ? parseInt(url.port) : 3306,
                user: url.username,
                password: decodeURIComponent(url.password),
                database: url.pathname.substring(1),
                connectTimeout: 30000, // 30 seconds
                acquireTimeout: 30000, // 30 seconds
            })

            return new PrismaClient({
                adapter,
                log: ['query', 'error', 'warn'],
            })
        } catch (error) {
            console.error('Failed to initialize Prisma with adapter, falling back:', error)
            return new PrismaClient({ log: ['query', 'error', 'warn'] })
        }
    })()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
