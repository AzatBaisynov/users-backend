import { QueryService, InjectQueryService, Filter, InjectAssemblerQueryService } from '@nestjs-query/core';
import { ConnectionType, CRUDResolver, ReadResolver } from '@nestjs-query/query-graphql';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserLogModel } from '@app/users/models/userLog.model'
import { UserLogEntity } from '@app/users/entities/userLog.entity';
import { UserLogsConnection, UserLogsQuery } from '../types/types';
import { UserLogAssembler } from '@app/users/assembler/userLogs.assembler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../security/auth.guard';

@Resolver(() => UserLogModel)
@UseGuards(new AuthGuard())
export class UserLogResolver extends ReadResolver(UserLogModel) {
	constructor(
		@InjectAssemblerQueryService(UserLogAssembler) readonly service: QueryService<UserLogModel>,
		@InjectRepository(UserLogEntity) private readonly userLogsRepository: Repository<UserLogEntity>
	) {
		super(service)
	}

	@Query(() => UserLogsConnection)
	async getAllUserLogs(@Args() query: UserLogsQuery): Promise<ConnectionType<UserLogModel>> {

		const filter: Filter<UserLogModel> = {
			...query.filter,
			...{ }
		}

		return await UserLogsConnection.createFromPromise(async (q) => { 
			const query = await this.service.query(q)
			const result = []
			for (let i = 0; i < query.length; i++ ) {
				query[i].email = (await this.userLogsRepository.findOne({ id: query[i].id })).user.email
				result[i] = query[i]
			}
			return result
		}, { ...query, ...{ filter } });
	}
}