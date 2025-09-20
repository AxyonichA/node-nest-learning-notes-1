import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module'
import { HashingService } from './providers/hashing.service';
import { BcryptService } from './providers/bcrypt.service';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config'
import jwtConfig from './config/jwt.config'
import { JwtModule } from '@nestjs/jwt'
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProdiver } from './providers/refresh-tokens.prodiver';
import { GoogleAuthenticationController } from './social/google-authentication.controller';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';

@Module({
  controllers: [AuthController, GoogleAuthenticationController],
  providers: [AuthService, {
		provide: HashingService,
		useClass: BcryptService
	}, SignInProvider, GenerateTokensProvider, RefreshTokensProdiver, GoogleAuthenticationService],
	exports: [AuthService, HashingService],
	imports: [
		ConfigModule.forFeature(jwtConfig), 
		JwtModule.registerAsync(jwtConfig.asProvider()),
		forwardRef(() => UsersModule)],
})
export class AuthModule {}
