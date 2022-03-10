import { Module } from '@nestjs/common';
import { UserEntity } from '@app/users/entities/user.entity';
import { UsersService } from '@app/users/services/users.service';
import { UsersResolver } from '@app/users/resolvers/users.resolver';
import { AuthGuard } from '@app/users/security/auth.guard';
import { UserLogsService } from '@app/users/services/userLogs.service';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserLogModel } from '@app/users/models/userLog.model'
import { UserLogEntity } from '@app/users/entities/userLog.entity';
import { UserLogAssembler } from '@app/users/assembler/userLogs.assembler';
import { UserLogResolver } from '@app/users/resolvers/userLogs.resolver';


@Module({
	imports: [
		NestjsQueryGraphQLModule.forFeature({
			imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity, UserLogEntity])],
			assemblers: [UserLogAssembler],
			resolvers: [
				{
					DTOClass: UserLogModel,
					AssemblerClass: UserLogAssembler
				}
			],
		}),
	],
	providers: [
		UserLogResolver,
		UsersService,
		UsersResolver,
		AuthGuard,
		UserLogsService
	],
	exports: [UsersService],
})
export class UsersModule { }