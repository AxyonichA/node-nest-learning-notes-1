import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/providers/auth.service'

/**
 * Class to connect to Users table and perform basic operations
 */
@Injectable()
export class UsersService {
	constructor(
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService
	) {}
	

	/**
	 * The method to fetch all users
	 * @param limit 
	 * @param page 
	 * @returns 
	 */
	public findAll(limit: number, page: number) {
		console.log(limit, page)
		return [
			{
				firstName: 'John',
				lastName: 'Doe',
				email: 'l3M0y@example.com'
			},
			{
				firstName: 'Jane',
				lastName: 'Doe',
				email: '1V5oJ@example.com'
			}
		]
	}

	/**
	 * Find a single user by id
	 * @param userId 
	 * @returns 
	 */
	public findOneByID(userId: string) {
		const isAuth = this.authService.isAuth()
		console.log(isAuth)
		return {
			id: userId,
			firstName: 'John',
			lastName: 'Doe',
			email: 'l3M0y@example.com'
		}
	}
}