import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@app/users/entities/user.entity';

@ObjectType()
@Entity({ name: 'user_logs' })
export class UserLogEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field( () => UserEntity,  { nullable : true })
	@ManyToOne(() => UserEntity, user => user.email, {
		eager: true
	})
	user: UserEntity

	@Field(() => GraphQLISODateTime)
	@CreateDateColumn()
	loggedAt: Date;

	@Field({ nullable: true })
	@Column({ nullable: true })
	country: string;

	@Field({ nullable: true })
	@Column( { nullable: true })
	device: string;
}