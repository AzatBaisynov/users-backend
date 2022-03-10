import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {

	@Field({ nullable: false })
	readonly email: string;

	@Field({ nullable: false })
	readonly password: string;

	@Field({ nullable: true })
	readonly country: string;

	@Field({ nullable: true })
	readonly ip: string;
}