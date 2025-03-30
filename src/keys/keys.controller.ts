import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Request,
	UseGuards,
} from '@nestjs/common';
import { KeysService } from './keys.service';
import { CreateKeyDto } from './dto/create-key-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IAuthenticatedRequest } from '../auth/types/authenticated-request.interface';
import { UpdateKeyDto } from './dto/update-key-dto';

@UseGuards(JwtAuthGuard)
@Controller('keys')
export class KeysController {
	constructor(private keysService: KeysService) {}

	@Post()
	createKey(@Body() createKeyDto: CreateKeyDto, @Request() req: IAuthenticatedRequest) {
		const ownerId = req.user._id;

		return this.keysService.createKey(createKeyDto, ownerId);
	}

	@Get()
	getKeys(@Request() req: IAuthenticatedRequest, @Query('search') searchQuery?: string) {
		return this.keysService.getKeys(searchQuery);
	}

	@Get(':name')
	getKey(@Param('name') keyName: string) {
		return this.keysService.getKey(keyName);
	}

	@Put(':name')
	updateKey(
		@Param('name') name: string,
		@Body() updateKeyDto: UpdateKeyDto,
		@Request() req: IAuthenticatedRequest,
	) {
		const ownerId = req.user._id;

		return this.keysService.updateKey(name, ownerId, updateKeyDto);
	}

	@Delete(':name')
	deleteSpaceNote(@Param('name') name: string, @Request() req: IAuthenticatedRequest) {
		const ownerId = req.user._id;

		return this.keysService.deleteKey(name, ownerId);
	}
}
