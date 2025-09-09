import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateTagDto {
	@ApiProperty()
	@IsString()
	@MinLength(3)
	@IsNotEmpty()
	@MaxLength(256)
	name: string;
	
	@ApiProperty({
		description: "For Example - 'my-url'",
		example: 'my-blog-post'
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(256)
	@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase and dash separated. For example "my-url"' })
	slug: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsJSON()
	schema?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsUrl()
	@MaxLength(1024)
	featuredImageUrl?: string;
}