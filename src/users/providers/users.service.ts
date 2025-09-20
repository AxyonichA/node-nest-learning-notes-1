import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common'
import { AuthService } from 'src/auth/providers/auth.service'
import { Repository } from 'typeorm'
import { User } from '../user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UsersCreateManyProvider } from './users-create-many.provider'
import { CreateManyUsersDto } from '../dtos/create-many-users.dto'
import { CreateUserProvider } from './create-user.provider'
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider'
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider'
import { CreateGoogleUserProvider } from './create-google-user.provider'
import { GoogleUser } from '../interfaces/google-user.interface'

/**
 * Class to connect to Users table and perform basic operations
 */
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,

		@Inject(forwardRef(() => AuthService))

		private readonly usersCreateManyProvider: UsersCreateManyProvider,
		private readonly createUserProvider: CreateUserProvider,
		private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
		private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
		private readonly createGoogleUserProvider: CreateGoogleUserProvider,
	) {}
	

	/**
	 * The method to fetch all users
	 * @param limit 
	 * @param page 
	 * @returns 
	 */
	public findAll(limit: number, page: number) {
		throw new HttpException({
			status: HttpStatus.NOT_FOUND,
			error: 'Not Found'
		}, 
		HttpStatus.NOT_FOUND,
		{
			cause: new Error(),
			description: "Users not found"
		}
	)
	}

	/**
	 * Find a single user by id
	 * @param userId 
	 * @returns 
	 */
	public async findOneByID(id: number) {
		let foundUser: User | null;
		try {
			foundUser = await this.usersRepository.findOneBy({ id })
		} catch (error) {
			throw new RequestTimeoutException(
				'Unable to process your request at the moment. Try later',
				{
					description: "Error connecting to the db"
				}
			)
		}

		if(!foundUser) {
			throw new BadRequestException(
				`User with id ${id} not found`,
				{
					description: "User not found"
				}
			)
		}
		return foundUser
	}

	public async createUser(createUserDto: CreateUserDto) {
		return await this.createUserProvider.createUser(createUserDto)
	}


	public async createMany(createManyUsersDto: CreateManyUsersDto) {
		return await this.usersCreateManyProvider.createMany(createManyUsersDto)
	}

	public async findOneByEmail(email: string) {
		return await this.findOneUserByEmailProvider.findOneByEmail(email)
	}

	public async findOneByGoogleID(googleID: string) {
		return await this.findOneByGoogleIdProvider.findOneByGoogleID(googleID)
	}

	public async createGoogleUser(googleUser: GoogleUser) {
		return await this.createGoogleUserProvider.createGoogleUser(googleUser)
	}
}