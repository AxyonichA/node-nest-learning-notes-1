import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePostDto } from './dtos/create-post.dto'
import { PatchPostDto } from './dtos/patch-post.dto'
import { GetPostsDto } from './dtos/get-posts.dto'
import { ActiveUser } from 'src/auth/decorator/active-user.decorator'
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface'

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get('/') 
	public getPosts(@Query() postQuery: GetPostsDto) {
		console.log(postQuery)
		return this.postsService.findAll(postQuery)
	}
	@Get('/:userId')
	public getUserPosts(@Param('userId', ParseIntPipe) userId: number) {
		return this.postsService.findByUserID(userId)
	}

	@ApiOperation({
		summary: 'Creates a new post',
	})
	@ApiResponse({
		status: 201,
		description: 'You get a 201 response if the post is created successfully.'
	})
	@Post('/')
	public createPost(
			@Body() createPostDto: CreatePostDto,
			@ActiveUser() user: ActiveUserData
		) {

		return this.postsService.create(createPostDto, user)
		
	}

	@ApiOperation({
		summary: 'Updates a post',
	})
	@ApiResponse({
		status: 200,
		description: 'You get a 200 response if the post is updated successfully.'
	})
	@Patch()
	public updatePost(@Body() patchPostDto: PatchPostDto) {
		return this.postsService.update(patchPostDto)
	}


	@Delete('/:id')
	public deletePost(@Param('id', ParseIntPipe) id: number) {
		return this.postsService.delete(id)
	}
}
