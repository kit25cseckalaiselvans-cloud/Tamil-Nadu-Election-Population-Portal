import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db, User } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'tn-citizen-portal-secure-secret-key-2026';

export interface AuthRequest extends Request {
  user?: User;
}

export function hashPassword(plainText: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainText, salt);
}

export function comparePassword(plainText: string, hash: string): boolean {
  return bcrypt.compareSync(plainText, hash);
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      unique_user_id: user.unique_user_id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// In-Memory Rate Limiter (Sliding Window per IP)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const ipLimits = new Map<string, RateLimitRecord>();

export function rateLimiter(maxRequests: number = 20, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = ipLimits.get(ip);

    if (!record || now > record.resetAt) {
      ipLimits.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      db.logAudit({
        action: 'RATE_LIMIT_EXCEEDED',
        ip_address: ip,
        user_agent: req.headers['user-agent'] || 'unknown',
        status: 'WARNING',
        details: `Exceeded ${maxRequests} requests within ${windowMs / 1000}s on ${req.originalUrl}`,
      });
      return res.status(429).json({
        error: 'Too many requests. Please wait a moment before trying again.',
        retryAfterMs: record.resetAt - now,
      });
    }

    record.count += 1;
    next();
  };
}

// Authentication Middleware
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.tn_portal_token;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = db.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User account not found or deactivated.' });
    }

    if (user.account_status === 'Suspended') {
      return res.status(403).json({ error: 'Your account has been suspended by an administrator.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}

// Role Authorization Middleware
export function requireRole(allowedRoles: Array<'Citizen' | 'Officer' | 'Administrator'>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      db.logAudit({
        user_id: req.user.id,
        user_email: req.user.email,
        action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
        ip_address: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown',
        status: 'FAILED',
        details: `User with role ${req.user.role} attempted to access restricted endpoint: ${req.originalUrl}`,
      });
      return res.status(403).json({
        error: 'Forbidden. You do not have the required role permissions to perform this action.',
      });
    }

    next();
  };
}
