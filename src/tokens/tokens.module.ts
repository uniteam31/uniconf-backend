import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
	controllers: [TokensController],
	providers: [TokensService],
	imports: [AuthModule, UsersModule],
})
export class TokensModule {}
