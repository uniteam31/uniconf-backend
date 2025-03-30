import { IsString, Length } from 'class-validator';

export class CreateUserDto {
	@IsString({ message: 'Пароль должен быть строкой' })
	@Length(6, 30, { message: 'Пароль должен быть от 6 до 30 символов' })
	readonly password: string;

	@IsString({ message: 'Имя должно быть строкой' })
	@Length(2, 20, { message: 'Имя должно быть от 2 до 20 символов' })
	readonly publicName: string;

	@IsString({ message: 'Имя пользователя должно быть строкой' })
	@Length(3, 20, { message: 'Имя пользователя должно быть от 3 до 20 символов' })
	readonly username: string;
}
