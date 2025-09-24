import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  await app.listen(process.env.PORT ?? 5173);
}
bootstrap();
