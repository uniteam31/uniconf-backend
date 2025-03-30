import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

/** HydratedDocument используется для типизации документов, которые возвращаются из базы данных.
 * Это типизированный объект, который включает в себя все методы Mongoose,
 * такие, как save(), remove() и т.д.
 * */
export type KeyDocument = HydratedDocument<Key>;

export type KeyCreator = {
	id: Types.ObjectId;
};

@Schema({ timestamps: true })
export class Key {
	@Prop({ type: Types.ObjectId, ref: 'User' })
	owner: Types.ObjectId[];

	@Prop({ required: true })
	number: number;

	@Prop({ required: true })
	name: string;

	@Prop()
	description: string;

	@Prop({ required: true })
	percentage: number;

	@Prop()
	dangerous: boolean;

	@Prop({ required: true })
	include: string[];

	@Prop({ required: true })
	exclude: string[];
}

/** Основная схема */
export const KeysSchema = SchemaFactory.createForClass(Key);
