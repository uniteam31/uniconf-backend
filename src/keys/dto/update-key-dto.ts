import { IsNumber, IsArray, IsOptional, IsString } from 'class-validator';
import { IsAllowedCharacters } from '../../common/validators/name.validator';

export class UpdateKeyDto {
	@IsNumber({}, { message: 'Процент раскатки должен быть числом' })
	readonly percentage: number;

	@IsArray({ message: 'Поле include должно быть массивом' })
	@IsAllowedCharacters({
		each: true,
		message:
			'Каждый элемент include может содержать только латинские буквы, цифры, подчёркивания (_) и тире (-)',
	})
	readonly include: string[];

	@IsArray({ message: 'Поле exclude должно быть массивом' })
	@IsAllowedCharacters({
		each: true,
		message:
			'Каждый элемент exclude может содержать только латинские буквы, цифры, подчёркивания (_) и тире (-)',
	})
	readonly exclude: string[];

	@IsString({ message: 'Описание должно быть строкой' })
	@IsOptional()
	readonly description?: string;
}
