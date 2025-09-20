import { BadRequestException, Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service'
import { CreatePostDto } from '../dtos/create-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MetaOption } from '../../meta-options/meta-option.entity'
import { Repository } from 'typeorm'
import { Post } from '../post.entity'
import { TagsService } from 'src/tags/providers/tags.service'
import { PatchPostDto } from '../dtos/patch-post.dto'
import { Tag } from 'src/tags/tag.entity'
import { GetPostsDto } from '../dtos/get-posts.dto'
import { PaginationService } from 'src/common/pagination/provider/pagination.service'
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface'
import { CreatePostProvider } from './create-post.provider'
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface'

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,
		private readonly createPostProvider: CreatePostProvider,
		@InjectRepository(MetaOption)
		private readonly metaOptionsRepository: Repository<MetaOption>,
		private readonly tagsService: TagsService,
		private readonly usersService: UsersService,
		private readonly paginationService: PaginationService
	) {}
	public async findAll(postQuery: GetPostsDto): Promise<Paginated<Post>> {
		// const posts = await this.postsRepository.find({
			// relations: {
			// 	metaOptions: true,
			// 	author: true,
			// 	tags: true
			// }, 
			// или eager: true в entity
		// 	take: postQuery.limit,
		// 	skip: (postQuery.page - 1) * postQuery.limit
		// })

		const posts = await this.paginationService.paginateQuery<Post>({
			limit: postQuery.limit,
			page: postQuery.page
		}, this.postsRepository)
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

	public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
		return await this.createPostProvider.create(createPostDto, user)
	}

	public async update(@Body() patchPostDto: PatchPostDto) {
		let tags: Tag[];
		let post: Post | null;
		try {
			tags = await this.tagsService.findMultipleTags(patchPostDto.tags || [])
		} catch (error) {
			throw new RequestTimeoutException(
				'Unable to process your request at the moment. Try later',
				{
					description: "Error connecting to the db"
				}
			)
		}
		if(!tags || tags.length !== patchPostDto.tags?.length) {
			throw new BadRequestException(
				'Please check yout tag ids and ensure they are correct'
			)
		}


		try {
			post = await this.postsRepository.findOneBy({
				id: patchPostDto.id
			})
		} catch (error) {
			throw new RequestTimeoutException(
				'Unable to process your request at the moment. Try later',
				{
					description: "Error connecting to the db"
				}
			)
		}

		if(!post) {
			throw new BadRequestException(
				`Post with id ${patchPostDto.id} not found`
			)
		}
		post.title = patchPostDto.title ?? post.title
		post.content = patchPostDto.content ?? post.content
		post.status = patchPostDto.status ?? post.status
		post.postType = patchPostDto.postType ?? post.postType
		post.slug = patchPostDto.slug ?? post.slug
		post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl
		post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn

		post.tags = tags

		try {
			post = await this.postsRepository.save(post)
		} catch (error) {
			throw new RequestTimeoutException(
				'Unable to process your request at the moment. Try later',
				{
					description: "Error connecting to the db"
				}
			)
		}

		return post
	}


	public async delete(id: number) {
		await this.postsRepository.delete(id)
		
		return { deleted: true, id}
	}
}
