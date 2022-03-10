import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserEntity } from '@app/users/entities/user.entity';
import { CreateUserInput } from '@app/users/inputs/create-user.input';
import { LoginUserInput } from '@app/users/inputs/login-user.input';
import { UsersService } from '@app/users/services/users.service';
import { UserModel } from '@app/users/models/user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/users/security/auth.guard';
import { UserLogModel } from '@app/users/models/userLog.model';
import { UserLogsService } from '@app/users/services/userLogs.service';
import { PaginatedUserLog } from '../models/paginated-userLog';
import { PaginationArgs } from '../models/pagination.args';
import { UserLogsFilters } from '../models/userLogsFilters.args';

@Resolver('User')
export class UsersResolver {
	constructor(
		private readonly userService: UsersService,
		private readonly userLogService: UserLogsService
	) {
	}

	@Mutation(() => UserModel)
	async createUser(@Args('createUser') createUserInput: CreateUserInput): Promise<UserModel> {
		const user = await this.userService.createUser(createUserInput);
		return this.userService.buildUserResponse(user);
	}

	@Mutation(() => UserModel)
	async login(@Args('login') loginUserInput: LoginUserInput): Promise<UserModel> {
		const user = await this.userService.login(loginUserInput);
		return this.userService.buildUserResponse(user);
	}

	@Query(() => [UserLogModel])
	@UseGuards(new AuthGuard())
	async getAllLoginLogs(): Promise<UserLogModel[]> {
		return await this.userLogService.getAllLogs();
	}

	@Query(() => [UserEntity])
	async getAllUsers(): Promise<UserEntity[]> {
		return await this.userService.getAllUsers();
	}

	@Query(() => PaginatedUserLog)
	getUserLogs(
		@Args() pagination: PaginationArgs,
		@Args() filter: UserLogsFilters
	): Promise<PaginatedUserLog> {
		return this.userLogService.getPaginatedUserLogs(pagination, filter);
	}
}
