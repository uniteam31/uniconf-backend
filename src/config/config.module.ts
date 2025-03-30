import { forwardRef, Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { KeysModule } from '../keys/keys.module';

@Module({
	controllers: [ConfigController],
	providers: [ConfigService],
	imports: [forwardRef(() => UsersModule), AuthModule, KeysModule],
})
export class ConfigModule {}
