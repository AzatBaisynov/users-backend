import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {

	@Field(() => ID)
	readonly uuid: number
	
	@Field({ nullable: true })
	readonly email: string

	@Field({ nullable: true })
	readonly password: string
}