import { Router } from "express";
import logger from "../utils/logging.js";

export const HealthRouter = Router();

HealthRouter.get("/", (req, res) => {
    logger.info("Health check success");
    res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Hello World",
    });
});
