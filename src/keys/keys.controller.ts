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
import { Types } from 'mongoose';
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

	@Get(':id')
	getKey(@Param('id') keyId: Types.ObjectId, @Request() req: IAuthenticatedRequest) {
		return this.keysService.getKey(keyId);
	}

	@Put(':id')
	updateKey(
		@Param('id') keyId: Types.ObjectId,
		@Body() updateKeyDto: UpdateKeyDto,
		@Request() req: IAuthenticatedRequest,
	) {
		const ownerId = req.user._id;

		return this.keysService.updateKey(keyId, ownerId, updateKeyDto);
	}

	@Delete(':id')
	deleteSpaceNote(@Param('id') keyId: Types.ObjectId, @Request() req: IAuthenticatedRequest) {
		const ownerId = req.user._id;

		return this.keysService.deleteKey(keyId, ownerId);
	}
}
