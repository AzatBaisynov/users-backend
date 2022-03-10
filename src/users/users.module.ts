import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/users/entities/user.entity';
import { UsersService } from '@app/users/services/users.service';
import { UsersResolver } from '@app/users/resolvers/users.resolver';
import { AuthGuard } from '@app/users/security/auth.guard';
import { UserLogEntity } from '@app/users/entities/userLog.entity';
import { UserLogsService } from '@app/users/services/userLogs.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, UserLogEntity])
	],
	providers: [
		UsersService,
		UsersResolver,
		AuthGuard,
		UserLogsService
	],
	exports: [UsersService],
})
export class UsersModule { }