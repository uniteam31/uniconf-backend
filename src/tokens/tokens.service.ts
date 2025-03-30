import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { formatResponse } from '../common/utils/response.util';
import { ApiResponse } from '../common/utils/response.type';
import { Types } from 'mongoose';

@Injectable()
export class TokensService {
	constructor(private jwtService: JwtService) {}

	async generateToken(userId: Types.ObjectId, expires?: string): Promise<ApiResponse<string>> {
		// TODO add service name
		const payload = {
			author: userId,
			role: 'service',
		};

		const options = {
			expiresIn: expires || '90d',
		};

		const token = this.jwtService.sign(payload, options);

		return formatResponse(token, 'Токен успешно сгенерирован');
	}
}
