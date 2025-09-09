import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { PatchUserDto } from './dtos/patch-user.dto'
import { UsersService } from './providers/users.service'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('Users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get('/')
	@ApiOperation({
		summary: 'Fetches a list of users on the application',
	})
	@ApiResponse({
		status: 200,
		description: 'Users fetched successfully based on the query',
	})
	@ApiQuery({
		name: 'limit',
		type: 'number',
		required: false,
		description: 'Limit the number of results',
		example: 10,
	})
	@ApiQuery({
		name: 'page',
		type: 'number',
		required: false,
		description: 'The position of the page number that you want the API to return',
		example: 1,
	})
	public getUsers(@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number) {
		return this.usersService.findAll(limit, page)
	}
  @Get('/:id')
	public getUserByID(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.findOneByID(id)
	}

	@Post()
	public createUsers(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto)
	}

	@Patch()
	public patchUser(@Body() patchUserDto: PatchUserDto) {
		console.log(patchUserDto);
		
		return 'You send a PATCH request to /users'
	}
}