import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProvider } from './create-user.provider'
import { MailService } from 'src/mail/providers/mail.service'
import { HashingService } from 'src/auth/providers/hashing.service'
import { DataSource, ObjectLiteral, Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../user.entity'
import { BadRequestException } from '@nestjs/common'

type MockRepository<T = any> = Partial<Record<keyof Repository<T extends ObjectLiteral? T: any>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
})
describe('CreateUserProvider', () => {
	let provider: CreateUserProvider;

	let usersRepository = createMockRepository<User>();
	const user = {
		firstName: 'John',
		lastName: 'Doe',
		email: 'x5r4t@example.com',
		password: 'password'
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateUserProvider,
				{ provide: DataSource, useValue: {}},
				{ provide: getRepositoryToken(User), useValue: {}},
				{ 
					provide: MailService, 
					useValue: {sendUserWelcome: jest.fn(() => Promise.resolve())}},
				{ 
					provide: HashingService, 
					useValue: {hashPassword: jest.fn(() => user.password)}},
			],

		}).compile();

		provider = module.get<CreateUserProvider>(CreateUserProvider);
		usersRepository = module.get(getRepositoryToken(User));
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});

	describe('createUser', () => {
		describe('when user does not exist', () => {
			it('should create user', async() => {
				usersRepository.findOne = jest.fn().mockReturnValue(null)
				usersRepository.create = jest.fn().mockReturnValue(user)
				usersRepository.save = jest.fn().mockReturnValue(user)
				const result = await provider.createUser(user)
				expect(usersRepository.findOne).toHaveBeenCalledWith({
					where: {
						email: user.email
					}
				})
				expect(usersRepository.create).toHaveBeenCalledWith(user)
				expect(usersRepository.save).toHaveBeenCalledWith(user)
			})
		})
		describe('when user exists', () => {
			it('throw BadRequestException', async() => {
				usersRepository.findOne = jest.fn().mockReturnValue(user.email)
				usersRepository.create = jest.fn().mockReturnValue(user)
				usersRepository.save = jest.fn().mockReturnValue(user)
				try {
					const result = await provider.createUser(user)
				} catch (error) {
					expect(error).toBeInstanceOf(BadRequestException)
				}
			})
		})
	})

});