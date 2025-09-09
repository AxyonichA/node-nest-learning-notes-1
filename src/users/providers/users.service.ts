import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/providers/auth.service'
import { Repository } from 'typeorm'
import { User } from '../user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'

/**
 * Class to connect to Users table and perform basic operations
 */
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,

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
	public async findOneByID(id: number) {
		return await this.usersRepository.findOneBy({ id })
	}

	public async createUser(createUserDto: CreateUserDto) {
		const existingUser = await this.usersRepository.findOne({
			where: { email: createUserDto.email }
		})

		let newUser = this.usersRepository.create(createUserDto)
		newUser = await this.usersRepository.save(newUser)

		return newUser
	}
}