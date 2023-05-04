import { sign, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
    authenticated?: boolean;
    id?: number;
    admin?:boolean;
}
const secretKey = Buffer.from(
    <string>(process.env.ACCESS_TOKEN_SECRET_KEY),
    'base64'
  ).toString('ascii');

export const createToken = (user:any) => {
    const accessToken = sign({id:user.id},secretKey,{ expiresIn: '1h' });

    return accessToken;
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const privateKey = Buffer.from(
        <string>(process.env.ACCESS_TOKEN_SECRET_KEY),
        'base64'
      ).toString('ascii');
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1]; // Extract the token from the header
    try {
      const decodedToken = verify(token, privateKey);
      (req as AuthenticatedRequest).authenticated = true;
      return next();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };
  