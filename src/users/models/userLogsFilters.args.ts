import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';

@ArgsType()
export class UserLogsFilters {
	@Field(() => String, { nullable: true })
	email: string;
	@Field(() => String, { nullable: true })
	country: string;
	@Field(() => String, { nullable: true })
	device: string;
	@Field(() => GraphQLISODateTime , { nullable: true })
	dateFrom: Date;
	@Field(() => GraphQLISODateTime, { nullable: true })
	dateTo: Date;
}