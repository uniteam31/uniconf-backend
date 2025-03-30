import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserPersonalDataDto } from './dto/update-user-personal-data-dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
	) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		return await this.userModel.create({ ...createUserDto });
	}

	async getUserByUsername(username: string) {
		return this.userModel.findOne({ username }).exec();
	}

	async getUserByID(id: Types.ObjectId) {
		return this.userModel.findById(id).exec();
	}

	async getUserPersonalData(userID: Types.ObjectId) {
		const personalData = await this.userModel
			.findOne({ _id: userID })
			.select('_id username publicName');

		if (!personalData) {
			throw new NotFoundException('Такой пользователь не найден или у вас нет доступа');
		}

		return personalData;
	}

	async updateUserPersonalData(
		userID: Types.ObjectId,
		updateUserPersonalDataDto: UpdateUserPersonalDataDto,
	) {
		if (updateUserPersonalDataDto.username) {
			const candidate = await this.userModel.findOne({
				username: updateUserPersonalDataDto.username,
			});

			if (candidate?._id.toString() !== userID.toString()) {
				throw new BadRequestException(
					'Пользователь с таким именем пользователя уже существует'
				);
			}
		}

		const newUserData = {
			...updateUserPersonalDataDto,
			password:
				updateUserPersonalDataDto.password &&
				(await bcrypt.hash(updateUserPersonalDataDto.password, 5)),
		};

		const updatedPersonalData = await this.userModel
			.findOneAndUpdate({ _id: userID }, { $set: { ...newUserData } }, { new: true })
			.select('_id username publicName');

		if (!updatedPersonalData) {
			throw new NotFoundException(
				'Такого пользователя нет или у вас нет прав для редактирования',
			);
		}

		return updatedPersonalData;
	}
}
