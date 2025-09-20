import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto'
import { SignInProvider } from './sign-in.provider'
import { RefreshTokenDto } from '../dtos/refresh-token.dto'
import { RefreshTokensProdiver } from './refresh-tokens.prodiver'

@Injectable()
export class AuthService {
	constructor(
		private readonly signInProvider: SignInProvider,
		private readonly refreshTokensProvider: RefreshTokensProdiver,
	) {}

	public async signIn(signInDto: SignInDto) {
		return await this.signInProvider.signIn(signInDto)
	}

	public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
		return await this.refreshTokensProvider.refreshTokens(refreshTokenDto)
	}
}
