import { ID, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel{
	@Field(type => ID)
	uuid: number;
	@Field()
	email: string;
	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
	@Field()
	token: string;
}