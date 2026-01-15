import { logger } from "./application/logging.js";
import createServer from "./application/server.js";

const app = createServer()

const port = 3000
app.listen(port, () => {
    logger.info(`Server is listening on port ${port}`)
})