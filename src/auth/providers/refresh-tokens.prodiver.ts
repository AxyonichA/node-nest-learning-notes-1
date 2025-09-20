import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto'
import jwtConfig from '../config/jwt.config'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { GenerateTokensProvider } from './generate-tokens.provider'
import { UsersService } from 'src/users/providers/users.service'
import { ActiveUserData } from '../interfaces/active-user-data.interface'

@Injectable()
export class RefreshTokensProdiver {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly jwtService: JwtService,
		private readonly generateTokensProvider: GenerateTokensProvider,
	) {}

	public async refreshTokens(refreshToken: RefreshTokenDto) {
		try {
			const { sub } = await this.jwtService.verifyAsync<Pick <ActiveUserData, 'sub'>>(
				refreshToken.refreshToken, 
				{
					audience: this.jwtConfiguration.audience,
					issuer: this.jwtConfiguration.issuer,
					secret: this.jwtConfiguration.secret
				}
		)
		
			const user = await this.usersService.findOneByID(sub)
			return await this.generateTokensProvider.generateTokens(user)
		} catch (error) {
			throw new UnauthorizedException(error)
		}
	}

}
