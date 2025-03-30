import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAllowedCharacters(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isAllowedCharacters',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					return typeof value === 'string' && /^[a-zA-Z0-9_-]+$/.test(value);
				},
				defaultMessage(args: ValidationArguments) {
					return `${args.property} может содержать только латинские буквы, цифры, подчёркивания (_) и тире (-)`;
				},
			},
		});
	};
}
