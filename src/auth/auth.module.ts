import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module'
import { HashingService } from './providers/hashing.service';
import { BcryptService } from './providers/bcrypt.service';
import { SignInProvider } from './providers/sign-in.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
		provide: HashingService,
		useClass: BcryptService
	}, SignInProvider],
	exports: [AuthService, HashingService],
	imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
