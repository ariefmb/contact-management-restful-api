import "dotenv/config"
import logger from "../utils/logging.js"

const CONFIG = {
    db_url: process.env.DATABASE_URL,
    db_port: process.env.DATABASE_PORT,
    db_host: process.env.DATABASE_HOST,
    db_user: process.env.DATABASE_USER,
    db_pass: process.env.DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME,
    jwt_private_key: process.env.JWT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    jwt_public_key: process.env.JWT_PUBLIC_KEY.replace(/\\n/g, "\n")
}

if (!CONFIG.db_url) {
    logger.error("Missing environment variable: DATABASE_URL")
    process.exit(1)
}

if (!CONFIG.db_port) {
    logger.error("Missing environment variable: DATABASE_PORT")
    process.exit(1)
}

if (!CONFIG.db_host) {
    logger.error("Missing environment variable: DATABASE_HOST")
    process.exit(1)
}

if (!CONFIG.db_user) {
    logger.error("Missing environment variable: DATABASE_USER")
    process.exit(1)
}

if (!CONFIG.db_name) {
    logger.error("Missing environment variable: DATABASE_NAME")
    process.exit(1)
}

if (!CONFIG.jwt_private_key) {
    logger.error("Missing environment variable: JWT_PRIVATE_KEY")
    process.exit(1)
}

if (!CONFIG.jwt_public_key) {
    logger.error("Missing environment variable: JWT_PUBLIC_KEY")
    process.exit(1)
}

export default CONFIG