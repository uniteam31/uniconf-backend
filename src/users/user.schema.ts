import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

/** HydratedDocument используется для типизации документов, которые возвращаются из базы данных.
 * Это типизированный объект, который включает в себя все методы Mongoose,
 * такие как save(), remove() и т.д.
 * */
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
	_id: Types.ObjectId;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	publicName: string;

	@Prop({ required: true, unique: true })
	username: string;
}

/** Основная схема */
export const UserSchema = SchemaFactory.createForClass(User);
