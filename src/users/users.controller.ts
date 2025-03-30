import {
	Body,
	Controller,
	Get,
	Put,
	Request,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAdminGuard } from '../auth/jwt-admin.guard';
import { IAuthenticatedRequest } from '../auth/types/authenticated-request.interface';
import { formatResponse } from '../common/utils/response.util';
import { UpdateUserPersonalDataDto } from './dto/update-user-personal-data-dto';

@UseGuards(JwtAdminGuard)
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('personalData')
	async getUserPersonalData(@Request() req: IAuthenticatedRequest) {
		const userID = req.user._id;

		const personalData = await this.usersService.getUserPersonalData(userID);

		return formatResponse(personalData, 'Данные успешно получены');
	}

	@Put('personalData')
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async updateUserPersonalData(
		@Body() updateUserPersonalDataDto: UpdateUserPersonalDataDto,
		@Request() req: IAuthenticatedRequest,
	) {
		const userID = req.user._id;

		const updatedPersonaData = await this.usersService.updateUserPersonalData(
			userID,
			updateUserPersonalDataDto,
		);

		return formatResponse(updatedPersonaData, 'Данные успешно обновлены');
	}
}
