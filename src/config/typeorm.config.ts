import { ConnectionOptions } from 'typeorm';

const typeormConfig: ConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'postgres',
	database: 'postgres',
	entities: [__dirname + '/../**/*.entity{.ts,.js}'],
	synchronize: false,
	logging: false,
	migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
	cli: {
		migrationsDir: 'src/migrations'
	}
}

export default typeormConfig