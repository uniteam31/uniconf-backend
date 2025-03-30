import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtAdminGuard } from '../auth/jwt-admin.guard';
import { IAuthenticatedRequest } from '../auth/types/authenticated-request.interface';

@UseGuards(JwtAdminGuard)
@Controller('tokens')
export class TokensController {
	constructor(private tokensService: TokensService) {}

	@Get('generate')
	getKeys(@Request() req: IAuthenticatedRequest, @Query('expires') expires?: string) {
		const userId = req.user._id;
		return this.tokensService.generateToken(userId, expires);
	}
}
