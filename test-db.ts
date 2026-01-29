import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function main() {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        console.error('DATABASE_URL is not defined in .env')
        return
    }

    console.log('Testing connection to:', connectionString.replace(/:[^@]+@/, ':****@'))

    const adapter = new PrismaMariaDb(connectionString)
    const prisma = new PrismaClient({ adapter })

    try {
        await prisma.$connect()
        console.log('Successfully connected to the database!')
        const count = await prisma.quoteRequest.count()
        console.log('Current quote requests count:', count)
    } catch (error) {
        console.error('Failed to connect to the database:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
