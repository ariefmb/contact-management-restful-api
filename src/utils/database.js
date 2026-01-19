import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import pkg from '@prisma/client'
import CONFIG from '../config/environment.js'
import logger from './logging.js'
const { PrismaClient } = pkg

const adapter = new PrismaMariaDb({
    host: CONFIG.db_host,
    port: Number(CONFIG.db_port),
    user: CONFIG.db_user,
    password: CONFIG.db_pass,
    database: CONFIG.db_name,
    connectionLimit: 3
})

let prismaClient

if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient({
        adapter,
        log: [
            {
            emit: 'event',
            level: 'error',
            },
            {
            emit: 'event',
            level: 'warn',
            },
        ],
    })
}

prismaClient = globalThis.prismaClient

// if (process.env.NODE_ENV !== 'production') {
//     prismaClient.$connect()
//         .then(() => {
//             logger.info('Database connected successfully')
//         })
//         .catch((e) => {
//             logger.error('Failed to connect to database:', e)
//         })
// }

prismaClient.$on('error', (e) => {
    logger.error(e)
})

prismaClient.$on('warn', (e) => {
    logger.warn(e)
})

export { prismaClient }

