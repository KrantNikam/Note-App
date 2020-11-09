import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

export const generateJWT = (payload: any) => {
    const token = jwt.sign(
        { userId: payload.userId, email: payload.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
    return token;
}