import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, Length } from 'class-validator';
import { IsAllowedCharacters } from '../../common/validators/name.validator';

export class CreateKeyDto {
	@IsString({ message: 'Название ключа должно быть строкой' })
	@Length(4, 32, { message: 'Название ключа должно быть от 4 до 32 символов' })
	@IsAllowedCharacters({
		message:
			'Название ключа может содержать только латинские буквы, цифры, подчёркивания (_) и тире (-)',
	})
	readonly name: string;

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

	@IsBoolean({ message: 'Поле dangerous должно быть boolean' })
	@IsOptional()
	readonly dangerous?: boolean;
}
