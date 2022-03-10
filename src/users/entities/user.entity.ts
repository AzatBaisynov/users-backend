import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Field, GraphQLISODateTime, ID, InputType, ObjectType } from '@nestjs/graphql';
import { UserLogEntity } from '@app/users/entities/userLog.entity';
import { FilterableField, IDField, PagingStrategies, QueryOptions } from '@nestjs-query/query-graphql';

@ObjectType()
@InputType('UserLogs')
@Entity({ name: 'users' })
export class UserEntity {
	@Field(() => ID)
	@IDField(() => ID, { nullable: true })
	@PrimaryGeneratedColumn()
	uuid: number;

	
	@Column({ nullable: false, unique: true })
	@FilterableField({ nullable : true })
	email: string;

	@CreateDateColumn()
	@Field(() => GraphQLISODateTime, { nullable: true })
	createdAt: Date;

	@UpdateDateColumn()
	@Field(() => GraphQLISODateTime, { nullable: true })
	updatedAt: Date;

	@Column({ nullable: false, select: false })
	password: string;

	@OneToMany(type => UserLogEntity, userLogEntity => userLogEntity.user)
	userLogs: UserLogEntity[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10);
	}
}