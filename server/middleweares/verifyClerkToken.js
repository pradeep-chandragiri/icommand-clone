import { verifyToken } from '@clerk/clerk-sdk-node'

const verifyClerkToken = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const payload = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRETE_KEY, // ✅ MUST provide secret key
        });

        req.userId = payload.sub;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

export default verifyClerkToken;