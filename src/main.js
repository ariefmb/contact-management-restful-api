import logger from "./utils/logging.js";
import createServer from "./utils/server.js";

const app = createServer()

if (process.env.NODE_ENV !== "production") {
    const port = 3000
    app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}`)
    })
}

export default app