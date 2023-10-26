import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const AUTH_KEY = this.configService.get<string>('AUTH_KEY');
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== AUTH_KEY) {
      return false;
    }

    return true;
  }
}