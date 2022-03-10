import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UserLogModel {
	@Field(type => ID)
	id: number;
	@Field({ nullable: true })
	email: string;
	@Field()
	loggedAt: Date;
	@Field({ nullable: true })
	country: string;
	@Field({ nullable: true })
	device: string;
}