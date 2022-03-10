import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserEntity } from '@app/users/entities/user.entity';
import { CreateUserInput } from '@app/users/inputs/create-user.input';
import { LoginUserInput } from '@app/users/inputs/login-user.input';
import { UsersService } from '@app/users/services/users.service';
import { UserModel } from '@app/users/models/user.model';
import { UserLogEntity } from '@app/users/entities/userLog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../security/auth.guard';

@Resolver('User')
export class UsersResolver {
	constructor(
		private readonly userService: UsersService,
		@InjectRepository(UserLogEntity)
		private readonly userLogsRepository: Repository<UserLogEntity>,
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


	@Query(() => [UserEntity])
	@UseGuards(new AuthGuard())
	async getAllUsers(): Promise<UserEntity[]> {
		return await this.userService.getAllUsers();
	}
}
