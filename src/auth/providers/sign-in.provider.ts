import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto'
import { UsersService } from 'src/users/providers/users.service'
import { HashingService } from './hashing.service'

@Injectable()
export class SignInProvider {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,

		private readonly hashingService: HashingService
	) {}
	public async signIn(signInDto: SignInDto) {
		const user = await this.usersService.findOneByEmail(signInDto.email)
	
		let isEqual: boolean = false

		try {
			isEqual = await this.hashingService.comparePassword(signInDto.password, user.password)
		} catch (error) {
			throw new RequestTimeoutException(error, {
				description: 'Could not compare passwords'
			})
		}

		if(!isEqual) {
			throw new UnauthorizedException('Password is incorrect')
		}

		return true
	}
}
