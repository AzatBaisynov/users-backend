import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserLogModel } from '@app/users/models/userLog.model';

@ArgsType()
export class UserLogsQuery extends QueryArgsType(UserLogModel) {}
export const UserLogsConnection = UserLogsQuery.ConnectionType;