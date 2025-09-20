import { BadRequestException, Body, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto'
import { UsersService } from 'src/users/providers/users.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from '../post.entity'
import { Repository } from 'typeorm'
import { TagsService } from 'src/tags/providers/tags.service'
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface'
import { User } from 'src/users/user.entity'
import { Tag } from 'src/tags/tag.entity'

@Injectable()
export class CreatePostProvider {
	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,
		private readonly usersService: UsersService,
		private readonly tagsService: TagsService,
	) {}

	public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
		let author: User | undefined = undefined
		let tags: Tag[] | undefined = undefined

		try {
			author = await this.usersService.findOneByID(user.sub)
			tags = await this.tagsService.findMultipleTags(createPostDto.tags || [])
			
		} catch (error) {
			throw new ConflictException(error)
		}
		
		if(createPostDto.tags?.length !== tags?.length) {
			throw new BadRequestException('Please check yout tag ids and ensure they are correct')
		}
		
		const post = this.postsRepository.create({
			...createPostDto,
			author,
			tags
		})
		
		try {
			return await this.postsRepository.save(post)
		} catch (error) {
			throw new ConflictException(error, {
				description: 'Ensure post slug is unique'
			})
		}
	}
}
