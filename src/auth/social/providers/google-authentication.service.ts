import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'
import { OAuth2Client } from 'google-auth-library'
import jwtConfig from 'src/auth/config/jwt.config'
import { GoogleTokenDto } from '../dtos/google-token.dto'
import { UsersService } from 'src/users/providers/users.service'
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider'

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
	private oauthClient: OAuth2Client;

	constructor(
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
		private readonly generateTokensProvider: GenerateTokensProvider,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
	) {}

	onModuleInit() {
		const clientID = this.jwtConfiguration.googleClientId
		const clientSecret = this.jwtConfiguration.googleClientSecret
		this.oauthClient = new OAuth2Client(clientID, clientSecret)	
	}

	public async authenticate(googleTokenDto: GoogleTokenDto) {
		try {
			const loginTicket = await this.oauthClient.verifyIdToken({
				idToken: googleTokenDto.token
			})
	
			const payload = loginTicket.getPayload();
			if (!payload) {
				throw new Error('Invalid Google token: empty payload');
			}
	
			const { email, sub: googleId, given_name: firstName, family_name: lastName } = payload;
	
			if (!email) {
				throw new Error('Google account has no verified email');
			}
	
			const user = await this.usersService.findOneByGoogleID(googleId)
		
			if (user) {
				return await this.generateTokensProvider.generateTokens(user)
			}
	
			const newUser = await this.usersService.createGoogleUser({ email, firstName: firstName || '', lastName: lastName || '', googleID: googleId })
			
			return this.generateTokensProvider.generateTokens(newUser)
		} catch (error) {
			throw new UnauthorizedException(error)
		}
	}
}
