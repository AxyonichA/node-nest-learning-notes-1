import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../user.entity'
import { Repository } from 'typeorm'
import { HashingService } from 'src/auth/providers/hashing.service'

@Injectable()
export class CreateUserProvider {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,

		@Inject(forwardRef(() => HashingService))
		private readonly hashingService: HashingService
	) {}
	public async createUser(createUserDto: CreateUserDto) {
		let existingUser;

		try {
			existingUser = await this.usersRepository.findOne({
				where: { email: createUserDto.email }
			})			
		} catch (error) {
			throw new RequestTimeoutException(
				'Unable to process your request at the moment. Try later',
				{
					description: "Error connecting to the db"
				}
			)
		}

		if(existingUser) {
			throw new BadRequestException(
				`User with email ${createUserDto.email} already exists`,
				{
					description: "User already exists"
				}
			)
		}

		let newUser = this.usersRepository.create({
			...createUserDto,
			password: await this.hashingService.hashPassword(createUserDto.password)
		})

		try {
			newUser = await this.usersRepository.save(newUser)
		} catch (error) {
			throw new RequestTimeoutException(
				'Unable to process your request at the moment. Try later',
				{
					description: "Error connecting to the db"
				}
			)
		}

		return newUser
	}

}
