import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePostDto } from './dtos/create-post.dto'
import { PatchPostDto } from './dtos/patch-post.dto'

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get('/') 
	public getPosts() {
		return this.postsService.findAll()
	}
	@Get('/:userId')
	public getUserPosts(@Param('userId') userId: string) {
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
	public createPost(@Body() createPostDto: CreatePostDto) {
		console.log(createPostDto);
		return 'You send a POST request to /posts'
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
		console.log(patchPostDto);
		return 'You send a PATCH request to /posts'
	}
}
