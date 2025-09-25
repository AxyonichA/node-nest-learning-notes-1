import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'

export async function dropDatabase(config: ConfigService): Promise<void> {
	const AppDataSource = new DataSource({
		type: 'postgres',
		synchronize: config.get('database.synchronize'),
		host: config.get('database.host'),
		port: config.get('database.port'),
		username: config.get('database.user'),
		password: config.get('database.password'),
		database: config.get('database.name'),
	})

	await AppDataSource.dropDatabase()

	await AppDataSource.destroy()
}