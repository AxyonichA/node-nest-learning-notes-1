import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { config } from 'aws-sdk';

export function appCreate(app: INestApplication): void {
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
		transformOptions: {
			enableImplicitConversion: true
		}
	}))

	const swaggerConfig = new DocumentBuilder()
	.setTitle('NestJS Blog app API')
	.setDescription('Use the base API URL as http://localhost:5173')
	.setTermsOfService('http://localhost:5173/terms-of-service')
	.setLicense('MIT License', 'http://localhost:5173/license')
	.addServer('http://localhost:5173')
	.setVersion('1.0')
	.build()
	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document)

	const configService = app.get(ConfigService)
	config.update({
		credentials: {
			accessKeyId: configService.get('appConfig.awsAccessKeyId') || '',
			secretAccessKey: configService.get('appConfig.awsSecretAccessKey') || ''
		},
		region: configService.get('appConfig.awsRegion')
	})

	app.enableCors();
}