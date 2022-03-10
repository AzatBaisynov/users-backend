import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLogEntity } from '../entities/userLog.entity';
import { UserEntity } from '../entities/user.entity';
import { LoginUserInput } from '../inputs/login-user.input';
import { UserLogModel } from '../models/userLog.model';

@Injectable()
export class UserLogsService {

	constructor(
		@InjectRepository(UserLogEntity)
		private readonly userLogsRepository: Repository<UserLogEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {
	}

	async createUserLog(loginUserInput: LoginUserInput, userEntity: UserEntity): Promise<UserLogEntity> {
		const newLog = {
			country: loginUserInput.country,
			device: loginUserInput.ip,
			user: userEntity
		}
		return await this.userLogsRepository.save(newLog);
	}

	async getAllLogs(): Promise<UserLogModel[]> {
		const userLogs: UserLogEntity[] = await this.userLogsRepository.find({ relations: ["user"] });
		const userLogsModels = userLogs.map((userLogEntity: UserLogEntity): UserLogModel => this.buildUserModel(userLogEntity));
		return userLogsModels;
	}

	buildUserModel(userLog: UserLogEntity): UserLogModel {
		return {
			id: userLog.id,
			country: userLog.country,
			loggedAt: userLog.loggedAt,
			device: userLog.device,
			email: userLog.user.email
		}
	}
}