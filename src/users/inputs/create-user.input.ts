import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

	@Field({ nullable: false })
	readonly email: string

	@Field({ nullable: false })
	readonly password: string
}