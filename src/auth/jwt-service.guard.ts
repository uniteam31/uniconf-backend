import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/** Если возвращает false, то доступ запрещен, иначе разрешен и выставляет в req информацию о пользователе и пространствах */
@Injectable()
export class JwtServiceGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();

		try {
			const authHeader = req.headers.authorization;

			const bearer = authHeader?.split(' ')[0];
			const token = authHeader?.split(' ')[1];

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({ message: 'Пользователь или Сервис не авторизован' });
			}

			return true;
		} catch (e) {
			console.error(e);
			throw new UnauthorizedException({ message: 'Пользователь или Сервис не авторизован' });
		}
	}
}
