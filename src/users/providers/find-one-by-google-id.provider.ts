import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class FindOneByGoogleIdProvider {
	constructor (
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	){}

	public async findOneByGoogleID(googleID: string) {
		return await this.usersRepository.findOneBy({ googleID })
	}
}
