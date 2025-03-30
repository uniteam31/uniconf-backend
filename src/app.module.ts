import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { KeysModule } from './keys/keys.module';
import * as process from 'node:process';

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		MongooseModule.forRoot(process.env.MONGO_URI),
		UsersModule,
		AuthModule,
		KeysModule,
	],
})
export class AppModule {}
