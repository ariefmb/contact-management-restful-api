import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import 'dotenv/config'
import { PrismaClient } from "../../generated/prisma/client.ts"
import logger from './logging.js'

const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
})

export const prismaClient = new PrismaClient({
    adapter,
    log: [
        {
        emit: 'event',
        level: 'query',
        },
        {
        emit: 'event',
        level: 'error',
        },
        {
        emit: 'event',
        level: 'info',
        },
        {
        emit: 'event',
        level: 'warn',
        },
    ],
})

prismaClient.$connect()
    .then(() => {
        logger.info('Database connected successfully')
    })
    .catch((e) => {
        logger.error('Failed to connect to database:', e)
    })

prismaClient.$on('error', (e) => {
    logger.error(e)
})

prismaClient.$on('warn', (e) => {
    logger.warn(e)
})

prismaClient.$on('info', (e) => {
    logger.info(e)
})

// prismaClient.$on('query', (e) => {
//     logger.info(e)
// })