import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLogEntity } from '../entities/userLog.entity';
import { UserEntity } from '../entities/user.entity';
import { LoginUserInput } from '../inputs/login-user.input';
import { UserLogModel } from '../models/userLog.model';
import { UserModel } from '../models/user.model';
import { PaginationArgs } from '../models/pagination.args';
import { PaginatedUserLog } from '../models/paginated-userLog';
import { paginate } from './paginate';
import { UserLogsFilters } from '../models/userLogsFilters.args';
import { UsersService } from './users.service';

@Injectable()
export class UserLogsService {

	constructor(
		@InjectRepository(UserLogEntity)
		private readonly userLogsRepository: Repository<UserLogEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {
	}

	async getPaginatedUserLogs(paginationArgs: PaginationArgs, filters: UserLogsFilters): Promise<PaginatedUserLog> {

		const query = await this.userLogsRepository
			.createQueryBuilder("l")
			.leftJoinAndSelect("l.user", "users")
			

		if (filters.country) {
			query.where({country : filters.country})
		}
		if (filters.email) {
			const user = await this.userRepository.findOne({email: filters.email})
			if (user) {
				query.andWhere({ user })
			}
		}

		if (filters.device) {
			query.where({device : filters.device})
		}

		if ( filters.dateFrom ) {
			query.where("userLogs.loggedAt > :date ", {date : filters.dateFrom})
		}

		if ( filters.dateTo ) {
			query.where("userLogs.loggedAt < :date ", { date: filters.dateTo })
		}

		const paginated: Promise<PaginatedUserLog> = paginate(query, paginationArgs);
		
		return paginated
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