import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator'
import { CreateUserDto } from './create-user.dto'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateManyUsersDto {
	@ApiProperty({
		type: 'array',
		required: true,
		items: {
			type: 'User',
		},
		description: 'List of users to be created',
	})
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateUserDto)
	users: CreateUserDto[]
}