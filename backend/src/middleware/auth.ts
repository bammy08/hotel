import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend Express Request to include `userId`
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token =
      req.cookies?.auth_token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return; // Ensure the middleware stops execution here
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    req.userId = decoded.userId;

    next(); // Call next() to proceed to the next middleware or route
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default verifyToken;
