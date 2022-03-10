import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@app/users/entities/user.entity';

@ObjectType()
@Entity({ name: 'user_logs' })
export class UserLogEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field( () => UserEntity,  { nullable : true })
	@ManyToOne(() => UserEntity, userEntity => userEntity.email)
	user: UserEntity

	@Field()
	@CreateDateColumn()
	loggedAt: Date;

	@Field({ nullable: true })
	@Column({ nullable: true })
	country: string;

	@Field({ nullable: true })
	@Column( { nullable: true })
	device: string;
}