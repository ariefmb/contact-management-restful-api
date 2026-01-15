import { prismaClient } from "../utils/database.js"

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.get("Authorization")
    
        if (!token) {
            return res.status(401).json({ errors: "Unauthorized" })
        }
            
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        })
        
        if (!user) {
            return res.status(401).json({ errors: "Unauthorized" })
        }
                
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}