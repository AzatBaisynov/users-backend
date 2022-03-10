import { UserLogModel } from './userLog.model';
import { ObjectType } from '@nestjs/graphql';
import { Paginated } from "@app/users/models/paginated";
import { UserLogEntity } from '../entities/userLog.entity';

@ObjectType()
export class PaginatedUserLog extends Paginated(UserLogEntity) { }