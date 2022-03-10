import { ObjectType, ID, GraphQLISODateTime} from '@nestjs/graphql';
import { FilterableField, IDField, QueryOptions, PagingStrategies, FilterableUnPagedRelation } from '@nestjs-query/query-graphql';
import { UserEntity } from '@app/users/entities/user.entity';

@ObjectType('UserLog')
@FilterableUnPagedRelation("user", () => UserEntity, { disableRemove: true })
@QueryOptions({ pagingStrategy: PagingStrategies.OFFSET })
export class UserLogModel {
	@IDField(() => ID)
	id: number;
	@FilterableField({ nullable: true })
	email: String;
	@FilterableField(() => GraphQLISODateTime, { nullable: true })
	loggedAt: Date;
	@FilterableField({ nullable: true })
	country: string;
	@FilterableField({ nullable: true })
	device: string;
}