import { Controller, UseGuards, Request, Get, Query } from '@nestjs/common';
import { ConfigService } from './config.service';
import { JwtServiceGuard } from '../auth/jwt-service.guard';
import { IAuthenticatedRequest } from '../auth/types/authenticated-request.interface';
import { JwtService } from '@nestjs/jwt';
import { TUserPayload } from './types/config.types';

@UseGuards(JwtServiceGuard)
@Controller('config')
export class ConfigController {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService,
	) {}

	@Get()
	getUserConfig(@Request() req: IAuthenticatedRequest, @Query('token') token?: string) {
		const user = this.jwtService.decode<TUserPayload>(token);

		return this.configService.getConfig(user);
	}
}
