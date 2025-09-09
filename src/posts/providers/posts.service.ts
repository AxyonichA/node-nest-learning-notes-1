import { Body, Injectable, Patch } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service'
import { CreatePostDto } from '../dtos/create-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MetaOption } from '../../meta-options/meta-option.entity'
import { Repository } from 'typeorm'
import { Post } from '../post.entity'
import { TagsService } from 'src/tags/providers/tags.service'
import { PatchPostDto } from '../dtos/patch-post.dto'

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,
		@InjectRepository(MetaOption)
		private readonly metaOptionsRepository: Repository<MetaOption>,
		private readonly tagsService: TagsService,
		private readonly usersService: UsersService
	) {}
	public async findAll() {
		const posts = await this.postsRepository.find({
			relations: {
				metaOptions: true,
				author: true,
				tags: true
			}
			// или eager: true в entity
		})
		return posts
	}
	public async findByUserID(userId: number) {
		const user = await this.usersService.findOneByID(userId)
		return [
			{
				user,
				title: 'Test Title',
				content: 'Test Content',
			}
		]
	}

	public async create(@Body() createPostDto: CreatePostDto) {
		const author = await this.usersService.findOneByID(createPostDto.authorId)

		if(!author) return { error: 'User not found' }

		const tags = await this.tagsService.findMultipleTags(createPostDto.tags || [])

		const post = this.postsRepository.create({
			...createPostDto,
			author,
			tags
		})
		
		return await this.postsRepository.save(post)
	}


	@Patch(':id')
	public async update(@Body() patchPostDto: PatchPostDto) {
		let tags = await this.tagsService.findMultipleTags(patchPostDto.tags || [])

		let post = await this.postsRepository.findOneBy({
			id: patchPostDto.id
		})

		if(post) {
			post.title = patchPostDto.title ?? post.title
			post.content = patchPostDto.content ?? post.content
			post.status = patchPostDto.status ?? post.status
			post.postType = patchPostDto.postType ?? post.postType
			post.slug = patchPostDto.slug ?? post.slug
			post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl
			post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn

			post.tags = tags

			return await this.postsRepository.save(post)
		}

		return null
	}


	public async delete(id: number) {
		await this.postsRepository.delete(id)
		
		return { deleted: true, id}
	}
}
