import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenBlacklistMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token && (await this.authService.isTokenBlacklisted(token))) {
      // Le token est dans la liste noire, donc la requête est rejetée
      return res.status(401).json({ message: 'Revoked token!' });
    }

    next();
  }
}
