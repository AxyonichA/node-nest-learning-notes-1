import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module'
import { PostsModule } from 'src/posts/posts.module'
import { AuthModule } from 'src/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagsModule } from 'src/tags/tags.module'
import { MetaOptionsModule } from 'src/meta-options/meta-options.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import appConfig from 'src/config/app.config'
import databaseConfig from 'src/config/database.config';
import environmentValidation from 'src/config/environment.validation'
import { JwtModule } from '@nestjs/jwt'
import profileConfig from 'src/users/config/profile.config'
import jwtConfig from 'src/auth/config/jwt.config'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { AuthenticationGuard } from 'src/auth/guards/authentication/authentication.guard'
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard'
import { DataResponseInterceptor } from 'src/common/interceptors/data-response/data-response.interceptor'
import { UploadsModule } from 'src/uploads/uploads.module'
import { MailModule } from 'src/mail/mail.module'

const ENV = process.env.NODE_ENV

@Module({
  imports: [
		UsersModule, PostsModule, AuthModule, 
		TagsModule, MetaOptionsModule, UploadsModule, MailModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: !ENV ? '.env' : `.env.${ENV}`,
			load: [appConfig, databaseConfig],
			validationSchema: environmentValidation
		}),
		ConfigModule.forFeature(profileConfig),
		ConfigModule.forFeature(jwtConfig), 
		JwtModule.registerAsync(jwtConfig.asProvider()),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				// entities: [User],
				autoLoadEntities:  configService.get('database.autoLoadEntities'),
				synchronize: configService.get('database.synchronize'),
				host: configService.get('database.host'),
				port: configService.get('database.port'),
				username: configService.get('database.user'),
				password: configService.get('database.password'),
				database: configService.get('database.name'),
			})
		})
	],
  controllers: [AppController],
  providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: DataResponseInterceptor
		},
		AccessTokenGuard
	],
})
export class AppModule {}
