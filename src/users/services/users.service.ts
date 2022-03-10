import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/users/entities/user.entity';
import { CreateUserInput } from '@app/users/inputs/create-user.input';
import { UpdateUserInput } from '@app/users/inputs/update-user.input';
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@app/config/config';
import { UserModel } from '@app/users/models/user.model';
import { LoginUserInput } from '../inputs/login-user.input';
import { compare } from 'bcrypt';
import { UserLogsService } from './userLogs.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly userLogsService: UserLogsService
	) {
	}

	async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
		const userByEmail = await this.userRepository.findOne({
			email: createUserInput.email
		})
		if (userByEmail) {
			throw new HttpException('Email is taken', HttpStatus.UNPROCESSABLE_ENTITY);
		}
		const newUser = new UserEntity();
		Object.assign(newUser, createUserInput)
		return await this.userRepository.save(newUser);
	}

	async login(loginUserInput: LoginUserInput): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			email: loginUserInput.email
		},
			{ select: ['uuid', 'email', 'createdAt', 'password', 'updatedAt'] },
		);
		if (!user) {
			throw new HttpException(
				'Credential are not valid',
				HttpStatus.UNPROCESSABLE_ENTITY
			)
		};

		const isPasswordCorrect = await compare(
			loginUserInput.password,
			user.password
		);

		if (!isPasswordCorrect) {
			throw new HttpException(
				'Credential are not valid',
				HttpStatus.UNPROCESSABLE_ENTITY
			)
		};

		this.userLogsService.createUserLog(loginUserInput, user);

		delete user.password;

		return user;
	}

	generateJwt(user: UserEntity): string {
		return sign({
			id: user.uuid,
			email: user.email
		},
			JWT_SECRET,
			{
				expiresIn: '10h'
			}
		);
	}

	buildUserResponse(user: UserEntity): UserModel {
		return {
			...user,
			token: this.generateJwt(user)
		}
	}

	getOneUser(uuid: number): Promise<UserEntity> {
		return this.userRepository.findOne({ uuid })
	}

	async getAllUsers(): Promise<UserEntity[]> {
		return await this.userRepository.find();
	}

	async removeUser(uuid: number): Promise<number> {
		await this.userRepository.delete({ uuid })
		return uuid;
	}

	async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
		await this.userRepository.update({ uuid: updateUserInput.uuid }, { ...updateUserInput })
		return await this.getOneUser(updateUserInput.uuid)
	}
}
