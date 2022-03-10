import { BeforeInsert, Column, CreateDateColumn, Entity,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserLogEntity } from './userLog.entity';

@ObjectType()
@Entity({ name: 'users' })
export class UserEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	uuid: number;

	@Field()
	@Column({ nullable: false, unique: true })
	email: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;

	@Field()
	@Column({ nullable: false, select: false })
	password: string;

	@OneToMany(type => UserLogEntity, userLogEntity => userLogEntity.user)
	userLogs: UserLogEntity[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10);
	}
}