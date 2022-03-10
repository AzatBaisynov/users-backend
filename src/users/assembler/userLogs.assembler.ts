import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { UserLogModel } from '@app/users/models/userLog.model'
import { UserLogEntity } from '@app/users/entities/userLog.entity';

@Assembler(UserLogModel, UserLogEntity)
export class UserLogAssembler extends ClassTransformerAssembler<UserLogModel, UserLogEntity> {

	convertToDTO(entity: UserLogEntity): UserLogModel {
		const dto = super.convertToDTO(entity);
		return dto;
	}
}