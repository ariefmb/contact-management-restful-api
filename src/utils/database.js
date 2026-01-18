import { PrismaMariaDb } from '@prisma/adapter-mariadb'
// import { PrismaClient } from "../../generated/prisma/client.ts"
import { PrismaClient } from '@prisma/client'
import CONFIG from '../config/environment.js'
import logger from './logging.js'

const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    user: CONFIG.db_user,
    password: CONFIG.db_pass,
    database: CONFIG.db_name,
    connectionLimit: 1
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