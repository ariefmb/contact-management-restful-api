import cors from "cors"
import express from 'express'
import { deserializedToken } from "../middleware/deserialized-token.js"
import { errorMiddleware } from '../middleware/error-middleware.js'
import { routes } from "../routes/index.js"

const createServer = () => {
    const app = express()

    const allowedOrigins = ['http://localhost:5173', 'https://contact-management-ariefmb.vercel.app']
    
    app.use(
        cors({
            origin: (origin, callback) => {
                if (!origin) return callback(null, true)
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true)
                } else {
                    return callback(new Error(500, "Not allowed by CORS"))
                }
            },
            credentials: true
        })
    )
    
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    app.use(deserializedToken)
    app.use(errorMiddleware)
    
    app.use('/api', routes)

    return app
}

export default createServer