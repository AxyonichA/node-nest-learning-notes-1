import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'

@Controller('users')
export class UsersController {
	@Get('/')
	public getUsers(@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number) {
		console.log(typeof limit);
		console.log(typeof page);
		return `You send a GET request to /users with query: limit=${limit} offset=${page}` 
	}
  @Get('/:id')
	public getUserByID(@Param('id', ParseIntPipe) id: string) {
		console.log(typeof id)
		
		return `You send a GET request to /users with parameter id: ${id}` 
	}

	@Post()
	public createUsers(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
		console.log(createUserDto);
		
		return 'You send a POST request to /users'
	}
}