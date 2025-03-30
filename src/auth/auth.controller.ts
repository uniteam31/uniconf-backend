import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { LoginDto } from './dto/login-dto';
import { JwtAdminGuard } from './jwt-admin.guard';
import { IAuthenticatedRequest } from './types/authenticated-request.interface';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(JwtAdminGuard)
	@Get()
	init(@Request() req: IAuthenticatedRequest) {
		const userID = req.user._id;
		return this.authService.init(userID);
	}

	@Post('/login')
	login(@Body() userDto: LoginDto) {
		return this.authService.login(userDto);
	}

	// TODO: remove comm
	// @UseGuards(JwtAdminGuard)
	@Post('/signup')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto);
	}
}
