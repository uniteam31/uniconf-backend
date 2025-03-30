import { Module } from '@nestjs/common';
import { KeysController } from './keys.controller';
import { KeysService } from './keys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Key, KeysSchema } from './keys.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
	controllers: [KeysController],
	providers: [KeysService],
	imports: [
		/** Регистрация схемы в NestJS и связывание с MongoDB */
		MongooseModule.forFeature([{ name: Key.name, schema: KeysSchema }]),
		AuthModule,
		UsersModule,
	],
})
export class KeysModule {}
