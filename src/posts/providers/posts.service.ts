import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service'

@Injectable()
export class PostsService {
	constructor(
		private readonly usersService: UsersService
	) {}
	public findAll() {
		return [
			{
				title: 'Test Title',
				content: 'Test Content'
			},
						{
				title: 'Test Title 2',
				content: 'Test Content 2'
			}
		]
	}
	public findByUserID(userId: string) {
		const user = this.usersService.findOneByID(userId)
		return [
			{
				user,
				title: 'Test Title',
				content: 'Test Content',
			}
		]
	}
}
