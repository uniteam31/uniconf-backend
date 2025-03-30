import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Key } from './keys.schema';
import { CreateKeyDto } from './dto/create-key-dto';
import { UpdateKeyDto } from './dto/update-key-dto';
import { formatResponse } from '../common/utils/response.util';
import { ApiResponse } from '../common/utils/response.type';

@Injectable()
export class KeysService {
	constructor(@InjectModel(Key.name) private keyModel: Model<Key>) {}

	async createKey(createKeyDto: CreateKeyDto, owner: Types.ObjectId): Promise<ApiResponse<Key>> {
		const lastKey = await this.keyModel.findOne({}, { number: 1 }).sort({ number: -1 }).lean();

		const nextNumber = lastKey?.number ? lastKey.number + 1 : 1;

		const createdKey = await new this.keyModel({
			...createKeyDto,
			owner,
			number: nextNumber,
		}).save();

		return formatResponse<Key>(createdKey, 'Ключ успешно создан');
	}

	async getKeys(searchQuery?: string): Promise<ApiResponse<Key[]>> {
		const query = searchQuery
			? {
					$or: [
						{ name: { $regex: searchQuery, $options: 'i' } },
						// { 'owner.publicName': { $regex: searchQuery, $options: 'i' } },
						// { 'owner.username': { $regex: searchQuery, $options: 'i' } },
					],
				}
			: {};

		const keys = await this.keyModel
			.find(query)
			.populate({
				path: 'owner',
				select: '_id username publicName',
				model: 'User', // ОБЯЗАТЕЛЬНО указывать модель при populate
			})
			.sort({ createdAt: -1 })
			.exec();

		return formatResponse<Key[]>(keys, '');
	}

	async getKey(name: string): Promise<ApiResponse<Key>> {
		const key = await this.keyModel
			.findOne({ name })
			.populate({
				path: 'owner',
				select: '_id username publicName',
				model: 'User',
			})
			.exec();

		return formatResponse<Key>(key, '');
	}

	async updateKey(
		name: string,
		owner: Types.ObjectId,
		updateKeyDto: UpdateKeyDto,
	): Promise<ApiResponse<Key>> {
		const updatedKey = await this.keyModel
			.findOneAndUpdate({ name, owner }, { $set: { ...updateKeyDto } }, { new: true })
			.populate({
				path: 'owner',
				select: '_id username publicName',
				model: 'User',
			});

		if (!updatedKey) {
			throw new NotFoundException('У вас нет прав для редактирования этого ключа');
		}

		return formatResponse<Key>(updatedKey, 'Ключ успешно обновлен');
	}

	async deleteKey(name: string, owner: Types.ObjectId): Promise<ApiResponse<null>> {
		const deletedKey = await this.keyModel.findOneAndDelete({
			name,
			owner,
		});

		if (!deletedKey) {
			throw new NotFoundException('У вас нет прав для удаления этого ключа');
		}

		return formatResponse(null, 'Ключ удален');
	}
}
